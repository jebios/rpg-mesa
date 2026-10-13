// Service worker mínimo: só existe para o navegador considerar o app "instalável"
// (Chrome/Edge exigem um service worker com handler de fetch). Estratégia:
// sempre tenta a rede primeiro (nunca serve algo desatualizado) e só usa o
// cache como reserva se o usuário estiver offline.
const CACHE = 'mesa-rpg-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
