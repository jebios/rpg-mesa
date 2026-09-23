// MODO DEMO: simula Firebase Auth + Firestore no localStorage e sincroniza abas via BroadcastChannel.
// Mesma interface do backend-firebase.js e as MESMAS permissões das regras (firestore.rules).
// Atenção: é só para testar — as senhas ficam neste navegador (com hash), não é seguro para produção.
import { makeJoinCode } from './backend.js';

const KEY = 'rpgmesa:db2';
const SESSION = 'rpgmesa:session'; // sessionStorage: cada aba pode ter um usuário diferente
const empty = () => ({ users: {}, campaigns: {}, joinCodes: {}, characters: {} });
const load = () => { try { return { ...empty(), ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return empty(); } };
const id = () => Math.random().toString(36).slice(2, 10);

async function hash(email, pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`rpgmesa:${email}:${pw}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  keys.slice(0, -1).forEach((k) => { o[k] = o[k] && typeof o[k] === 'object' ? o[k] : {}; o = o[k]; });
  o[keys.at(-1)] = value;
}

export async function create() {
  let user = JSON.parse(sessionStorage.getItem(SESSION) || 'null');
  const authListeners = new Set();
  const setUser = (u) => {
    user = u;
    u ? sessionStorage.setItem(SESSION, JSON.stringify(u)) : sessionStorage.removeItem(SESSION);
    authListeners.forEach((cb) => cb(user));
  };

  const listeners = new Set();
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel('rpgmesa') : null;
  const fire = () => listeners.forEach((fn) => fn(load()));
  channel?.addEventListener('message', fire);
  window.addEventListener('storage', (e) => e.key === KEY && fire());

  const commit = (mutator) => {
    const db = load();
    const r = mutator(db);
    localStorage.setItem(KEY, JSON.stringify(db));
    channel?.postMessage('changed');
    fire();
    return r;
  };
  const subscribe = (select, cb) => {
    let last;
    const fn = (db) => { const v = JSON.stringify(select(db) ?? null); if (v !== last) { last = v; cb(JSON.parse(v)); } };
    listeners.add(fn); fn(load());
    return () => listeners.delete(fn);
  };
  const need = () => { if (!user) throw new Error('Faça login primeiro.'); return user.uid; };

  // Mesmas regras do firestore.rules: dono da ficha OU mestre da mesa da ficha.
  const canRead = (db, ch) => !!user && (ch.ownerUid === user.uid || db.campaigns[ch.campaignId]?.dmUid === user.uid);
  const withId = (k, v) => ({ id: k, ...v });

  return {
    mode: 'local',
    get user() { return user; },

    // ---------- Autenticação ----------
    onAuth(cb) { authListeners.add(cb); cb(user); return () => authListeners.delete(cb); },
    async signUp(name, email, password) {
      email = email.trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('E-mail inválido.');
      if ((password || '').length < 6) throw new Error('A senha precisa ter pelo menos 6 caracteres.');
      const h = await hash(email, password);
      const u = commit((db) => {
        if (db.users[email]) throw new Error('Já existe uma conta com este e-mail.');
        db.users[email] = { uid: 'u-' + id(), name: name.trim() || email.split('@')[0], hash: h };
        return { uid: db.users[email].uid, name: db.users[email].name, email };
      });
      setUser(u); return u;
    },
    async signIn(email, password) {
      email = email.trim().toLowerCase();
      const rec = load().users[email];
      if (!rec || rec.hash !== (await hash(email, password))) throw new Error('E-mail ou senha incorretos.');
      const u = { uid: rec.uid, name: rec.name, email };
      setUser(u); return u;
    },
    async signInGoogle() { throw new Error('Login com Google só funciona com o Firebase configurado.'); },
    async resetPassword() { throw new Error('Recuperar senha só funciona com o Firebase configurado.'); },
    async signOut() { setUser(null); },
    canGoogle: false, canReset: false,

    // ---------- Campanhas ----------
    async createCampaign(name) {
      const uid = need();
      return commit((db) => {
        const cid = id(), joinCode = makeJoinCode();
        db.campaigns[cid] = { name, dmUid: uid, dmName: user.name, joinCode, members: { [uid]: 'dm' }, createdAt: Date.now() };
        db.joinCodes[joinCode] = { campaignId: cid, dmUid: uid };
        return { id: cid, joinCode };
      });
    },
    async joinByCode(code) {
      const uid = need();
      return commit((db) => {
        const ref = db.joinCodes[code.trim().toUpperCase()];
        if (!ref) throw new Error('Código de sala não encontrado.');
        const c = db.campaigns[ref.campaignId];
        c.members[uid] ||= 'player';
        return { id: ref.campaignId, name: c.name };
      });
    },
    watchMyCampaigns(cb) {
      const uid = need();
      return subscribe((db) => Object.entries(db.campaigns).filter(([, c]) => c.dmUid === uid).map(([k, v]) => withId(k, v)), cb);
    },
    watchCampaign(cid, cb) {
      return subscribe((db) => { const c = db.campaigns[cid]; return c && user && c.members[user.uid] ? withId(cid, c) : null; }, cb);
    },

    // ---------- Fichas ----------
    watchMyCharacters(cb) {
      const uid = need();
      return subscribe((db) => Object.entries(db.characters).filter(([, c]) => c.ownerUid === uid).map(([k, v]) => withId(k, v)), cb);
    },
    watchPartyCharacters(cid, cb) {
      return subscribe((db) => Object.entries(db.characters).filter(([, c]) => c.campaignId === cid && canRead(db, c)).map(([k, v]) => withId(k, v)), cb);
    },
    watchCharacter(chId, cb) {
      return subscribe((db) => { const c = db.characters[chId]; return c && canRead(db, c) ? withId(chId, c) : null; }, cb);
    },
    async createCharacter(data) {
      const uid = need();
      return commit((db) => { const k = id(); db.characters[k] = { campaignId: null, campaignName: null, ...data, ownerUid: uid, ownerName: user.name, updatedAt: Date.now(), updatedBy: uid }; return k; });
    },
    async updateCharacter(chId, patch) {
      commit((db) => {
        const ch = db.characters[chId];
        if (!ch || !canRead(db, ch)) throw new Error('Sem permissão para alterar esta ficha.');
        if ('ownerUid' in patch) throw new Error('Não é possível transferir a ficha.');
        if (patch.campaignId && !db.campaigns[patch.campaignId]?.members[user.uid]) throw new Error('Você não faz parte desta mesa.');
        Object.entries({ ...patch, updatedAt: Date.now(), updatedBy: user.uid }).forEach(([p, v]) => setPath(ch, p, v));
      });
    },
    async mutateCharacter(chId, fn) {
      const cur = load().characters[chId];
      const patch = fn(structuredClone(cur));
      if (patch) await this.updateCharacter(chId, patch);
      return patch;
    },
    async deleteCharacter(chId) {
      commit((db) => {
        if (db.characters[chId]?.ownerUid !== user?.uid) throw new Error('Só o dono pode apagar a ficha.');
        delete db.characters[chId];
      });
    },
  };
}
