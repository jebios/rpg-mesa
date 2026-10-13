// Grimório do Aventureiro — ficha do jogador (mobile-first).
import { getBackend } from '../firebase/backend.js';
import { loadCompendium } from '../compendium/loader.js';
import { ABILITIES, SKILLS, buildCharacter, derive, fmt, mod, classesLabel, speciesLabel, weaponAttacks, inventoryOf } from '../core/rules.js';
import { roll } from '../core/dice.js';
import { EFFECTS, availableEffects, modsChips } from '../core/effects.js';
import { hpAction } from '../ui/hp-actions.js';
import { $, esc, store, toast, uid8, setPath, skipRerenderWhileTyping, CONDITIONS, COND_LABEL } from '../ui/util.js';
import { requireLogin, accountChip, bindLogout } from '../ui/auth.js';
import { TAB_VIEWS } from './tabs.js';

const app = $('#app');
const S = {
  be: null, comp: null, user: null, chId: null, ch: null, tab: 'combate', amount: '', off: [], prevHp: null,
  ui: { spellQ: '', spellLvl: 'all', spellMine: true, featQ: '', featCat: 'all', itemQ: '', libOpen: {} },
};

// Ações de PV (hp-actions.js) rodam numa transação do Firestore: a escrita é confirmada no
// servidor, mas o listener em tempo real (watchCharacter/onSnapshot) pode demorar bastante pra
// refletir isso de volta — sem essa aplicação local, o jogador só via o PV mudar depois de
// atualizar a página. Aplica o `patch` (mesmo formato "state.hp"/"state.log" salvo no banco)
// direto em S.ch e redesenha na hora; quando o snapshot real chegar depois, ele só confirma o
// mesmo estado (sem mudança visível).
function applyHpPatchLocal(patch) {
  if (!S.ch || !patch) return;
  const ch = structuredClone(S.ch);
  Object.entries(patch).forEach(([p, v]) => setPath(ch, p, v));
  S.ch = ch;
  render();
}
const lastKey = () => `rpgmesa:last:${S.user.uid}`;
const stopAll = () => { S.off.forEach((f) => f()); S.off = []; };
const SKILL_NAME = Object.fromEntries(SKILLS.map(([id, n]) => [id, n]));
const ABIL_NAME = Object.fromEntries(ABILITIES);

init().catch((e) => { app.innerHTML = `<div class="wrap"><div class="card">Erro ao iniciar: ${esc(e.message)}</div></div>`; });

async function init() {
  S.be = await getBackend();
  requireLogin(S.be, app, {
    title: 'Grimório do Aventureiro',
    subtitle: 'Entre com sua conta para acessar seus personagens em qualquer aparelho.',
    onSignedOut: () => { stopAll(); S.ch = null; S.chId = null; S.prevHp = null; },
  }, async (user) => {
    S.user = user;
    app.innerHTML = '<p class="muted" style="padding:1rem">Carregando compêndio…</p>';
    S.comp = await loadCompendium(S.be);
    const last = store.get(lastKey());
    last ? openSheet(last) : showHome();
  });
}

const demoBanner = () => (S.be.mode === 'local'
  ? '<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>' : '');
const compBanner = () => (S.comp.completo ? '' : '<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>');

// ---------- 1. Meus personagens ----------
function showHome() {
  stopAll(); S.chId = null; S.ch = null;
  store.set(lastKey(), null);
  let formOpen = false;
  S.off.push(S.be.watchMyCharacters((list) => {
    if ($('#build')) return; // não redesenha enquanto o formulário está em uso
    list.sort((a, b) => a.name.localeCompare(b.name));
    app.innerHTML = `<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${accountChip(S.user)}</div></header>
    <main class="wrap stack">${demoBanner()}${compBanner()}
      ${list.map((c) => `<button class="charbtn" data-open="${c.id}">
        <span><b>${esc(c.name)}</b><br><small class="muted">${esc(classLine(c))}</small></span>
        <span class="chip">${c.campaignName ? '🎲 ' + esc(c.campaignName) : 'Sem mesa'}</span></button>`).join('')}
      ${list.length ? '' : '<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`;
    bindLogout(S.be, app);
    app.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openSheet(b.dataset.open)));
    $('#newchar').onclick = () => showBuilder();
    if (!list.length && !formOpen) { formOpen = true; }
  }));
}

