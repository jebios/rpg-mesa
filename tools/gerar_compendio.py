import json, re, sys, unicodedata
sys.path.insert(0, '/home/claude/phb')
from fluxo import stream

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def clean(t):
    t = re.sub(r'\s+', ' ', t).strip()
    return t

# ---------------------------------------------------------------- MAGIAS
CLASSMAP = {'Bardo': 'bardo', 'Bruxo': 'bruxo', 'Clérigo': 'clerigo', 'Druida': 'druida', 'Feiticeiro': 'feiticeiro',
            'Guardião': 'guardiao', 'Patrulheiro': 'guardiao', 'Mago': 'mago', 'Paladino': 'paladino'}

def parse_spells():
    els = stream(245, 349)
    spells = []
    cur = None
    for idx, e in enumerate(els):
        k = e[0]
        if k == 'h3':
            nxt = els[idx + 1] if idx + 1 < len(els) else None
            if nxt and nxt[0] in ('i', 'p') and re.match(r'(\d)[º°] Círculo|Truque de', nxt[1]):
                cur = dict(nome=e[1].strip(), desc=[]); spells.append(cur); continue
        if cur is None: continue
        if k in ('i', 'p') and 'nivel' not in cur:
            m = re.match(r'(?:(\d)[º°] Círculo,\s*(\w+)|Truque de (\w+))\s*\(([^)]*)\)', e[1])
            if m:
                cur['nivel'] = int(m.group(1)) if m.group(1) else 0
                cur['escola'] = (m.group(2) or m.group(3)).capitalize()
                cur['classes'] = sorted({CLASSMAP.get(c.strip(), slug(c.strip())) for c in m.group(4).split(',')})
            continue
        if k == 'scala':
            m = re.match(r'\*\*(Tempo de Conjuração|Alcance|Componentes?|Duração):\*\*\s*(.*)', e[1])
            if m:
                field = {'Tempo de Conjuração': 'tempo', 'Alcance': 'alcance', 'Componentes': 'componentes', 'Componente': 'componentes', 'Duração': 'duracao'}[m.group(1)]
                cur[field] = m.group(2).strip(); cur['_last'] = field
            elif cur.get('_last') and not cur['desc']:
                cur[cur['_last']] += ' ' + e[1].strip()
            continue
        if k == 'p':
            cur['desc'].append(clean(e[1]))
        if k in ('h1', 'h2', 'class', 'table'):
            cur = None if k != 'table' else cur
    out = []
    for s in spells:
        s.pop('_last', None)
        if 'nivel' not in s: print('SEM NIVEL', s['nome']); continue
        s['id'] = slug(s['nome'])
        s['concentracao'] = 'Concentração' in s.get('duracao', '')
        s['ritual'] = 'Ritual' in s.get('tempo', '')
        s['desc'] = '\n\n'.join(s['desc'])
        out.append(s)
    return out

# ---------------------------------------------------------------- TALENTOS
def parse_feats():
    els = stream(206, 218)
    feats = []; cur = None
    for idx, e in enumerate(els):
        if e[0] == 'h3':
            nxt = els[idx + 1] if idx + 1 < len(els) else None
            if nxt and nxt[0] == 'i' and re.match(r'Talento|Dádiva', nxt[1]):
                cur = dict(nome=e[1].strip(), desc=[]); feats.append(cur); continue
        if cur is None: continue
        if e[0] == 'i' and 'categoria' not in cur:
            t = e[1]
            cat = 'Origem' if 'Origem' in t else 'Estilo de Luta' if 'Estilo de Luta' in t else 'Dádiva Épica' if 'Épica' in t else 'Geral'
            cur['categoria'] = cat
            m = re.search(r'Pré-requisito:\s*([^)]*)\)?', t)
            cur['prereq'] = m.group(1).strip() if m else ''
            continue
        if e[0] == 'p': cur['desc'].append(clean(e[1]))
        if e[0] in ('h1', 'h2', 'class'): cur = None
    for f in feats:
        f['id'] = slug(f['nome']); f['desc'] = '\n\n'.join(f['desc'])
        f['repetivel'] = '**Repetível.**' in f['desc']
    return feats

