"""Preserve approved Markdown wording in website JSON and branded PDF drafts.
Source files named {hu,en}-terms.md are rendered verbatim. The user confirmed
the supplied UK source ends mid-clause 11.2; an editorial note identifies this.
"""
from pathlib import Path
import re, json, shutil, hashlib
from xml.sax.saxutils import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/pdf/terms'; OUT.mkdir(parents=True, exist_ok=True)
PUBLIC=ROOT/'public/downloads/terms'; PUBLIC.mkdir(parents=True, exist_ok=True)
fonts=Path('/System/Library/Fonts/Supplemental')
for name,file in [('Legal','Arial.ttf'),('LegalBold','Arial Bold.ttf')]: pdfmetrics.registerFont(TTFont(name,str(fonts/file)))
navy=colors.HexColor('#102940'); gold=colors.HexColor('#b69759')
body=ParagraphStyle('Body',fontName='Legal',fontSize=10,leading=15,textColor=navy,spaceAfter=9)
heading=ParagraphStyle('Heading',parent=body,fontName='LegalBold',fontSize=13,leading=18,spaceBefore=14,spaceAfter=10,keepWithNext=True)
title=ParagraphStyle('Title',parent=heading,fontSize=24,leading=30,spaceBefore=22,spaceAfter=18)
small=ParagraphStyle('Small',parent=body,fontSize=9,leading=13)

def plain(s): return re.sub(r'\*\*(.*?)\*\*|\*(.*?)\*',lambda m:m[1] or m[2],s)

def parse(source):
    chunks=re.split(r'\n\s*\n|\n(?=##? )',source.strip()); doc={'sections':[]}; current=None
    for chunk in chunks:
        if chunk.startswith('# '): doc['company']=chunk[2:]
        elif chunk.startswith('## '): doc['title']=chunk[3:]
        elif chunk.startswith('### '):
            current={'id':'section-'+str(len(doc['sections'])+1),'heading':chunk[4:],'paragraphs':[]}; doc['sections'].append(current)
        elif chunk=='---': current=None
        elif current: current['paragraphs'].append(plain(chunk))
        elif chunk.startswith('**Státusz:') or chunk.startswith('**Status:'): doc['status']=plain(chunk)
        elif 'tagline' not in doc: doc['tagline']=plain(chunk)
        elif 'notice' not in doc: doc['notice']=plain(chunk)
        else: doc['status']=plain(chunk)
    return doc

def decorate(c,doc,company,locale):
    c.saveState();w,h=doc.pagesize
    c.setFillColor(navy);c.rect(0,h-64,w,64,fill=1,stroke=0)
    c.setFillColor(colors.white);c.roundRect(42,h-53,42,42,5,fill=1,stroke=0)
    c.drawImage(str(ROOT/'public/eximpworld-globe-logo.png'),45,h-50,36,36,preserveAspectRatio=True,mask='auto')
    c.setFont('LegalBold',11);c.drawString(99,h-31,company)
    c.setFont('Legal',8);c.setFillColor(colors.HexColor('#e2c892'));c.drawString(99,h-47,'Jogi felülvizsgálatra szánt tervezet' if locale=='hu' else 'Draft for legal review')
    c.setStrokeColor(gold);c.line(42,44,w-42,44);c.setFont('Legal',8);c.setFillColor(navy)
    c.drawString(42,29,company);c.drawRightString(w-42,29,str(doc.page));c.restoreState()
result={}
for locale in ['hu','en']:
    src=ROOT/f'data/legal/{locale}-terms.md'
    if not src.exists(): continue
    raw=src.read_text();doc=parse(raw)
    assert doc.get('notice') and len(doc['sections'])>=11, 'Invalid source structure'
    if locale == 'en': doc['editorialNote']='Preview note (not part of the supplied terms): The supplied text ends with an incomplete sentence in clause 11.2.'
    doc['sourceSha256']=hashlib.sha256(src.read_bytes()).hexdigest()
    filename='eximpworld-kft-aszf-tervezet.pdf' if locale=='hu' else 'eximpworld-ltd-terms-draft.pdf'
    doc['pdf']='/downloads/terms/'+filename
    story=[Paragraph(escape(doc['title']),title),Paragraph(escape(doc['tagline']),heading),Paragraph(escape(doc['notice']),body),Spacer(1,18),Paragraph('Tartalomjegyzék' if locale=='hu' else 'Contents',heading)]
    if doc.get('editorialNote'): story.insert(3,Paragraph(escape(doc['editorialNote']),small))
    for section in doc['sections']: story.append(Paragraph(f'<link href="#{section["id"]}" color="#2456a0">{escape(section["heading"])}</link>',small))
    story.append(PageBreak())
    for section in doc['sections']:
        story.append(Paragraph(f'<a name="{section["id"]}"/>'+escape(section['heading']),heading))
        for p in section['paragraphs']: story.append(Paragraph(escape(p),body))
    if doc.get('status'): story.extend([Spacer(1,16),Paragraph(escape(doc['status']),small)])
    pdf=SimpleDocTemplate(str(OUT/filename),pagesize=(595.28,841.89),leftMargin=46,rightMargin=46,topMargin=86,bottomMargin=62,title=doc['title'],author=doc['company'],subject=doc['notice'])
    draw=lambda c,d:decorate(c,d,doc['company'],locale)
    pdf.build(story,onFirstPage=draw,onLaterPages=draw)
    shutil.copyfile(OUT/filename,PUBLIC/filename);result[locale]=doc
    print(locale,len(doc['sections']),filename)
(ROOT/'data/legal/terms.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
