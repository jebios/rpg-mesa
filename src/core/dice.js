// Rolagem simples: "2d6+3", "1d20", "d8-1"
export function roll(expr) {
  const m = String(expr).replace(/\s/g, '').match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!m) return null;
  const n = Number(m[1] || 1), faces = Number(m[2]), bonus = Number(m[3] || 0);
  const rolls = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * faces));
  return { rolls, bonus, total: rolls.reduce((a, b) => a + b, 0) + bonus };
}