if __name__ == '__main__':
    sp = parse_spells(); ft = parse_feats()
    print(len(sp), 'magias;', len(ft), 'talentos')
    import collections
    print(collections.Counter(s['nivel'] for s in sp))
    print(collections.Counter(f['categoria'] for f in ft))
    for s in sp[:2] + [x for x in sp if x['id'] == 'bola-de-fogo']: print(json.dumps(s, ensure_ascii=False)[:900])
    bad = [s['nome'] for s in sp if not all(k in s for k in ('tempo', 'alcance', 'componentes', 'duracao')) or not s['desc']]
    print('incompletas:', bad)
    json.dump(dict(spells=sp, feats=ft), open('./partial.json', 'w'), ensure_ascii=False)

# ---------------------------------------------------------------- utilidades de tabela
def row_cells(e):
    cells = []; end = None
    for x, f, t, sz in e[2]:
        t = t.strip()
        if not t: continue
        if end is not None and x - end <= 10 and cells:
            sep = '' if t[:1] in '.,;:)' or cells[-1].endswith('(') else ' '
            cells[-1] += sep + t
        else:
            cells.append(t)
        end = x + len(t) * 4.4
    return e[2][0][0], cells

def row_of(e):
    return ' | '.join(row_cells(e)[1]) if e[0] == 'scala' and e[2] else e[1]

def body_block(els, i, stop):
    """Junta conteúdo (parágrafos + tabelas) a partir de i até um elemento de parada. Retorna (texto, novo_i)."""
    parts = []; tab_x = 0
    while i < len(els) and not stop(els[i]):
        e = els[i]
        if e[0] == 'p': parts.append(clean(e[1]))
        elif e[0] == 'i': parts.append('_' + clean(e[1]) + '_')
        elif e[0] == 'table': parts.append('### ' + e[1])
        elif e[0] == 'scala' and e[2]:
            x0, cells = row_cells(e)
            prev = parts[-1] if parts else ''
            if prev.startswith('| ') and x0 > tab_x + 15:  # continuação da célula anterior
                parts[-1] = join_txt(prev, ' '.join(cells))
            else:
                if not prev.startswith('| '): tab_x = x0
                parts.append('| ' + ' | '.join(cells))
        elif e[0] == 'h3': parts.append('#### ' + e[1])
        i += 1
    # linhas de tabela consecutivas
    txt = '\n\n'.join(parts).replace('\n\n| ', '\n| ')
    return txt, i

# ---------------------------------------------------------------- ANTECEDENTES
ABIL = {'Força': 'for', 'Destreza': 'des', 'Constituição': 'con', 'Inteligência': 'int', 'Sabedoria': 'sab', 'Carisma': 'car'}
SKILLS = {'Acrobacia': 'acrobacia', 'Arcanismo': 'arcanismo', 'Atletismo': 'atletismo', 'Atuação': 'atuacao', 'Enganação': 'enganacao',
          'Furtividade': 'furtividade', 'História': 'historia', 'Intimidação': 'intimidacao', 'Intuição': 'intuicao', 'Investigação': 'investigacao',
          'Lidar com Animais': 'lidar-animais', 'Medicina': 'medicina', 'Natureza': 'natureza', 'Percepção': 'percepcao', 'Persuasão': 'persuasao',
          'Prestidigitação': 'prestidigitacao', 'Religião': 'religiao', 'Sobrevivência': 'sobrevivencia'}

def find_skills(t):
    return [v for k, v in SKILLS.items() if re.search(r'\b' + k + r'\b', t)]

