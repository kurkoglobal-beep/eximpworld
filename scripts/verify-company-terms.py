from pathlib import Path
import re,json,hashlib
import pdfplumber
root=Path(__file__).resolve().parents[1]
docs=json.loads((root/'data/legal/terms.json').read_text())
norm=lambda s:re.sub(r'\s+',' ',s).strip()
for lang,doc in docs.items():
    source=root/f'data/legal/{lang}-terms.md'
    assert hashlib.sha256(source.read_bytes()).hexdigest()==doc['sourceSha256']
    raw=source.read_text()
    lines=[re.sub(r'^#{1,3} ','',line) for line in raw.splitlines() if line.strip() and line!='---']
    original=norm(' '.join(lines).replace('**','').replace('*',''))
    assembled=[doc['company'],doc['title'],doc['tagline'],doc['notice']]
    for section in doc['sections']: assembled.extend([section['heading'],*section['paragraphs']])
    if doc.get('status'): assembled.append(doc['status'])
    assert original==norm(' '.join(assembled)), f'{lang}: source changed'
    with pdfplumber.open(root/'public'/doc['pdf'].lstrip('/')) as pdf:
        text=norm(' '.join(page.crop((0,65,page.width,page.height-55)).extract_text() or '' for page in pdf.pages[1:]))
        for section in doc['sections']:
            assert norm(section['heading']) in text
            for p in section['paragraphs']: assert norm(p) in text, p
        if doc.get('status'): assert norm(doc['status']) in text
        for page in pdf.pages:
            for c in page.chars:
                assert c['x0']>=0 and c['x1']<=page.width and c['top']>=0 and c['bottom']<=page.height
        links=pdf.pages[0].annots
        assert len(links)==len(doc['sections'])
        print(lang, len(pdf.pages),'pages: source/JSON exact, PDF all clauses present, TOC links and page bounds pass')
