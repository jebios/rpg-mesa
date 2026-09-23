// Ponto único de acesso a dados. As telas só falam com este módulo.
import { firebaseConfig } from './config.js';

let impl;
export async function getBackend() {
  if (impl) return impl;
  impl = firebaseConfig.apiKey
    ? await (await import('./backend-firebase.js')).create(firebaseConfig)
    : await (await import('./backend-local.js')).create();
  return impl;
}

export function makeJoinCode() {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const pick = () => A[Math.floor(Math.random() * A.length)];
  return `${pick()}${pick()}${pick()}-${pick()}${pick()}${pick()}`;
}
