"""Converte lines.json em um fluxo de elementos por capítulo (títulos, parágrafos, pares chave/valor)."""
import json, re

L = json.load(open('./lines.json'))

BODY = ('TTJenevers',)


def kind(font, size):
    if 'Wolpe' in font and size >= 30: return 'class'
    if 'MrsEaves' in font and size >= 17: return 'h1'
    if 'MrsEaves' in font and size >= 14: return 'h2'
    if 'MrsEaves' in font and size >= 12: return 'h3'
    if 'ScalaSansCaps-Bold' in font: return 'table'
    if 'TTJenevers-Bold' == font and size > 20: return 'dropcap'
    if font.startswith('TTJenevers-Italic') or font.startswith('TTJenevers-MediumItalic'): return 'italic'
    if font.startswith('TTJenevers'): return 'body'
    if font.startswith('ScalaSans'): return 'scala'
    return 'other'


def join_lines(a, b):
    if not a: return b
    if a.endswith('-') and b.startswith('-'): return a + b[1:]
    if a.endswith('-') and len(a) > 1 and a[-2].isalpha() and b[:1].islower():
        return a[:-1] + b
    return a + ' ' + b


def text_of(spans, bold_marks=True):
    out = ''
    for x, f, t, s in spans:
        if bold_marks and ('BoldItalic' in f or f.endswith('-Bold') or 'BoldLF' in f):
            t2 = t.strip()
            if t2: out += '**' + t2 + '** ' if not out else ' **' + t2 + '** '
        else:
            out += t
    out = re.sub(r'\s+', ' ', out).strip()
    out = out.replace('** **', ' ')
    return out


def stream(p0, p1):
    """Elementos em ordem de leitura entre as páginas p0..p1."""
    lines = [l for l in L if p0 <= l['p'] <= p1]
    els = []
    para = None
    dropcap = ''
    colmin = {}
    for l in lines:
        k = (l['p'], l['col'])
        if kind(l['font'], l['size']) in ('body', 'italic'):
            colmin[k] = min(colmin.get(k, 9999), l['x'])
    prev_key = None
    for l in lines:
        key = (l['p'], l['col'])
        kd = kind(l['font'], l['size'])
        raw = ''.join(t for x, f, t, s in l['spans']).strip()
        if not raw: continue
        if kd == 'dropcap':
            dropcap = raw; continue
        if kd in ('class', 'h1', 'h2', 'h3', 'table'):
            para = None
            # títulos quebrados em duas linhas (mesma coluna, logo abaixo)
            if els and els[-1][0] == kd and els[-1][3] == key and 0 < l['y'] - els[-1][4] < 22:
                els[-1] = (kd, (els[-1][1] + ' ' + raw).strip(), None, key, l['y'])
            else:
                els.append((kd, re.sub(r'(.+)\1$', r'\1', raw), None, key, l['y']))
            continue
        if kd == 'scala':
            para = None
            els.append(('scala', text_of(l['spans']), l['spans'], key, l['y']))
            continue
        if kd in ('body', 'italic'):
            txt = text_of(l['spans'])
            had_dc = bool(dropcap)
            if dropcap:
                txt = dropcap + txt.lstrip('*').lstrip(); dropcap = ''
            indent = l['x'] > colmin.get(key, l['x']) + 4
            starts_bold = l['spans'][0][1].startswith('TTJenevers-Bold')
            if para is not None and para[2] > 0 and key == para[3]:
                indent = False; para[2] -= 1
            new_para = para is None or indent or starts_bold or kd != para[0] or txt.startswith('•')
            if new_para:
                para = [kd, txt, 3 if had_dc else 0, key]
                els.append(('p' if kd == 'body' else 'i', para, None, key, l['y']))
            else:
                para[1] = join_lines(para[1], txt)
            prev_key = key
    # achatar parágrafos
    out = []
    for e in els:
        if e[0] in ('p', 'i'):
            out.append((e[0], e[1][1], e[3]))
        else:
            out.append((e[0], e[1], e[3]) if e[0] != 'scala' else ('scala', e[1], e[2], e[3]))
    return out


if __name__ == '__main__':
    import sys
    a, b = int(sys.argv[1]), int(sys.argv[2])
    for e in stream(a, b):
        print(e[0], '|', (e[1] if isinstance(e[1], str) else e[1])[:150])
