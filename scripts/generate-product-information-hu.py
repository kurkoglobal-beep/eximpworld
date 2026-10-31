"""Build the reviewed Hungarian PIS documents from the shared evidence manifest.
Run with Python + reportlab. Review source changes and render every PDF before release.
"""
import json, shutil
import reportlab
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
# Arial includes Hungarian double-acute glyphs; embed the subset in every PDF.
FONT_DIR=Path('/System/Library/Fonts/Supplemental')
pdfmetrics.registerFont(TTFont('BrandSans', str(FONT_DIR/'Arial.ttf')))
pdfmetrics.registerFont(TTFont('BrandSans-Bold', str(FONT_DIR/'Arial Bold.ttf')))
pdfmetrics.registerFontFamily('BrandSans', normal='BrandSans', bold='BrandSans-Bold', italic='BrandSans', boldItalic='BrandSans-Bold')
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/pdf/hu'; OUT.mkdir(parents=True,exist_ok=True)
PUBLIC=ROOT/'public/downloads/product-information/hu'; PUBLIC.mkdir(parents=True,exist_ok=True)
DISCLAIMER='Kizárólag általános termékinformáció. Ez a dokumentum nem minősül beszállítóspecifikus műszaki specifikációnak, biztonsági adatlapnak (SDS) vagy analitikai bizonylatnak (CoA). A végleges specifikációk beszállítói megerősítést igényelnek.'
NAVY=HexColor('#102940'); INK=HexColor('#243b53'); GOLD=HexColor('#bd9553')
W,H=595.28,841.89
for p in json.loads((ROOT/'data/product-information-hu.json').read_text()):
    path=OUT/f"{p['slug']}-adatlap.pdf"
    c=canvas.Canvas(str(path),pagesize=(W,H)); c.setTitle(p['name']+' | Termékinformációs adatlap | EximpWorld Kft.'); c.setAuthor('EximpWorld Kft.'); c.setSubject('Általános termékinformáció - nem SDS, CoA vagy beszállítói specifikáció')
    c.setFillColor(NAVY); c.rect(0,H-145,W,145,fill=1,stroke=0)
    c.setFillColor(white); c.roundRect(39,H-84,58,58,8,fill=1,stroke=0)
    c.drawImage(ImageReader(str(ROOT/'public/eximpworld-globe-logo.png')),43,H-80,50,50,preserveAspectRatio=True,anchor='c',mask='auto')
    c.setFillColor(white); c.setFont('BrandSans-Bold',14); c.drawString(112,H-48,'EximpWorld Kft.')
    c.setFillColor(HexColor('#d8bb81')); c.setFont('BrandSans',9); c.drawString(112,H-67,'TERMÉKINFORMÁCIÓS ADATLAP')
    c.setFillColor(white); c.setFont('BrandSans-Bold',21); c.drawString(40,H-119,p['name'])
    c.setStrokeColor(GOLD); c.setLineWidth(3); c.line(40,H-145,W-40,H-145)
    y=H-166
    def para(text,size=10,color=INK,leading=14,indent=0):
        global y
        q=Paragraph(text,ParagraphStyle('body',fontName='BrandSans',fontSize=size,leading=leading,textColor=color))
        _,h=q.wrap(W-80-indent,1000); q.drawOn(c,40+indent,y-h); y-=h+7
    def section(title):
        global y
        y-=16; c.setFillColor(NAVY); c.setFont('BrandSans-Bold',11); c.drawString(40,y,title); y-=17
    para(escape(p['synonyms']),9)
    section('01  Termékazonosítás')
    for label,value in [('CAS-szám',p['cas']),('EC-szám',p['ec']),('Molekulaképlet',p['formula'])]:
        para(f'<b>{label}</b> &nbsp; {escape(value)}',10,leading=12)
    section('02  Általános fizikai-kémiai jellemzők')
    for label,value in p['properties']:
        para(f'<b>{label}</b> &nbsp; {escape(value)}',10,leading=12)
    para(escape(p['note']),9,leading=12)
    section('03  Tipikus ipari felhasználások')
    para(escape(p['applications'])+' Az alkalmazhatóság a visszaigazolt minőségtől és a technológiai követelményektől függ.',10)
    section('04  Kiszerelés és dokumentáció')
    para('A kiszerelést és a szállítás módját az ajánlatadás során egyedileg egyeztetjük. Megrendelés előtt kérje a beszállítói biztonsági adatlapot (SDS) és műszaki specifikációt, szükség esetén a tételhez tartozó analitikai bizonylatot (CoA).',10)
    para('Kapcsolat: <link href="mailto:sales@eximpworld.hu" color="#1759a6">sales@eximpworld.hu</link>',10)
    y-=5
    q=Paragraph(escape(DISCLAIMER),ParagraphStyle('disclaimer',fontName='BrandSans',fontSize=9,leading=12,textColor=INK))
    _,h=q.wrap(W-104,1000); c.setFillColor(HexColor('#f6f1e7')); c.roundRect(40,y-h-18,W-80,h+18,5,fill=1,stroke=0); q.drawOn(c,52,y-h-9); y-=h+31
    para('Források (ellenőrizve: '+p['issued']+'). A gyártói szakirodalom kizárólag tájékoztató forrás; nem jelöli meg beszállítónkat és nem tanúsítja a szállított terméket.',8,leading=10)
    for s in p['sources']:
        para('<link href="'+escape(s['url'],{'"':'&quot;'})+'" color="#1759a6">'+escape(s['title'])+'</link>',8,leading=10)
    assert y>53,(p['slug'],y)
    c.setStrokeColor(HexColor('#dce4ec')); c.setLineWidth(.5); c.line(40,45,W-40,45)
    c.setFillColor(INK); c.setFont('BrandSans',8); c.drawString(40,30,f"Verzió {p['version']} | Kiadás: {p['issued']}"); c.drawRightString(W-40,30,'EximpWorld Kft. | 1 / 1')
    c.save(); shutil.copyfile(path,PUBLIC/path.name); print(path.name, 'content bottom',round(y))
