import urllib.request, urllib.parse, re, json
from html.parser import HTMLParser
from pathlib import Path
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.media=[];self.text=[];self.skip=0;self.lang=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ['script','style']:self.skip+=1
  if tag=='html':self.lang=a.get('lang')
  if tag=='a':self.links.append(a.get('href',''))
  if tag in ['video','img','source']:self.media.append(a.get('src',''))
 def handle_endtag(self,tag):
  if tag in ['script','style']:self.skip-=1
 def handle_data(self,s):
  if not self.skip and s.strip():self.text.append(s.strip())
def read(path):
 r=urllib.request.urlopen('http://127.0.0.1:8091'+path);assert r.status==200;p=Page();p.feed(r.read().decode());return p
paths={'/','/rolunk','/szolgaltatasok','/termekek','/kapcsolat','/iparagak','/adatvedelem','/sutik','/aszf'}
for path in ['/termekek','/szolgaltatasok']:
 paths.update(urllib.parse.urlsplit(x).path for x in read(path).links if x.startswith(path+'/'))
result=[]
for path in sorted(paths):
 hu,en=read(path),read(path+'?lang=en');assert hu.lang=='hu' and en.lang=='en',path;assert hu.media==[x.replace('/services-logistics-hero-en.png','/services-logistics-hero.png') for x in en.media],path
 assert not any('eximpworld.co.uk' in l for l in en.links),path
 bad=[l for l in en.links if l.startswith('/') and not l.startswith('//') and not re.search(r'\.[a-z0-9]+$',urllib.parse.urlsplit(l).path) and 'lang=en' not in l and l!=path]
 assert not bad,(path,bad)
 leftover=[t for t in en.text if re.search('[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]',t)]
 result.append({'path':path,'hu':'PASS','en':'PASS','same_media':True,'review_text':leftover})
Path('tests/language-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('PASS',len(paths),'routes in both languages, same media, no UK domain navigation')
print(json.dumps({r['path']:r['review_text'] for r in result if r['review_text']},ensure_ascii=False,indent=2))
