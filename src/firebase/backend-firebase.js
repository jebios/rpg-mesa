// Backend real: Firebase Auth (e-mail/senha + Google) + Firestore com cache offline.
import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut,
} from 'firebase/auth';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  doc, collection, addDoc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot,
  runTransaction, serverTimestamp, query, where,
} from 'firebase/firestore';
import { makeJoinCode } from './backend.js';

const ERROS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/missing-password': 'Digite a senha.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/email-already-in-use': 'Já existe uma conta com este e-mail.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente de novo.',
  'auth/popup-closed-by-user': 'Login com Google cancelado.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
  'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase (Authentication → Configurações → Domínios autorizados).',
};
const friendly = (e) => { throw new Error(ERROS[e.code] || e.message); };

export async function create(config) {
  const app = initializeApp(config);
  const auth = getAuth(app);
  auth.languageCode = 'pt-BR';
  const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });

  const me = () => auth.currentUser;
  const toUser = (u) => (u ? { uid: u.uid, name: u.displayName || u.email?.split('@')[0] || 'Aventureiro', email: u.email } : null);
  const chars = collection(db, 'characters');
  const withId = (s) => (s.exists() ? { id: s.id, ...s.data() } : null);
  const list = (qs) => qs.docs.map(withId);
  const saveProfile = (u) => setDoc(doc(db, 'users', u.uid), { name: u.name, email: u.email ?? null, lastLogin: serverTimestamp() }, { merge: true });

  return {
    mode: 'firebase',
    get user() { return toUser(me()); },

    // ---------- Autenticação ----------
    onAuth: (cb) => onAuthStateChanged(auth, (u) => cb(toUser(u))),
    async signUp(name, email, password) {
      const cred = await createUserWithEmailAndPassword(auth, email, password).catch(friendly);
      await updateProfile(cred.user, { displayName: name });
      await saveProfile(toUser(cred.user));
      return toUser(cred.user);
    },
    async signIn(email, password) {
      const cred = await signInWithEmailAndPassword(auth, email, password).catch(friendly);
      await saveProfile(toUser(cred.user));
      return toUser(cred.user);
    },
    async signInGoogle() {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider()).catch(friendly);
      await saveProfile(toUser(cred.user));
      return toUser(cred.user);
    },
    resetPassword: (email) => sendPasswordResetEmail(auth, email).catch(friendly),
    signOut: () => signOut(auth),
    canGoogle: true, canReset: true,

    // ---------- Campanhas ----------
    async createCampaign(name) {
      const ref = doc(collection(db, 'campaigns'));
      const joinCode = makeJoinCode();
      await setDoc(ref, { name, dmUid: me().uid, dmName: toUser(me()).name, joinCode, members: { [me().uid]: 'dm' }, createdAt: serverTimestamp() });
      await setDoc(doc(db, 'joinCodes', joinCode), { campaignId: ref.id, dmUid: me().uid });
      return { id: ref.id, joinCode };
    },
    async joinByCode(code) {
      const snap = await getDoc(doc(db, 'joinCodes', code.trim().toUpperCase()));
      if (!snap.exists()) throw new Error('Código de sala não encontrado.');
      const cid = snap.data().campaignId;
      if (snap.data().dmUid !== me().uid) await updateDoc(doc(db, 'campaigns', cid), { [`members.${me().uid}`]: 'player' });
      const camp = await getDoc(doc(db, 'campaigns', cid));
      return { id: cid, name: camp.data().name };
    },
    watchMyCampaigns: (cb) => onSnapshot(query(collection(db, 'campaigns'), where('dmUid', '==', me().uid)), (qs) => cb(list(qs))),
    watchCampaign: (cid, cb) => onSnapshot(doc(db, 'campaigns', cid), (s) => cb(withId(s)), () => cb(null)),

    // ---------- Fichas (cada uma pertence a um usuário) ----------
    watchMyCharacters: (cb) => onSnapshot(query(chars, where('ownerUid', '==', me().uid)), (qs) => cb(list(qs))),
    watchPartyCharacters: (cid, cb) => onSnapshot(query(chars, where('campaignId', '==', cid)), (qs) => cb(list(qs))),
    watchCharacter: (id, cb) => onSnapshot(doc(chars, id), (s) => cb(withId(s)), () => cb(null)),
    async createCharacter(data) {
      const ref = await addDoc(chars, { campaignId: null, campaignName: null, ...data, ownerUid: me().uid, ownerName: toUser(me()).name, updatedAt: serverTimestamp(), updatedBy: me().uid });
      return ref.id;
    },
    updateCharacter: (id, patch) => updateDoc(doc(chars, id), { ...patch, updatedAt: serverTimestamp(), updatedBy: me().uid }),
    mutateCharacter: (id, fn) => runTransaction(db, async (tx) => {
      const ref = doc(chars, id);
      const snap = await tx.get(ref);
      const patch = fn(snap.data());
      if (patch) tx.update(ref, { ...patch, updatedAt: serverTimestamp(), updatedBy: me().uid });
      return patch;
    }),
    deleteCharacter: (id) => deleteDoc(doc(chars, id)),
  };
}
