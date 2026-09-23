// Grimório do Aventureiro — ficha do jogador (mobile-first).
import { getBackend } from '../firebase/backend.js';
import { loadCompendium } from '../compendium/loader.js';
import { ABILITIES, buildCharacter, derive, fmt, mod } from '../core/rules.js';
import { roll } from '../core/dice.js';
import { hpAction } from '../ui/hp-actions.js';
import { $, esc, store, toast, CONDITIONS, COND_LABEL } from '../ui/util.js';
import { requireLogin, accountChip, bindLogout } from '../ui/auth.js';

const app = $('#app');
const S = { be: null, comp: null, user: null, chId: null, ch: null, tab: 'combate', amount: '', off: [], prevHp: null };
const lastKey = () => `rpgmesa:last:${S.user.uid}`;
const stopAll = () => { S.off.forEach((f) => f()); S.off = []; };

init().catch((e) => { app.innerHTML = `<div class="wrap"><div class="card">Erro ao iniciar: ${esc(e.message)}</div></div>`; });

async function init() {
  [S.be, S.comp] = await Promise.all([getBackend(), loadCompendium()]);
  requireLogin(S.be, app, {
    title: 'Grimório do Aventureiro',
    subtitle: 'Entre com sua conta para acessar seus personagens em qualquer aparelho.',
    onSignedOut: () => { stopAll(); S.ch = null; S.chId = null; S.prevHp = null; },
  }, (user) => {
    S.user = user;
    const last = store.get(lastKey());
    last ? openSheet(last) : showHome();
  });
}

const demoBanner = () => (S.be.mode === 'local'
  ? '<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>' : '');

// ---------- 1. Meus personagens ----------
function showHome() {
  stopAll(); S.chId = null; S.ch = null;
  store.set(lastKey(), null);
  let formOpen = false;
  S.off.push(S.be.watchMyCharacters((list) => {
    const open = $('#newchar')?.open ?? formOpen;
    list.sort((a, b) => a.name.localeCompare(b.name));
    app.innerHTML = `<header class="top"><div class="row"><div class="grow name">Meus personagens</div>${accountChip(S.user)}</div></header>
    <main class="wrap stack">${demoBanner()}
      ${list.map((c) => `<button class="charbtn" data-open="${c.id}">
        <span><b>${esc(c.name)}</b><br><small class="muted">${esc(classLine(c))}</small></span>
        <span class="chip">${c.campaignName ? '🎲 ' + esc(c.campaignName) : 'Sem mesa'}</span></button>`).join('')}
      ${list.length ? '' : '<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <details class="card" id="newchar" ${open || !list.length ? 'open' : ''}><summary class="sumtitle">+ Novo personagem</summary>${builderForm()}</details>
    </main>`;
    bindLogout(S.be, app);
    $('#newchar').ontoggle = (e) => (formOpen = e.target.open);
    app.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openSheet(b.dataset.open)));
    $('#build').onsubmit = async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const abilities = Object.fromEntries(ABILITIES.map(([k]) => [k, Number(f.get(k))]));
      const data = buildCharacter({
        name: f.get('name').trim(), ownerUid: S.user.uid, speciesId: f.get('species'),
        classId: f.get('class'), level: Number(f.get('level')), abilities,
      }, S.comp);
      data.build.ac = 10 + mod(abilities.des);
      try { openSheet(await S.be.createCharacter(data)); } catch (err) { toast(err.message); }
    };
  }));
}

