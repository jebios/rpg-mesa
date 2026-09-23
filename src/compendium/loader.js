// Carrega o compêndio (JSON estático em public/data) uma única vez.
let cache;
export async function loadCompendium() {
  if (cache) return cache;
  const base = new URL('data/', document.baseURI);
  const get = (f) => fetch(new URL(f, base)).then((r) => r.json());
  const [classes, species, spells] = await Promise.all([get('classes.json'), get('species.json'), get('spells.json')]);
  cache = { classes, species, spells };
  return cache;
}