def parse_backgrounds(feats):
    els = stream(184, 191)
    bgs = []; cur = None
    for e in els:
        if e[0] == 'h1' and e[1] not in ('Descrições dos Antecedentes',):
            cur = dict(nome=e[1].strip(), desc=[], _kv={}); bgs.append(cur); continue
        if cur is None: continue
        if e[0] == 'scala':
            m = re.match(r'\*\*([^*]+):\*\*\s*(.*)', e[1])
            if m: cur['_last'] = m.group(1).strip(); cur['_kv'][cur['_last']] = m.group(2)
            elif cur.get('_last'): cur['_kv'][cur['_last']] = join_txt(cur['_kv'][cur['_last']], e[1])
        elif e[0] == 'p': cur['desc'].append(clean(e[1]))
        elif e[0] in ('h1', 'h2'): cur = None
    fid = {f['nome'].lower(): f['id'] for f in feats}
    out = []
    for b in bgs:
        kv = b['_kv']
        if 'Talento' not in kv: continue
        talento = re.sub(r'\(.*?\)', '', kv.get('Talento', '')).strip()
        base = talento.split('(')[0].strip()
        out.append(dict(
            id=slug(b['nome']), nome=b['nome'],
            atributos=[ABIL[a.strip()] for a in re.split(r',|\be\b', kv.get('Valores de Atributo', '')) if a.strip() in ABIL],
            talento=talento, talentoId=fid.get(base.lower().replace(' (veja o capítulo 5)', ''), slug(base)),
            pericias=find_skills(next((v for k2, v in kv.items() if 'Perícia' in k2), '')),
            ferramenta=kv.get('Proficiência com Ferramentas', '').strip(),
            equipamento=kv.get('Equipamento', '').strip(),
            desc=''))
    return out

def join_txt(a, b):
    a = a.rstrip()
    return a[:-1] + b.strip() if a.endswith('-') else a + ' ' + b.strip()

# ---------------------------------------------------------------- ESPÉCIES
def parse_species():
    els = stream(191, 204)
    sp = []; i = 0
    while i < len(els):
        e = els[i]
        if e[0] == 'h2':
            nome = e[1].strip(); i += 1
            intro, i = body_block(els, i, lambda x: x[0] in ('h2',) or (x[0] == 'h3' and x[1].startswith('Traços de')))
            cur = dict(id=slug(nome), nome=nome, intro=intro, tipo='', tamanho='', deslocamento='', tracos=[])
            if i < len(els) and els[i][0] == 'h3': i += 1
            # pares chave/valor
            lastk = None
            while i < len(els) and els[i][0] == 'scala':
                m = re.match(r'\*\*([^*]+):\*\*\s*(.*)', els[i][1])
                if m:
                    lastk = {'Tipo de Criatura': 'tipo', 'Tamanho': 'tamanho', 'Deslocamento': 'deslocamento'}.get(m.group(1).strip())
                    if lastk: cur[lastk] = m.group(2).strip()
                elif lastk: cur[lastk] = join_txt(cur[lastk], els[i][1])
                i += 1
            texto, i = body_block(els, i, lambda x: x[0] in ('h2', 'h1', 'class'))
            # quebra em traços pelo marcador **Nome.**
            parts = re.split(r'\n\n(?=\*\*[^*]+\.\*\*)', '\n\n' + texto)
            for ptxt in parts:
                ptxt = ptxt.strip()
                m = re.match(r'\*\*([^*]+)\.\*\*\s*(.*)', ptxt, re.S)
                if m: cur['tracos'].append(dict(nome=m.group(1).strip(), desc=m.group(2).strip()))
                elif ptxt and cur['tracos']: cur['tracos'][-1]['desc'] += '\n\n' + ptxt
                elif ptxt: cur['tracos'].append(dict(nome='Detalhes', desc=ptxt))
            sp.append(cur); continue
        i += 1
    return sp

# ---------------------------------------------------------------- CLASSES
CLASS_IDS = {'Bárbaro': 'barbaro', 'Bardo': 'bardo', 'Bruxo': 'bruxo', 'Clérigo': 'clerigo', 'Druida': 'druida', 'Feiticeiro': 'feiticeiro',
             'Guardião': 'guardiao', 'Guerreiro': 'guerreiro', 'Ladino': 'ladino', 'Mago': 'mago', 'Monge': 'monge', 'Paladino': 'paladino'}

