// Compêndio de regras.
// Fonte principal: o compêndio completo importado pelo Mestre (fica no Firestore, só para usuários logados —
// o conteúdo do Livro do Jogador NÃO vai para o repositório público).
// Reserva: a amostra em public/data (algumas classes, espécies e magias), usada até o compêndio ser importado.
import { CLASS_META, SPECIES_META } from '../core/rules.js';

let cache;

async function sample() {
  const base = new URL('data/', document.baseURI);
  const get = (f) => fetch(new URL(f, base)).then((r) => r.json());
  const [classes, species, spells] = await Promise.all([get('classes.json'), get('species.json'), get('spells.json')]);
  return {
    versao: 'amostra', completo: false,
    classes: classes.map((c) => ({ ...c, subclasses: [], caracteristicas: [], opcoes: [], periciasEscolha: 2, periciasOpcoes: [] })),
    species: species.map((s) => ({ ...s, tracos: [] })),
    spells: spells.map((s) => ({ ...s, desc: s.resumo })),
    feats: [], backgrounds: [], weapons: [], armor: [], gear: [],
  };
}

export function normalize(c) {
  c.classes.forEach((k) => Object.assign(k, { ...CLASS_META[k.id] }, k.atributoConjuracao ? { atributoConjuracao: k.atributoConjuracao } : {}));
  c.species.forEach((s) => Object.assign(s, SPECIES_META[s.id] || {}));
  c.byId = {};
  for (const key of ['spells', 'feats', 'backgrounds', 'species', 'classes', 'weapons', 'armor', 'gear']) {
    c.byId[key] = Object.fromEntries((c[key] || []).map((x) => [x.id, x]));
  }
  c.items = [...(c.weapons || []), ...(c.armor || []), ...(c.gear || [])];
  return c;
}

export async function loadCompendium(be, { force = false } = {}) {
  if (cache && !force) return cache;
  let full = null;
  try { full = be?.getCompendium ? await be.getCompendium() : null; } catch (e) { console.warn('compêndio', e); }
  cache = normalize(full ? { ...full, completo: true } : await sample());
  return cache;
}

/** Valida um arquivo compendio.json antes de importar. */
export function validateCompendium(obj) {
  const need = ['spells', 'feats', 'backgrounds', 'species', 'classes'];
  const miss = need.filter((k) => !Array.isArray(obj?.[k]) || !obj[k].length);
  if (miss.length) throw new Error('Arquivo inválido: faltando ' + miss.join(', '));
  return { magias: obj.spells.length, talentos: obj.feats.length, classes: obj.classes.length, especies: obj.species.length, antecedentes: obj.backgrounds.length, itens: (obj.weapons?.length || 0) + (obj.armor?.length || 0) + (obj.gear?.length || 0) };
}
