import pymupdf, json, collections
d=pymupdf.open('phb.pdf')
out=[]
for pno in range(len(d)):
    p=d[pno]; W=p.rect.width
    lines=[]
    for b in p.get_text('dict')['blocks']:
        if 'lines' not in b: continue
        for l in b['lines']:
            spans=[s for s in l['spans'] if s['text'].strip() and s['size']>=6 and 'DaiVernon' not in s['font']]
            if not spans: continue
            x0=min(s['bbox'][0] for s in spans); y0=min(s['bbox'][1] for s in spans)
            if y0>740: continue  # footer
            col=0 if x0< W/2-10 else 1
            lines.append(dict(p=pno+1,col=col,x=round(x0),y=round(y0,1),size=round(spans[0]['size'],1),font=spans[0]['font'],
              spans=[(round(s['bbox'][0]),s['font'],s['text'],round(s['size'],1)) for s in spans if s['size']>=6]))
    # merge lines on same (col,y) (spans split across blocks)
    lines.sort(key=lambda L:(L['col'],L['y'],L['x']))
    merged=[]
    for L in lines:
        if merged and merged[-1]['col']==L['col'] and abs(merged[-1]['y']-L['y'])<2.5:
            merged[-1]['spans']=sorted(merged[-1]['spans']+L['spans'])
        else: merged.append(L)
    out+=merged
json.dump(out,open('lines.json','w'),ensure_ascii=False)
out=out
c=collections.Counter((L['font'],L['size']) for L in out if 55<=L['p']<=240)
for k,v in c.most_common(40): print(v,k)