function builderForm() {
  const std = [15, 14, 13, 12, 10, 8];
  return `<form class="stack" id="build" style="margin-top:.75rem">
    <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
    <div class="row">
      <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
        ${S.comp.species.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`).join('')}</select></div>
      <div class="grow"><label for="class">Classe</label><select id="class" name="class">
        ${S.comp.classes.map((c) => `<option value="${c.id}">${esc(c.nome)}</option>`).join('')}</select></div>
      <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
    </div>
    <div><label>Atributos (já com os bônus do antecedente)</label>
      <div class="ab-inputs">${ABILITIES.map(([k, n], i) => `<div><label for="ab-${k}">${n}</label>
        <input id="ab-${k}" name="${k}" type="number" inputmode="numeric" min="1" max="30" value="${std[i]}" /></div>`).join('')}</div></div>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form>`;
}

const classLine = (c) => {
  const cls = S.comp.classes.find((x) => x.id === c.build.classes[0].classId);
  const sp = S.comp.species.find((x) => x.id === c.build.speciesId);
  return `${sp?.nome ?? ''} · ${cls?.nome ?? ''} ${c.build.classes[0].level}`;
};

// ---------- 2. Ficha ----------
function openSheet(chId) {
  stopAll();
  S.chId = chId; S.prevHp = null;
  store.set(lastKey(), chId);
  S.off.push(S.be.watchCharacter(chId, (ch) => {
    if (!ch) return showHome();
    const prev = S.prevHp; S.prevHp = ch.state.hp.current + ch.state.hp.temp;
    S.ch = ch; render();
    if (prev != null && prev !== S.prevHp) {
      const el = $('#hpcard'); el?.classList.add(S.prevHp < prev ? 'flash-dmg' : 'flash-heal');
      if (navigator.vibrate && S.prevHp < prev) navigator.vibrate(80);
    }
  }));
}

const TABS = [['ficha', '📜', 'Ficha'], ['combate', '❤️', 'Combate'], ['magias', '✨', 'Magias'], ['mapa', '🗺️', 'Mapa']];

function render() {
  const ch = S.ch, d = derive(ch, S.comp);
  const hadFocus = document.activeElement?.id === 'amount';
  app.innerHTML = `
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${esc(ch.name)}</div>
        <div class="mini"><span>${esc(classLine(ch))}</span>${ch.campaignName ? `<span>🎲 ${esc(ch.campaignName)}</span>` : ''}</div></div>
        <div class="mini"><span>CA <b>${ch.build.ac ?? 10}</b></span><span>PV <b>${ch.state.hp.current}/${ch.state.hp.max}</b></span></div></div>
    </header>
    <main class="wrap stack">${demoBanner()}${({ ficha: tabFicha, combate: tabCombate, magias: tabMagias, mapa: tabMapa })[S.tab](ch, d)}</main>
    <nav class="tabs" role="tablist">${TABS.map(([id, ico, n]) =>
      `<button role="tab" aria-selected="${S.tab === id}" data-tab="${id}"><span class="ico" aria-hidden="true">${ico}</span>${n}</button>`).join('')}</nav>`;
  app.querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; render(); window.scrollTo(0, 0); }));
  $('#home').onclick = showHome;
  bind[S.tab]?.(ch, d);
  if (hadFocus) $('#amount')?.focus();
}

// ----- aba Combate -----
function tabCombate(ch, d) {
  const { hp, deathSaves: ds = { success: 0, fail: 0 }, conditions = [], dead } = ch.state;
  const total = hp.max + hp.temp;
  const pct = Math.round((hp.current / total) * 100), tpct = Math.round((hp.temp / total) * 100);
  const lvl = hp.current / hp.max > .5 ? '' : hp.current / hp.max > .25 ? 'mid' : 'low';
  const down = hp.current === 0 && !dead;
  return `
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${hp.current}<small> / ${hp.max}</small></div>
      ${hp.temp ? `<div class="tmpv">+${hp.temp} temporários</div>` : ''}
      ${dead ? '<div class="chip bad" style="margin-top:.4rem">MORTO</div>' : ''}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${lvl}" style="width:${pct}%"></div><div class="tmp" style="width:${tpct}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${esc(S.amount)}" aria-label="Valor" />
    <div class="quick">${[1, 2, 5, 10, 'C'].map((q) => `<button class="btn small" data-q="${q}">${q === 'C' ? 'Limpar' : '+' + q}</button>`).join('')}</div>
    <div class="toggles">
      <label><input type="checkbox" id="o-res" /> Resistência</label>
      <label><input type="checkbox" id="o-vul" /> Vulnerável</label>
      <label><input type="checkbox" id="o-crit" /> Crítico</label>
    </div>
    <div class="hp-actions">
      <button class="btn danger" data-act="dano">Dano</button>
      <button class="btn heal" data-act="cura">Cura</button>
      <button class="btn temp" data-act="temp">PV Temp.</button>
    </div>
  </section>
  ${down ? `<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0, 1, 2].map((i) => `<span class="pip ${i < ds.success ? 's' : ''}"></span>`).join('')}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0, 1, 2].map((i) => `<span class="pip ${i < ds.fail ? 'f' : ''}"></span>`).join('')}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>` : ''}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${conditions.map((c) => `<button class="chip bad" data-rmcond="${c}" aria-label="Remover ${c}">${COND_LABEL[c] || c} ✕</button>`).join('') || '<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${CONDITIONS.filter((c) => !conditions.includes(c)).map((c) => `<option value="${c}">${COND_LABEL[c] || c}</option>`).join('')}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    <p class="muted" style="margin:0">Dados de Vida: ${ch.state.hitDice.max - ch.state.hitDice.used}/${ch.state.hitDice.max} (d${ch.state.hitDice.die})</p>
    <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(ch.state.log || []).map((l) => `<li>${esc(l)}</li>`).join('') || '<li>—</li>'}</ul></section>`;
}

const bind = {};
bind.combate = (ch, d) => {
  const amt = $('#amount');
  amt.oninput = () => (S.amount = amt.value);
  app.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => {
    S.amount = b.dataset.q === 'C' ? '' : String((Number(S.amount) || 0) + Number(b.dataset.q));
    amt.value = S.amount;
  }));
  app.querySelectorAll('[data-act]').forEach((b) => (b.onclick = async () => {
    const n = Number(S.amount);
    if (!n) return toast('Digite um valor.');
    const opts = { resistant: $('#o-res').checked, vulnerable: $('#o-vul').checked, critical: $('#o-crit').checked };
    S.amount = '';
    const r = await hpAction(S.be, S.chId, b.dataset.act, n, opts, ch.name);
    if (r.concentrationDC && ch.state.concentration) toast(`Teste de Concentração: CD ${r.concentrationDC}`);
    else if (r.log.length) toast(r.log.at(-1));
  }));
  $('#roll-death') && ($('#roll-death').onclick = async () => {
    const r = roll('1d20').total;
    const res = await hpAction(S.be, S.chId, 'morte', r, {}, ch.name);
    toast(`d20 = ${r}. ${res.log.at(-1) ?? ''}`);
  });
  app.querySelectorAll('[data-rmcond]').forEach((b) => (b.onclick = () =>
    S.be.updateCharacter(S.chId, { 'state.conditions': ch.state.conditions.filter((c) => c !== b.dataset.rmcond) })));
  $('#addcond').onchange = (e) => e.target.value &&
    S.be.updateCharacter(S.chId, { 'state.conditions': [...ch.state.conditions, e.target.value] });
  $('#short').onclick = async () => {
    const hd = ch.state.hitDice;
    if (hd.used >= hd.max) return toast('Sem Dados de Vida disponíveis.');
    const r = roll(`1d${hd.die}`).total + d.mods.con;
    await S.be.updateCharacter(S.chId, { 'state.hitDice.used': hd.used + 1 });
    const res = await hpAction(S.be, S.chId, 'cura', Math.max(0, r), {}, ch.name);
    toast(`Dado de Vida: ${r}. ${res.log[0] ?? ''}`);
  };
  $('#long').onclick = async () => {
    const hd = ch.state.hitDice;
    const slots = Object.fromEntries(Object.entries(ch.state.spellSlots || {}).map(([k, v]) => [k, { ...v, used: 0 }]));
    await S.be.updateCharacter(S.chId, {
      'state.hp': { ...ch.state.hp, current: ch.state.hp.max, temp: 0 },
      'state.spellSlots': slots, 'state.hitDice.used': 0,
      'state.deathSaves': { success: 0, fail: 0 },
      'state.conditions': ch.state.conditions.filter((c) => !['inconsciente', 'estabilizado'].includes(c)),
    });
    toast('Descanso longo concluído.');
  };
};

// ----- aba Ficha -----
function tabFicha(ch, d) {
  return `
  <section class="card stack">
    <div class="stats">
      <div><b>${fmt(d.pb)}</b><small>Proficiência</small></div>
      <div><b>${fmt(d.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${esc(d.speed)}</b><small>Deslocamento</small></div>
      <div><b>${d.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${ch.build.ac ?? 10}" /></div>
  </section>
  <section class="card stack"><h2>Atributos</h2>
    <div class="abil">${ABILITIES.map(([k, n]) => `<div><small>${n}</small><b>${fmt(d.mods[k])}</b>
      <span class="muted">${ch.build.abilities[k]}</span><br><small>TR ${fmt(d.saves[k])}${ch.build.saveProfs.includes(k) ? ' ●' : ''}</small></div>`).join('')}</div>
  </section>
  <section class="card"><h2>Perícias</h2><p class="muted" style="margin-top:0;font-size:.85rem">Toque para marcar proficiência.</p>
    <div class="skills">${d.skills.map((s) => `<button data-skill="${s.id}" aria-pressed="${s.prof}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${s.prof ? 'on' : ''}"></span>${s.nome} <small class="muted">(${s.ab.toUpperCase()})</small></span><b>${fmt(s.bonus)}</b></button>`).join('')}</div>
  </section>
  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Itens, aliados, pistas…">${esc(ch.notes)}</textarea></section>
  <section class="card stack"><h2>Mesa</h2>
    ${ch.campaignId
      ? `<p style="margin:0">Jogando em <b>${esc(ch.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`
      : `<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${accountChip(S.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`;
}
let notesTimer;
bind.ficha = (ch) => {
  app.querySelectorAll('[data-skill]').forEach((b) => (b.onclick = () => {
    const id = b.dataset.skill, cur = ch.build.skillProfs || [];
    S.be.updateCharacter(S.chId, { 'build.skillProfs': cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
  }));
  $('#ac').onchange = (e) => S.be.updateCharacter(S.chId, { 'build.ac': Number(e.target.value) || 10 });
  $('#notes').oninput = (e) => { clearTimeout(notesTimer); notesTimer = setTimeout(() => S.be.updateCharacter(S.chId, { notes: e.target.value }), 600); };
  bindLogout(S.be, app);
  $('#join') && ($('#join').onsubmit = async (e) => {
    e.preventDefault();
    try {
      const camp = await S.be.joinByCode($('#code').value);
      await S.be.updateCharacter(S.chId, { campaignId: camp.id, campaignName: camp.name });
      toast(`${ch.name} entrou na mesa ${camp.name}.`);
    } catch (err) { toast(err.message); }
  });
  $('#leave-table') && ($('#leave-table').onclick = () => {
    if (confirmTwice('#leave-table', 'Toque de novo para confirmar')) S.be.updateCharacter(S.chId, { campaignId: null, campaignName: null });
  });
  $('#delete').onclick = async () => {
    if (!confirmTwice('#delete', `Toque de novo para apagar ${ch.name}`)) return;
    const id = S.chId; stopAll(); await S.be.deleteCharacter(id); showHome();
  };
};

// Confirmação sem diálogo do navegador: o 1º toque arma, o 2º confirma (3 s).
function confirmTwice(sel, msg) {
  const b = $(sel);
  if (b.dataset.armed) return true;
  b.dataset.armed = '1'; const old = b.textContent; b.textContent = msg;
  setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = old; } }, 3000);
  return false;
}

// ----- aba Magias -----
function tabMagias(ch, d) {
  const slots = Object.entries(ch.state.spellSlots || {});
  if (!d.cls?.atributoConjuracao) return '<section class="card"><h2>Magias</h2><p class="muted">Esta classe não conjura magias no nível atual.</p></section>';
  const known = ch.build.spellsKnown || [];
  const mine = S.comp.spells.filter((s) => known.includes(s.id)).sort((a, b) => a.nivel - b.nivel);
  const avail = S.comp.spells.filter((s) => s.classes.includes(d.cls.id) && !known.includes(s.id));
  const nivel = (n) => (n === 0 ? 'Truque' : `${n}º círculo`);
  return `
  <section class="card stack"><div class="stats" style="grid-template-columns:repeat(2,1fr)">
    <div><b>${d.spellDC}</b><small>CD de magia</small></div><div><b>${fmt(d.spellAttack)}</b><small>Ataque mágico</small></div></div></section>
  <section class="card slots"><h2>Espaços de magia</h2>
    ${slots.map(([lv, s]) => `<div class="lvl"><span>${lv}º</span>${Array.from({ length: s.max }, (_, i) =>
      `<button class="slotpip ${i < s.used ? 'used' : ''}" data-slot="${lv}" data-i="${i}" aria-label="Espaço de ${lv}º círculo ${i + 1}${i < s.used ? ', gasto' : ''}"></button>`).join('')}</div>`).join('') || '<p class="muted">Sem espaços.</p>'}
  </section>
  <section class="card stack"><h2>Minhas magias</h2>
    ${mine.map((s) => `<details class="spell"><summary><span>${esc(s.nome)}${s.concentracao ? ' <span class="chip">C</span>' : ''}</span><small class="muted">${nivel(s.nivel)}</small></summary>
      <div class="body stack"><div class="muted">${esc(s.escola)} · ${esc(s.tempo)} · ${esc(s.alcance)} · ${esc(s.componentes)} · ${esc(s.duracao)}</div>
      <p style="margin:0">${esc(s.resumo)}</p>
      <div class="row">${s.concentracao ? `<button class="btn small" data-conc="${s.id}">${ch.state.concentration === s.id ? 'Encerrar concentração' : 'Concentrar'}</button>` : ''}
      <button class="btn small" data-forget="${s.id}">Remover</button></div></div></details>`).join('') || '<p class="muted">Adicione magias da lista abaixo.</p>'}
    ${ch.state.concentration ? `<p class="banner">Concentrando em: ${esc(S.comp.spells.find((s) => s.id === ch.state.concentration)?.nome)}</p>` : ''}
  </section>
  <section class="card stack"><h2>Adicionar da biblioteca</h2>
    <select id="addspell"><option value="">Escolher magia de ${esc(d.cls.nome)}…</option>
      ${avail.map((s) => `<option value="${s.id}">${esc(s.nome)} (${nivel(s.nivel)})</option>`).join('')}</select></section>`;
}
bind.magias = (ch) => {
  app.querySelectorAll('[data-slot]').forEach((b) => (b.onclick = () => {
    const lv = b.dataset.slot, i = Number(b.dataset.i), s = ch.state.spellSlots[lv];
    const used = i < s.used ? i : i + 1; // tocar num gasto recupera; num livre gasta
    S.be.updateCharacter(S.chId, { [`state.spellSlots.${lv}.used`]: used });
  }));
  $('#addspell') && ($('#addspell').onchange = (e) => e.target.value &&
    S.be.updateCharacter(S.chId, { 'build.spellsKnown': [...(ch.build.spellsKnown || []), e.target.value] }));
  app.querySelectorAll('[data-forget]').forEach((b) => (b.onclick = () =>
    S.be.updateCharacter(S.chId, { 'build.spellsKnown': ch.build.spellsKnown.filter((x) => x !== b.dataset.forget) })));
  app.querySelectorAll('[data-conc]').forEach((b) => (b.onclick = () =>
    S.be.updateCharacter(S.chId, { 'state.concentration': ch.state.concentration === b.dataset.conc ? null : b.dataset.conc })));
};

// ----- aba Mapa (próxima etapa) -----
function tabMapa() {
  return `<section class="card stack"><h2>Mapa</h2><p class="muted">Quando o Mestre enviar um mapa, ele aparece aqui e você poderá marcar pontos. (Próxima etapa do projeto.)</p></section>`;
}