// ---------- 2. Criação de personagem ----------
function showBuilder() {
  stopAll();
  const C = S.comp;
  const std = [15, 14, 13, 12, 10, 8];
  app.innerHTML = `<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${C.species.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`).join('')}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${C.classes.map((c) => `<option value="${c.id}">${esc(c.nome)}</option>`).join('')}</select></div>
      <div id="classinfo"></div>
    </section>
    ${C.backgrounds.length ? `<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${C.backgrounds.map((b) => `<option value="${b.id}">${esc(b.nome)}</option>`).join('')}</select></div>
      <div id="bginfo"></div>
    </section>` : ''}
    <section class="card stack">
      <h2>Atributos</h2>
      <div class="seg" role="tablist">
        <button type="button" role="tab" aria-selected="true" data-abmode="array">Array Padrão</button>
        <button type="button" role="tab" aria-selected="false" data-abmode="buy">Compra de Pontos</button>
      </div>
      <p class="muted" id="abmode-help" style="margin:0;font-size:.9rem">Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.</p>
      <p class="empty-note" id="abpts" style="display:none;margin:0"></p>
      <div class="ab-inputs" id="ab-inputs"></div>
    </section>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form></main>`;
  $('#back').onclick = showHome;
  const form = $('#build');
  const cls = () => C.byId.classes[form.class.value];
  const bg = () => C.byId.backgrounds?.[form.bg?.value];
  function drawClass() {
    const c = cls();
    const opts = c.periciasOpcoes?.length ? c.periciasOpcoes : [];
    $('#classinfo').innerHTML = `
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${c.dadoVida} · Salvaguardas: ${(c.salvaguardas || []).map((a) => ABIL_NAME[a]).join(', ')}</p>
      ${opts.length ? `<div><label>Perícias da classe — escolha ${c.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${opts.map((id) => `<label class="chk"><input type="checkbox" name="sk" value="${id}"> ${SKILL_NAME[id]}</label>`).join('')}</div></div>` : ''}`;
    form.querySelectorAll('[name=sk]').forEach((cb) => (cb.onchange = limitSkills));
    limitSkills();
  }
  function limitSkills() {
    const c = cls(), bgSk = bg()?.pericias || [];
    const boxes = [...form.querySelectorAll('[name=sk]')];
    boxes.forEach((b) => { if (bgSk.includes(b.value)) { b.checked = false; b.disabled = true; b.parentElement.title = 'Já vem do antecedente'; } });
    const n = boxes.filter((b) => b.checked).length;
    boxes.forEach((b) => { if (!bgSk.includes(b.value)) b.disabled = !b.checked && n >= c.periciasEscolha; });
    if ($('#skcount')) $('#skcount').textContent = `(${n}/${c.periciasEscolha})`;
  }
  function drawBg() {
    const b = bg(); if (!b) return;
    const feat = C.byId.feats[b.talentoId];
    $('#bginfo').innerHTML = `
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${b.pericias.map((s) => SKILL_NAME[s]).join(', ')}<br>
      <b>Talento:</b> ${esc(feat?.nome || b.talento)}<br><b>Ferramenta:</b> ${esc(b.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${b.atributos.map((a) => `<option value="${a}">${ABIL_NAME[a]}</option>`).join('')}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${b.atributos.map((a, i) => `<option value="${a}" ${i === 1 ? 'selected' : ''}>${ABIL_NAME[a]}</option>`).join('')}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${esc(b.equipamento)}</div></details>`;
    $('#plus2').onchange = $('#plus1').onchange = drawFinal;
    drawFinal(); limitSkills();
  }
  function bonuses() {
    const b = bg(); const out = {};
    if (!b) return out;
    const p2 = $('#plus2').value;
    if (p2 === 'all') b.atributos.forEach((a) => (out[a] = 1));
    else { out[p2] = 2; const p1 = $('#plus1').value; if (p1 !== p2) out[p1] = (out[p1] || 0) + 1; }
    return out;
  }
  function drawFinal() {
    const bon = bonuses();
    if ($('#plus1wrap')) $('#plus1wrap').style.visibility = $('#plus2').value === 'all' ? 'hidden' : '';
    form.querySelectorAll('.abfinal').forEach((el) => {
      const k = el.dataset.ab, v = Math.min(20, Number(form[k].value) + (bon[k] || 0));
      el.textContent = bon[k] ? `→ ${v} (${fmt(mod(v))})` : `(${fmt(mod(v))})`;
    });
  }

  // ---- Atributos: Array Padrão (digitação livre) ou Compra de Pontos (regra 2024, 27 pontos) ----
  const BUY_TOTAL = 27, BUY_COST = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  const buyCost = (v) => BUY_COST[v] ?? 0;
  let abMode = 'array';
  function drawAbilities() {
    const buy = abMode === 'buy';
    $('#ab-inputs').innerHTML = ABILITIES.map(([k, n], i) => {
      const prev = document.getElementById('ab-' + k);
      const val = prev ? prev.value : buy ? 8 : std[i];
      return `<div><label for="ab-${k}">${n} <b class="abfinal" data-ab="${k}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${buy ? `<button type="button" class="btn small" data-abdown="${k}" aria-label="Diminuir ${n}">−</button>` : ''}
          <input id="ab-${k}" name="${k}" type="number" inputmode="numeric" min="${buy ? 8 : 3}" max="${buy ? 15 : 20}"
            value="${val}" ${buy ? 'readonly style="width:3.5rem;text-align:center"' : ''} />
          ${buy ? `<button type="button" class="btn small" data-abup="${k}" aria-label="Aumentar ${n}">+</button>` : ''}
        </div></div>`;
    }).join('');
    if (buy) {
      const used = ABILITIES.reduce((s, [k]) => s + buyCost(Number(form[k].value)), 0);
      const left = BUY_TOTAL - used;
      $('#abpts').style.display = ''; $('#abpts').textContent = `${left} de ${BUY_TOTAL} pontos restantes`;
      form.querySelectorAll('[data-abup]').forEach((b) => (b.onclick = () => {
        const k = b.dataset.abup, cur = Number(form[k].value);
        if (cur >= 15) return;
        if (used + (buyCost(cur + 1) - buyCost(cur)) > BUY_TOTAL) return toast('Sem pontos suficientes.');
        form[k].value = cur + 1; drawAbilities();
      }));
      form.querySelectorAll('[data-abdown]').forEach((b) => (b.onclick = () => {
        const k = b.dataset.abdown, cur = Number(form[k].value);
        if (cur <= 8) return;
        form[k].value = cur - 1; drawAbilities();
      }));
    } else {
      $('#abpts').style.display = 'none';
      ABILITIES.forEach(([k]) => (form[k].oninput = drawFinal));
    }
    drawFinal();
  }
  app.querySelectorAll('[data-abmode]').forEach((b) => (b.onclick = () => {
    if (b.dataset.abmode === abMode) return;
    abMode = b.dataset.abmode;
    app.querySelectorAll('[data-abmode]').forEach((x) => x.setAttribute('aria-selected', String(x.dataset.abmode === abMode)));
    $('#abmode-help').textContent = abMode === 'buy'
      ? `Compra de pontos: comece com 8 em tudo e gaste os ${BUY_TOTAL} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`
      : 'Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.';
    ABILITIES.forEach(([k], i) => { const el = document.getElementById('ab-' + k); if (el) el.value = abMode === 'buy' ? 8 : std[i]; });
    drawAbilities();
  }));

  form.class.onchange = drawClass;
  if (form.bg) form.bg.onchange = drawBg;
  drawClass(); drawBg(); drawAbilities();
  form.onsubmit = async (e) => {
    e.preventDefault();
    const bon = bonuses();
    const abilities = Object.fromEntries(ABILITIES.map(([k]) => [k, Math.min(20, Number(form[k].value) + (bon[k] || 0))]));
    const data = buildCharacter({
      name: form.name.value.trim(), ownerUid: S.user.uid, speciesId: form.species.value,
      classId: form.class.value, level: Number(form.level.value), abilities, backgroundId: form.bg?.value || null,
      skillProfs: [...form.querySelectorAll('[name=sk]:checked')].map((b) => b.value),
    }, C);
    try { openSheet(await S.be.createCharacter(data)); } catch (err) { toast(err.message); }
  };
}

const classLine = (c) => `${speciesLabel(c.build, S.comp)} · ${classesLabel(c.build, S.comp)}`;

// ---------- 3. Ficha ----------
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

const TABS = [['combate', '❤️', 'Combate'], ['ficha', '📜', 'Ficha'], ['magias', '✨', 'Magias'], ['classe', '🛡️', 'Traços'], ['talentos', '⭐', 'Talentos'], ['itens', '🎒', 'Itens']];

// Contexto compartilhado com as abas (tabs.js)
const ctx = {
  get S() { return S; }, app, render: () => render(),
  save: (patch) => S.be.updateCharacter(S.chId, patch).catch((e) => toast(e.message)),
  toast, showHome: () => showHome(), confirmTwice, accountChip, bindLogout,
};

function render() {
  if (skipRerenderWhileTyping(render)) return;
  const ch = S.ch, d = derive(ch, S.comp);
  // preserva foco e cursor ao redesenhar (buscas, campos de texto)
  const a = document.activeElement, focusId = a?.id, sel = a && 'selectionStart' in a ? [a.selectionStart, a.selectionEnd] : null;
  const scrollY = window.scrollY;
  const views = { combate: { html: tabCombate, bind: bindCombate }, ...TAB_VIEWS };
  const view = views[S.tab] || views.combate;
  app.innerHTML = `
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${esc(ch.name)}</div>
        <div class="mini"><span>${esc(classLine(ch))}</span>${ch.campaignName ? `<span>🎲 ${esc(ch.campaignName)}</span>` : ''}</div></div>
        <div class="mini"><span>CA <b>${d.ac}</b></span><span>PV <b>${ch.state.hp.current}/${ch.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${demoBanner()}${view.html(ch, d, ctx)}</main>
    <nav class="tabs" role="tablist">${TABS.map(([id, ico, n]) =>
      `<button role="tab" aria-selected="${S.tab === id}" data-tab="${id}"><span class="ico" aria-hidden="true">${ico}</span>${n}</button>`).join('')}</nav>`;
  app.querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; render(); window.scrollTo(0, 0); }));
  $('#home').onclick = showHome;
  view.bind(ch, d, ctx);
  window.scrollTo(0, scrollY);
  if (focusId) {
    const el = document.getElementById(focusId);
    if (el) { el.focus({ preventScroll: true }); if (sel && 'setSelectionRange' in el) try { el.setSelectionRange(...sel); } catch {} }
  }
}

// Confirmação sem diálogo do navegador: o 1º toque arma, o 2º confirma (3 s).
function confirmTwice(sel, msg) {
  const b = $(sel);
  if (b.dataset.armed) return true;
  b.dataset.armed = '1'; const old = b.textContent; b.textContent = msg;
  setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = old; } }, 3000);
  return false;
}

// Card "Ataques": bônus de ataque e dano de cada arma, prontos pra rolar — evita ter que somar
// dado + atributo + Proficiência de cabeça toda hora durante o combate. Lista TODAS as armas do
// inventário (não só as equipadas), cada uma com um botão "Empunhar"/"Guardar" pra trocar de arma
// num toque só, direto na aba Combate, sem precisar ir na aba Itens no meio da luta (pedido do
// Jeronimo: guerreiro com várias armas trocando durante o combate). Sem nenhuma arma empunhada,
// mostra o ataque desarmado (regra 2024: 1 + mod. Força de dano contundente, todo mundo é
// proficiente).
function effectsHtml(ch, d) {
  const list = ch.state.effects || [];
  const when = (r) => (r == null ? 'até o descanso longo ou encerrar' : r === 1 ? '1 rodada restante' : `${r} rodadas restantes`);
  const avail = availableEffects(ch).filter(([id]) => !list.some((e) => e.id === id));
  const opt = (tipo) => avail.filter(([, e]) => e.tipo === tipo).map(([id, e]) => `<option value="${id}">${esc(e.nome)}</option>`).join('');
  return `<section class="card stack" id="fxcard">
    <div class="sectiontitle"><h2 style="margin:0">Efeitos ativos</h2>
      ${list.some((e) => e.rounds != null) ? '<button class="btn small primary" id="nextround">Próxima rodada ▶</button>' : ''}</div>
    ${d.fx.lista.length ? d.fx.lista.map((e) => `<div class="stack" style="gap:.3rem;border:1px solid var(--line);border-radius:10px;padding:.5rem .65rem">
      <div class="sectiontitle"><b>${esc(e.nome)}</b><span class="lvl-badge">${when(e.rounds)}</span></div>
      <div class="row">${modsChips(e.mods).map((c) => `<span class="chip">${esc(c)}</span>`).join('')}${(e.mods.notas || []).map((n) => `<span class="chip">${esc(n)}</span>`).join('')}</div>
      ${EFFECTS[e.id]?.nota ? `<div class="muted" style="font-size:.82rem">${esc(EFFECTS[e.id].nota)}</div>` : ''}
      <div class="row">${e.rounds != null ? `<button class="btn small" data-fxadj="${e.uid}" data-d="-1">−1 rodada</button><button class="btn small" data-fxadj="${e.uid}" data-d="1">+1 rodada${e.id === 'furia' ? ' (estender)' : ''}</button>` : ''}
        <button class="btn small danger" data-fxend="${e.uid}">Encerrar</button></div></div>`).join('')
      : '<p class="empty-note" style="margin:0">Nenhum. Ative uma Fúria, uma magia que muda CA ou deslocamento, ou crie um efeito próprio — CA, deslocamento e resistências se ajustam sozinhos.</p>'}
    ${d.resist?.length ? `<p class="muted" style="margin:0;font-size:.85rem">Resistências agora: ${esc(d.resist.join(', '))}</p>` : ''}
    <div class="row"><select id="fxpick" class="grow" aria-label="Efeito"><option value="">Ativar efeito…</option>
      ${opt('Característica') ? `<optgroup label="Características">${opt('Característica')}</optgroup>` : ''}
      <optgroup label="Magias">${opt('Magia')}</optgroup></select>
      <input id="fxrounds" type="number" inputmode="numeric" min="1" placeholder="rodadas" style="width:5.5rem" aria-label="Duração em rodadas" />
      <button class="btn" id="fxadd">Ativar</button></div>
    <details class="entry"><summary><span class="t muted">Efeito personalizado</span></summary><div class="body stack">
      <input id="fxc-nome" maxlength="40" placeholder="Nome (ex.: Bênção do templo)" />
      <div class="row"><input id="fxc-rounds" type="number" inputmode="numeric" min="1" placeholder="Rodadas (vazio = sem contagem)" class="grow" />
        <input id="fxc-ac" type="number" inputmode="numeric" placeholder="+CA" style="width:4.5rem" />
        <input id="fxc-speed" type="number" inputmode="decimal" step="1.5" placeholder="+m" style="width:4.5rem" /></div>
      <button class="btn" id="fxc-add">Adicionar efeito</button></div></details>
  </section>`;
}

function atksHtml(ch, comp, d) {
  // Lista TODA arma do inventário — tanto as da biblioteca do compêndio (com dado/tipo de dano
  // estruturados, cálculo automático) quanto itens personalizados de categoria "Arma" (v0.22, sem
  // dado estruturado: aparecem com o nome e as notas, sem bônus/dano calculados). Também cobre um
  // item cujo itemId não bate mais com o compêndio atual (ex.: depois de reimportar compendio.json) —
  // melhor mostrar sem os números do que sumir da lista.
  const weapons = inventoryOf(ch)
    .filter((it) => (it.itemId && comp.byId?.weapons?.[it.itemId]) || it.categoria === 'arma')
    .map((it) => ({ it, w: it.itemId ? comp.byId?.weapons?.[it.itemId] : null }));
  if (!weapons.length) {
    return `<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${fmt(d.pb + d.mods.for)}</b> pra acertar, <b>1${fmt(d.mods.for)}</b> de dano contundente.</p></section>`;
  }
  const atkByUid = Object.fromEntries(weaponAttacks(ch, comp, d).map((a) => [a.uid, a]));
  const anyEquipped = weapons.some(({ it }) => it.equipado);
  return `<section class="card stack"><h2>Ataques</h2>
    ${weapons.map(({ it, w }) => {
      const a = atkByUid[it.uid];
      const semCalculo = !a && it.equipado ? ' <span class="muted">(sem cálculo automático — veja as Notas)</span>' : '';
      return `<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${it.equipado ? '⚔️ ' : ''}${esc(it.nome || w?.nome || '')}${a ? ` — <b>${fmt(a.atk)}</b> pra acertar · <b>${esc(a.dice)}${a.dmgBonus ? fmt(a.dmgBonus) : ''}</b> ${esc(a.dmgType)}${a.maestria ? ` <span class="muted">(${esc(a.maestria)})</span>` : ''}` : semCalculo}</span>
        <button class="btn small ${it.equipado ? '' : 'primary'}" data-swapweapon="${it.uid}">${it.equipado ? 'Guardar' : 'Empunhar'}</button>
      </div>`;
    }).join('')}
    ${!anyEquipped ? `<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${fmt(d.pb + d.mods.for)}</b> pra acertar, <b>1${fmt(d.mods.for)}</b> de dano contundente.</p>` : ''}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`;
}

// ----- aba Combate -----
function tabCombate(ch, d) {
  const { hp, deathSaves: ds = { success: 0, fail: 0 }, conditions = [], dead } = ch.state;
  const total = hp.max + hp.temp;
  const pct = Math.round((hp.current / total) * 100), tpct = Math.round((hp.temp / total) * 100);
  const lvl = hp.current / hp.max > .5 ? '' : hp.current / hp.max > .25 ? 'mid' : 'low';
  const down = hp.current === 0 && !dead;
  const conc = ch.state.concentration ? S.comp.byId.spells[ch.state.concentration] : null;
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
  <section class="card"><div class="stats">
    <div><b>${d.ac}</b><small>CA</small></div>
    <div><b>${fmt(d.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${esc(d.speed.replace(' metros', ' m'))}</b><small>Deslocamento</small></div>
    <div><b>${d.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${d.acDetalhe ? `<p class="empty-note" style="margin:.5rem 0 0">CA automática: ${esc(d.acDetalhe)}</p>` : ''}</section>
  ${effectsHtml(ch, d)}
  ${atksHtml(ch, S.comp, d)}
  ${conc ? `<p class="banner">Concentrando em: <b>${esc(conc.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>` : ''}
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
    ${(ch.state.hitDice.byClass || []).length > 1
      ? ch.state.hitDice.byClass.map((h) => {
          const cls = S.comp.byId.classes[h.classId];
          return `<div class="row" style="justify-content:space-between"><span class="muted">${esc(cls?.nome || h.classId)}: ${h.max - h.used}/${h.max} (d${h.die})</span>
            <button class="btn small" data-shortclass="${h.classId}">Gastar</button></div>`;
        }).join('')
      : `<p class="muted" style="margin:0">Dados de Vida: ${ch.state.hitDice.max - ch.state.hitDice.used}/${ch.state.hitDice.max} (d${ch.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(ch.state.log || []).map((l) => `<li>${esc(l)}</li>`).join('') || '<li>—</li>'}</ul></section>`;
}

function bindCombate(ch, d) {
  // ----- efeitos ativos (v0.27) -----
  const fxSave = (list) => ctx.save({ 'state.effects': list });
  const rounds = (v) => (Number(v) >= 1 ? Math.floor(Number(v)) : null);
  $('#fxadd').onclick = () => {
    const id = $('#fxpick').value;
    if (!id) return toast('Escolha um efeito.');
    const lib = EFFECTS[id];
    const r = $('#fxrounds').value ? rounds($('#fxrounds').value) : lib.rounds;
    fxSave([...(ch.state.effects || []), { uid: uid8(), id, nome: lib.nome, rounds: r }]);
    toast(`${lib.nome} ativo${r ? ` — ${r} rodada${r > 1 ? 's' : ''}` : ''}.`);
  };
  $('#fxc-add').onclick = () => {
    const nome = $('#fxc-nome').value.trim();
    if (!nome) return toast('Dê um nome ao efeito.');
    fxSave([...(ch.state.effects || []), { uid: uid8(), id: 'custom', nome, rounds: rounds($('#fxc-rounds').value), ac: Number($('#fxc-ac').value) || 0, speed: Number($('#fxc-speed').value) || 0 }]);
  };
  const tick = (list, delta, uidOnly) => {
    const ended = [];
    const out = list.map((e) => {
      if (e.rounds == null || (uidOnly && e.uid !== uidOnly)) return e;
      const r = e.rounds + delta;
      if (r <= 0) { ended.push(e.nome || EFFECTS[e.id]?.nome); return null; }
      return { ...e, rounds: r };
    }).filter(Boolean);
    return { out, ended };
  };
  $('#nextround') && ($('#nextround').onclick = () => {
    const { out, ended } = tick(ch.state.effects || [], -1);
    fxSave(out);
    toast(ended.length ? `Terminou: ${ended.join(', ')}.` : 'Rodada avançada.');
  });
  app.querySelectorAll('[data-fxadj]').forEach((b) => (b.onclick = () => {
    const { out, ended } = tick(ch.state.effects || [], Number(b.dataset.d), b.dataset.fxadj);
    fxSave(out);
    if (ended.length) toast(`Terminou: ${ended.join(', ')}.`);
  }));
  app.querySelectorAll('[data-fxend]').forEach((b) => (b.onclick = () => fxSave((ch.state.effects || []).filter((e) => e.uid !== b.dataset.fxend))));
  app.querySelectorAll('[data-swapweapon]').forEach((b) => (b.onclick = () => {
    const inv = inventoryOf(ch);
    const it = inv.find((x) => x.uid === b.dataset.swapweapon);
    const equipando = !it.equipado;
    ctx.save({ inventory: inv.map((x) => (x.uid === it.uid ? { ...x, equipado: equipando } : x)) });
    toast(`${it.nome} ${equipando ? 'empunhada' : 'guardada'}.`);
  }));
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
    applyHpPatchLocal(r.patch);
    if (r.concentrationDC && ch.state.concentration) toast(`Teste de Concentração: CD ${r.concentrationDC}`);
    else if (r.log.length) toast(r.log.at(-1));
  }));
  $('#endconc') && ($('#endconc').onclick = () => ctx.save({ 'state.concentration': null }));
  $('#roll-death') && ($('#roll-death').onclick = async () => {
    const r = roll('1d20').total;
    const res = await hpAction(S.be, S.chId, 'morte', r, {}, ch.name);
    applyHpPatchLocal(res.patch);
    toast(`d20 = ${r}. ${res.log.at(-1) ?? ''}`);
  });
  app.querySelectorAll('[data-rmcond]').forEach((b) => (b.onclick = () =>
    ctx.save({ 'state.conditions': ch.state.conditions.filter((c) => c !== b.dataset.rmcond) })));
  $('#addcond').onchange = (e) => e.target.value && ctx.save({ 'state.conditions': [...ch.state.conditions, e.target.value] });
  const spendHitDie = async (die, saveByClass) => {
    const r = roll(`1d${die}`).total + d.mods.con;
    await saveByClass();
    const res = await hpAction(S.be, S.chId, 'cura', Math.max(0, r), {}, ch.name);
    applyHpPatchLocal(res.patch);
    toast(`Dado de Vida: ${r}. ${res.log[0] ?? ''}`);
  };
  $('#short') && ($('#short').onclick = () => {
    const hd = ch.state.hitDice;
    if (hd.used >= hd.max) return toast('Sem Dados de Vida disponíveis.');
    spendHitDie(hd.die, () => ctx.save({ 'state.hitDice.used': hd.used + 1 }));
  });
  app.querySelectorAll('[data-shortclass]').forEach((b) => (b.onclick = () => {
    const byClass = ch.state.hitDice.byClass, i = byClass.findIndex((h) => h.classId === b.dataset.shortclass);
    const h = byClass[i];
    if (h.used >= h.max) return toast('Sem Dados de Vida dessa classe.');
    const updated = byClass.map((x, xi) => (xi === i ? { ...x, used: x.used + 1 } : x));
    spendHitDie(h.die, () => ctx.save({
      'state.hitDice.byClass': updated,
      'state.hitDice.used': updated.reduce((a, x) => a + x.used, 0),
    }));
  }));
  $('#long').onclick = async () => {
    const slots = Object.fromEntries(Object.entries(ch.state.spellSlots || {}).map(([k, v]) => [k, { ...v, used: 0 }]));
    const pactSlots = Object.fromEntries(Object.entries(ch.state.pactSlots || {}).map(([k, v]) => [k, { ...v, used: 0 }]));
    const byClass = (ch.state.hitDice.byClass || []).map((h) => ({ ...h, used: 0 }));
    await ctx.save({
      'state.hp': { ...ch.state.hp, current: ch.state.hp.max, temp: 0 },
      'state.spellSlots': slots, 'state.pactSlots': pactSlots,
      'state.hitDice': { ...ch.state.hitDice, byClass, used: 0 },
      'state.deathSaves': { success: 0, fail: 0 }, 'state.effects': [],
      'state.conditions': ch.state.conditions.filter((c) => !['inconsciente', 'estabilizado'].includes(c)),
    });
    toast('Descanso longo concluído.');
  };
}