def parse_features(els, i, stop):
    feats = []
    while i < len(els) and not stop(els[i]):
        e = els[i]
        if e[0] == 'h3':
            m = re.match(r'Nível (\d+):\s*(.+)', e[1].strip())
            i += 1
            txt, i = body_block(els, i, lambda x: x[0] in ('h3', 'h2', 'h1', 'class') or stop(x))
            if m: feats.append(dict(nivel=int(m.group(1)), nome=m.group(2).strip(), desc=txt))
            elif feats: feats[-1]['desc'] += '\n\n#### ' + e[1] + '\n\n' + txt
            continue
        i += 1
    return feats, i

def parse_classes():
    els = stream(56, 182)
    classes = []
    i = 0
    while i < len(els):
        e = els[i]
        if e[0] == 'class' and e[1].strip() in CLASS_IDS:
            nome = e[1].strip(); cid = CLASS_IDS[nome]
            c = dict(id=cid, nome=nome, tracos={}, caracteristicas=[], subclasses=[], opcoes=[], lema='', intro='')
            classes.append(c); i += 1
            if i < len(els) and els[i][0] == 'i': c['lema'] = els[i][1]; i += 1
            # traços básicos
            last = None
            while i < len(els) and els[i][0] != 'h2':
                x = els[i]
                if x[0] == 'scala':
                    m = re.match(r'\*\*([^*]+)\*\*\s*(.*)', x[1])
                    if m: last = m.group(1).strip(); c['tracos'][last] = m.group(2).strip()
                    elif last: c['tracos'][last] = join_txt(c['tracos'][last], x[1])
                elif x[0] == 'p': c['intro'] += ('\n\n' if c['intro'] else '') + clean(x[1])
                i += 1
            continue
        if not classes: i += 1; continue
        c = classes[-1]
        if e[0] == 'h2' and e[1].startswith('Características de Classe'):
            feats, i = parse_features(els, i + 1, lambda x: x[0] in ('h2', 'h1', 'class'))
            c['caracteristicas'] = feats; continue
        if e[0] == 'h2' and e[1].startswith('Opções de'):
            titulo = e[1].strip(); i += 1
            intro, i = body_block(els, i, lambda x: x[0] in ('h3', 'h2', 'h1', 'class'))
            ops = []
            while i < len(els) and els[i][0] == 'h3':
                n = els[i][1].strip(); i += 1
                txt, i = body_block(els, i, lambda x: x[0] in ('h3', 'h2', 'h1', 'class'))
                ops.append(dict(id=slug(n), nome=n, desc=txt))
            c['opcoes'].append(dict(titulo=titulo, intro=intro, itens=ops)); continue
        if e[0] == 'h2' and els_in_subclasses(els, i):
            nome = e[1].strip(); i += 1
            intro, i = body_block(els, i, lambda x: x[0] in ('h3', 'h2', 'h1', 'class'))
            feats, i = parse_features(els, i, lambda x: x[0] in ('h2', 'h1', 'class'))
            c['subclasses'].append(dict(id=slug(nome), nome=nome, intro=intro, caracteristicas=feats)); continue
        i += 1
    # normalização dos traços básicos
    for c in classes:
        t0 = c['tracos']; t = {}
        keys = list(t0)
        for n, k in enumerate(keys):
            if k.strip() == 'Proficiências com' and n + 1 < len(keys):  # rótulo quebrado em duas linhas
                t['Ferramentas'] = t0[k] + ' ' + t0[keys[n + 1]]; continue
            if n > 0 and keys[n - 1].strip() == 'Proficiências com': continue
            t[k] = t0[k]
        def g(word):
            return next((v for k, v in t.items() if word in k), '')
        c['tracos'] = t
        dv = re.search(r'D(\d+)', t.get('Dado de Ponto de Vida', ''), re.I)
        c['dadoVida'] = int(dv.group(1)) if dv else 8
        c['salvaguardas'] = [ABIL[a] for a in ABIL if a in g('Salvaguarda')]
        per = g('Perícia')
        n = re.search(r'Escolha (?:quaisquer )?(\d+)', per)
        c['periciasEscolha'] = int(n.group(1)) if n else 2
        c['periciasOpcoes'] = list(SKILLS.values()) if 'quaisquer' in per.lower() or 'qualquer' in per.lower() else find_skills(per)
        c['armas'] = g('Armas')
        c['armaduras'] = g('Armadura')
        c['ferramentas'] = g('Ferramentas')
        c['equipamentoInicial'] = g('Equipamento')
        c['atributoPrimario'] = g('Atributo')
    return classes

