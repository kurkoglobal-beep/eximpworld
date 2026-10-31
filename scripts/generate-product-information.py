"""Build the reviewed English PIS documents from the shared evidence manifest.
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
FONT_DIR=Path(reportlab.__file__).parent/'fonts'
pdfmetrics.registerFont(TTFont('BrandSans', str(FONT_DIR/'Vera.ttf')))
pdfmetrics.registerFont(TTFont('BrandSans-Bold', str(FONT_DIR/'VeraBd.ttf')))
pdfmetrics.registerFontFamily('BrandSans', normal='BrandSans', bold='BrandSans-Bold', italic='BrandSans', boldItalic='BrandSans-Bold')
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/pdf'; OUT.mkdir(parents=True,exist_ok=True)
PUBLIC=ROOT/'public/downloads/product-information'; PUBLIC.mkdir(parents=True,exist_ok=True)
DISCLAIMER='General product information only. This document does not constitute a supplier-specific technical specification, Safety Data Sheet or Certificate of Analysis. Final specifications are subject to supplier confirmation.'
NAVY=HexColor('#102940'); INK=HexColor('#243b53'); GOLD=HexColor('#bd9553')
W,H=595.28,841.89
for p in json.loads((ROOT/'data/product-information.json').read_text()):
    path=OUT/f"{p['slug']}-pis.pdf"
    c=canvas.Canvas(str(path),pagesize=(W,H)); c.setTitle(p['name']+' | Product Information Sheet | EXIM WORLD LTD'); c.setAuthor('EXIM WORLD LTD'); c.setSubject('General product information - not an SDS, CoA or supplier specification')
    c.setFillColor(NAVY); c.rect(0,H-145,W,145,fill=1,stroke=0)
    c.setFillColor(white); c.roundRect(39,H-84,58,58,8,fill=1,stroke=0)
    c.drawImage(ImageReader(str(ROOT/'public/eximpworld-globe-logo.png')),43,H-80,50,50,preserveAspectRatio=True,anchor='c',mask='auto')
    c.setFillColor(white); c.setFont('BrandSans-Bold',14); c.drawString(112,H-48,'EXIM WORLD LTD')
    c.setFillColor(HexColor('#d8bb81')); c.setFont('BrandSans',9); c.drawString(112,H-67,'PRODUCT INFORMATION SHEET')
    c.setFillColor(white); c.setFont('BrandSans-Bold',22); c.drawString(40,H-119,p['name'])
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
    section('01  Product identity')
    for label,value in [('CAS number',p['cas']),('EC number',p['ec']),('Molecular formula',p['formula'])]:
        para(f'<b>{label}</b> &nbsp; {escape(value)}',10,leading=12)
    section('02  General physical and chemical characteristics')
    for label,value in p['properties']:
        para(f'<b>{label}</b> &nbsp; {escape(value)}',10,leading=12)
    para(escape(p['note']),9,leading=12)
    section('03  Typical industrial applications')
    para(escape(p['applications'])+' Application suitability depends on the confirmed grade and process requirements.',10)
    section('04  Packaging and documentation')
    para('Packaging and delivery format are confirmed individually at quotation stage. Request the supplier-specific SDS and technical specification before ordering; request a batch-specific Certificate of Analysis where required.',10)
    para('Contact: <link href="mailto:sales@eximpworld.co.uk" color="#1759a6">sales@eximpworld.co.uk</link>',10)
    y-=5
    q=Paragraph(escape(DISCLAIMER),ParagraphStyle('disclaimer',fontName='BrandSans',fontSize=9,leading=12,textColor=INK))
    _,h=q.wrap(W-104,1000); c.setFillColor(HexColor('#f6f1e7')); c.roundRect(40,y-h-18,W-80,h+18,5,fill=1,stroke=0); q.drawOn(c,52,y-h-9); y-=h+31
    para('Reference sources (reviewed '+p['issued']+'). Manufacturer literature is used for general reference only and does not identify our supplier or certify a supplied product.',8,leading=10)
    for s in p['sources']:
        para('<link href="'+escape(s['url'],{'"':'&quot;'})+'" color="#1759a6">'+escape(s['title'])+'</link>',8,leading=10)
    assert y>53,(p['slug'],y)
    c.setStrokeColor(HexColor('#dce4ec')); c.setLineWidth(.5); c.line(40,45,W-40,45)
    c.setFillColor(INK); c.setFont('BrandSans',8); c.drawString(40,30,f"Version {p['version']} | Issued {p['issued']}"); c.drawRightString(W-40,30,'EXIM WORLD LTD | 1 / 1')
    c.save(); shutil.copyfile(path,PUBLIC/path.name); print(path.name, 'content bottom',round(y))
