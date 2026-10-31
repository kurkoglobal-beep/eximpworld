"""Routing/SEO regression check; run against a local or preview server only.

python3 scripts/check-routing.py http://127.0.0.1:3148 [baseline.json]
"""
import json
import sys
import urllib.error
import urllib.parse as url
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://127.0.0.1:3148'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None
opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
checks = 0
def get(path, host=None):
    global checks
    checks += 1
    try:
        response = opener.open(urllib.request.Request(base + path, headers={'Host': host} if host else {}), timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    return response.status, response.headers, response.read().decode()

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.alternates, self.assets, self.text = [], {}, [], []
        self.canonical = self.locale = None
        self.skip = 0
        self.inbody = False
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'body': self.inbody = True
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'html': self.locale = a.get('lang')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a['href']
        if tag == 'link' and a.get('rel') == 'alternate': self.alternates[a.get('hreflang')] = a['href']
        if tag == 'a': self.links.append(a)
        if tag in ('img', 'source', 'video'):
            self.assets.append((tag, a.get('src'), a.get('poster'), a.get('alt')))
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1
        if tag == 'body': self.inbody = False
    def handle_data(self, data):
        if self.inbody and not self.skip and data.strip(): self.text.append(data.strip())

status, _, xml = get('/sitemap.xml')
assert status == 200
root = ET.fromstring(xml)
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
urls, pairs = set(), set()
for entry in root.findall('s:url', ns):
    loc = entry.find('s:loc', ns).text
    assert loc not in urls and '?' not in loc, loc
    urls.add(loc)
    alternates = {e.attrib['hreflang']: e.attrib['href'] for e in entry.findall('x:link', ns)}
    assert set(alternates) == {'hu', 'en'}, alternates
    assert loc in alternates.values()
    pairs.add(tuple(url.urlsplit(alternates[lang]).path for lang in ('hu', 'en')))
assert len(urls) == len(pairs)*2
pairs.update([('/adatvedelem', '/en/privacy-policy'), ('/sutik', '/en/cookie-policy'), ('/aszf', '/en/terms-and-conditions')])
assert {('/', '/en'), ('/rolunk', '/en/about'), ('/szolgaltatasok', '/en/services'), ('/termekek', '/en/products'), ('/kapcsolat', '/en/contact'), ('/termekek/izopropil-alkohol-ipa', '/en/products/isopropyl-alcohol')} <= pairs
expected_paths = {p for pair in pairs for p in pair}
baseline = json.loads(Path(sys.argv[2]).read_text()) if len(sys.argv)>2 else None
if baseline:
    assert set(baseline) == {hu+q for hu, _ in pairs for q in ('', '?lang=en')}
linked_paths = set()

def redirect(source, target):
    status, headers, _ = get(source)
    assert status == 301, (source, status)
    actual = url.urlsplit(url.urljoin(base, headers['Location']))
    assert actual.path == url.urlsplit(target).path, (source, headers['Location'], target)
    assert url.parse_qs(actual.query) == url.parse_qs(url.urlsplit(target).query), (source, headers['Location'], target)
    assert actual.netloc == url.urlsplit(base).netloc, headers['Location']
    status, _, _ = get(actual.path + ('?' + actual.query if actual.query else ''))
    assert status == 200, (source, 'redirect chain or failure', status)

for hu, en in sorted(pairs):
    expected = {'hu': 'https://eximpworld.hu'+(hu if hu != '/' else ''), 'en': 'https://eximpworld.hu'+en}
    for lang, path in [('hu', hu), ('en', en)]:
        status, headers, html = get(path)
        assert status == 200, (path, status)
        page = Page(html)
        assert page.locale == lang, path
        assert page.canonical == expected[lang], (path, page.canonical)
        assert page.alternates == expected, (path, page.alternates)
        assert headers.get('X-Robots-Tag') == 'noindex, follow', path
        assert not any(t in page.text for t in ['Product not found.', 'Service not found.']), path
        if baseline:
            before = Page(baseline[hu + ('?lang=en' if lang == 'en' else '')])
            assert page.text == before.text, ('Changed visible content', path)
            assert page.assets == before.assets, ('Changed images', path)
        for a in page.links:
            href = a.get('href', '')
            if not href.startswith('/') or href.startswith('//'): continue
            parsed = url.urlsplit(href)
            assert 'lang' not in url.parse_qs(parsed.query), (path, href)
            if '.' in parsed.path.rsplit('/', 1)[-1]: continue
            assert parsed.path in expected_paths, (path, 'unknown internal link', href)
            target_lang = a.get('lang', lang)
            assert (parsed.path == '/en' or parsed.path.startswith('/en/')) == (target_lang == 'en'), (path, 'wrong language', href)
            linked_paths.add(parsed.path + ('?' + parsed.query if parsed.query else ''))
    redirect(hu+'?lang=en', en)
    redirect(hu+('' if hu=='/' else '/')+'?lang=en&utm_source=test&product=ipa&packaging=ibc', en+'?utm_source=test&product=ipa&packaging=ibc')
    redirect(en+'?lang=en', en)
    redirect(en+'?lang=hu', hu)
    redirect(en+'/', en)
    if en != '/en': redirect(en[3:]+'?lang=en', en)
for path in sorted(linked_paths):
    assert get(path)[0] == 200, path
# Equivalent query encodings must never cause canonicalization redirects.
for contact in ['/kapcsolat', '/en/contact']:
    for query in ['product=Izopropil-alkohol%20%28IPA%29', 'product=Izopropil-alkohol+%28IPA%29', 'product=IPA&note=A%2BB%20%26%20C']:
        assert get(contact + '?' + query)[0] == 200, (contact, query)
redirect('/en/products/isopropyl-alcohol-ipa?lang=en', '/en/products/isopropyl-alcohol')
for path in ['/en/does-not-exist', '/en/products/does-not-exist', '/en/services/does-not-exist']:
    assert get(path)[0] == 404, path
for host in ['eximpworld.hu', 'www.eximpworld.hu']:
    for path in ['/', '/en', '/en/products/isopropyl-alcohol']:
        status, headers, html = get(path, host)
        assert status == 200 and not headers.get('X-Robots-Tag') and 'noindex' not in html, (path, host)
print(f'PASS: {len(pairs)*2} pages; canonical/hreflang/sitemap; {len(linked_paths)} internal URLs; all legacy redirects single-hop 301; RFQ parameters; 404s; preview/production SEO; {checks} HTTP checks.' + (' All visible text and image references match the baseline.' if baseline else ''))