_SUB = {}
def els_in_subclasses(els, i):
    # verdadeiro se o h2 está depois de "Subclasses de X" e antes da próxima classe
    j = i
    while j >= 0:
        if els[j][0] == 'class': return False
        if els[j][0] == 'h1' and els[j][1].startswith('Subclasses de'): return True
        j -= 1
    return False

# ---------------------------------------------------------------- EQUIPAMENTO
import json as _json
_LINES = _json.load(open('./lines.json'))

def table_rows(page):
    rows = {}
    for l in _LINES:
        if l['p'] == page:
            for x, f, t, s in l['spans']:
                if t.strip(): rows.setdefault(round(l['y']), []).append((x, t.strip()))
    return [[t for x, t in sorted(rows[y])] for y in sorted(rows)]

def parse_weapons():
    out = []; cat = ''
    for page in (221, 222):
        for r in table_rows(page):
            if len(r) == 1 and r[0].startswith('Armas ') and ('Corpo' in r[0] or 'Distância' in r[0]): cat = r[0]; continue
            if len(r) >= 6 and re.match(r'\d+d\d+|1\b', r[1]):
                out.append(dict(id=slug(r[0]), nome=r[0], tipo='arma', categoria=cat, dano=r[1].rstrip(','), propriedades=r[2].rstrip(','),
                                maestria=r[3], peso=r[4], custo=r[5]))
            elif out and len(r) == 1 and out[-1] and not r[0].startswith(('Armas', 'Nome', 'CAPÍTULO')) and len(r[0]) < 40 and page == 221:
                out[-1]['propriedades'] = (out[-1]['propriedades'] + ' ' + r[0]).strip()
    return out

def parse_armor():
    out = []; cat = ''
    for r in table_rows(225):
        if len(r) == 1 and re.match(r'Armadura (Leve|Média|Pesada)|Escudo', r[0]): cat = r[0]; continue
        if len(r) >= 5 and re.search(r'\d', r[1]) and ('PO' in r[-1] or 'PP' in r[-1]):
            out.append(dict(id=slug(r[0]), nome=r[0], tipo='armadura', categoria=cat, ca=r[1], forca=r[2] if len(r) > 5 else '—',
                            furtividade=r[-3] if len(r) > 5 else r[2], peso=r[-2], custo=r[-1]))
    return out

def parse_gear():
    els = stream(229, 240)
    out = []; i = 0
    while i < len(els):
        e = els[i]
        m = re.match(r'(.+?)\s*\(([^)]*(?:PO|PP|PC|Varia)[^)]*)\)\s*$', e[1]) if e[0] == 'h3' else None
        if m:
            i += 1
            txt, i = body_block(els, i, lambda x: x[0] in ('h3', 'h2', 'h1', 'class', 'table'))
            out.append(dict(id=slug(m.group(1)), nome=m.group(1).strip(), tipo='ferramenta' if 'Ferramentas' in m.group(1) or 'Kit' in m.group(1) or 'Suprimentos' in m.group(1) or 'Utensílios' in m.group(1) or 'Instrumento' in m.group(1) else 'item',
                            custo=m.group(2), desc=txt))
            continue
        i += 1
    return out

def build():
    sp = parse_spells(); ft = parse_feats()
    comp = dict(versao='phb2024-1', spells=sp, feats=ft, backgrounds=parse_backgrounds(ft), species=parse_species(),
                classes=parse_classes(), weapons=parse_weapons(), armor=parse_armor(), gear=parse_gear())
    return comp
