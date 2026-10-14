// Catálogo de itens comuns (recipientes, luz, comida, ferramentas, kits e pacotes de aventureiro),
// extraído das tabelas do Escudo do Mestre. Fica em public/data (não depende do compêndio importado).
let cache;
export async function loadItensComuns() {
  if (cache) return cache;
  try {
    const base = new URL('data/', document.baseURI);
    const r = await fetch(new URL('itens-comuns.json', base));
    const j = await r.json();
    cache = j.itens || [];
  } catch {
    cache = [];
  }
  return cache;
}
