"""Read-only smoke check: python3 scripts/check-production.py [base URL]."""
import sys, re, urllib.request, urllib.parse, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3000').rstrip('/')
urllib.request.HTTPRedirectHandler.http_error_308 = urllib.request.HTTPRedirectHandler.http_error_307
class Redirects(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return super().redirect_request(req, fp, 307 if code == 308 else code, msg, headers, newurl)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}), Redirects())
def get(path,host=None):
    r=opener.open(urllib.request.Request(base+path,headers={'Host':host} if host else {}),timeout=30)
    assert r.status==200,(path,r.status)
    return r,r.read()
class Links(HTMLParser):
    def __init__(self): super().__init__();self.paths=set()
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ('src','href','poster') and v and v.startswith('/') and not v.startswith('//'):
                self.paths.add(v.split('#')[0])
_,xml=get('/sitemap.xml');paths={urllib.parse.urlsplit(e.text).path for e in ET.fromstring(xml).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
paths.update(['/adatvedelem','/sutik','/aszf','/en/privacy-policy','/en/cookie-policy','/en/terms-and-conditions']); assets=set()
for path in sorted(paths):
    r,b=get(path);text=b.decode();assert ('<html lang="en"' if path == '/en' or path.startswith('/en/') else '<html lang="hu"') in text,path
    assert 'https://eximpworld.hu'+path in text,path
    parser=Links();parser.feed(text);assets.update(parser.paths)
for path in sorted(assets-paths):get(path)
for p in Path('public').rglob('*'):
    if p.is_file():get('/'+p.relative_to('public').as_posix())
for query in ['/?market=uk','/?market=hu','/contact?product=ipa']:
    _,b=get(query);assert '<html lang="hu"' in b.decode()
r,b=get('/', 'eximpworld.hu');assert 'noindex' not in b.decode();assert not r.headers.get('X-Robots-Tag')
r,b=get('/', 'preview.vercel.app');assert r.headers.get('X-Robots-Tag')=='noindex, follow'
print(f'PASS: {len(paths)} HU/EN oldalak, {len(assets)} belső hivatkozás/asset, összes public fájl, HU piacrögzítés és production/preview SEO.')
