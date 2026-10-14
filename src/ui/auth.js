// Tela de login/cadastro compartilhada pelo Escudo e pelo Grimório.
import { $, esc, toast } from './util.js';

/**
 * Mostra o login quando não há usuário; chama onReady(user) quando há.
 * Retorna função para cancelar.
 */
export function requireLogin(be, app, { title, subtitle, onSignedOut }, onReady) {
  let mode = 'entrar';
  let lastUid;
  const off = be.onAuth((user) => {
    if (user) { if (user.uid !== lastUid) { lastUid = user.uid; onReady(user); } return; }
    if (lastUid) { onSignedOut?.(); mode = 'entrar'; }
    lastUid = null; draw();
  });

  function draw() {
    const cadastro = mode === 'cadastro';
    app.innerHTML = `<main class="auth-wrap stack">
      <div class="auth-head"><h1>${esc(title)}</h1><p class="muted">${esc(subtitle)}</p></div>
      ${be.mode === 'local' ? '<p class="banner">Modo demo: as contas ficam só neste navegador. Cada aba pode estar logada com uma conta diferente.</p>' : ''}
      <div class="seg" role="tablist">
        <button role="tab" aria-selected="${!cadastro}" data-mode="entrar">Entrar</button>
        <button role="tab" aria-selected="${cadastro}" data-mode="cadastro">Criar conta</button>
      </div>
      <form class="card stack" id="auth" novalidate>
        ${cadastro ? `<div><label for="a-name">Seu nome</label><input id="a-name" autocomplete="name" required maxlength="40" /></div>` : ''}
        <div><label for="a-email">E-mail</label><input id="a-email" type="email" autocomplete="email" inputmode="email" required /></div>
        <div><label for="a-pw">Senha${cadastro ? ' (mínimo 6 caracteres)' : ''}</label>
          <input id="a-pw" type="password" autocomplete="${cadastro ? 'new-password' : 'current-password'}" required minlength="6" /></div>
        <p class="auth-err" id="a-err" role="alert"></p>
        <button class="btn primary" id="a-go" style="width:100%">${cadastro ? 'Criar conta' : 'Entrar'}</button>
        ${!cadastro && be.canReset ? '<button type="button" class="linkbtn" id="a-reset">Esqueci minha senha</button>' : ''}
      </form>
      ${be.canGoogle ? `<div class="or"><span>ou</span></div>
        <button class="btn" id="a-google" style="width:100%">Entrar com Google</button>` : ''}
    </main>`;

    app.querySelectorAll('[data-mode]').forEach((b) => (b.onclick = () => { mode = b.dataset.mode; draw(); }));
    const err = $('#a-err');
    const busy = async (fn) => {
      const btn = $('#a-go'); btn.disabled = true; err.textContent = '';
      try { await fn(); } catch (e) { err.textContent = e.message; } finally { if (btn.isConnected) btn.disabled = false; }
    };
    $('#auth').onsubmit = (e) => {
      e.preventDefault();
      const email = $('#a-email').value.trim(), pw = $('#a-pw').value;
      if (cadastro) {
        const name = $('#a-name').value.trim();
        if (!name) { err.textContent = 'Digite seu nome.'; return; }
        busy(() => be.signUp(name, email, pw));
      } else busy(() => be.signIn(email, pw));
    };
    $('#a-google') && ($('#a-google').onclick = () => busy(() => be.signInGoogle()));
    $('#a-reset') && ($('#a-reset').onclick = () => {
      const email = $('#a-email').value.trim();
      if (!email) { err.textContent = 'Digite seu e-mail acima e toque de novo.'; return; }
      busy(async () => { await be.resetPassword(email); toast('Enviamos um link de redefinição para seu e-mail.'); });
    });
    $(cadastro ? '#a-name' : '#a-email')?.focus();
  }
  return off;
}

/** Pequeno menu da conta (nome + sair). */
export function accountChip(user) {
  return `<span class="acct"><span class="acct-name" title="${esc(user.email || '')}">${esc(user.name)}</span>
    <button class="btn small" data-logout>Sair</button></span>`;
}
export function bindLogout(be, root = document) {
  root.querySelectorAll('[data-logout]').forEach((b) => (b.onclick = () => be.signOut()));
}
