const CACHE_NAME = 'kela-offline-v4';
const OFFLINE_URL = '/offline.html';
const urlsToCache = [
  '/index.html',
  '/offline.html',  // Ajout de la page hors ligne
  '/index.html',
  '/style/styles.css',
  '/app.js',
  '/index.js',
  '/img/logo.png',
  '/img/bg.jpg',
  '/manifest.json',
  '/favicon.ico',
  // ... autres fichiers
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Gestion des requêtes de navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request)
          .catch(error => {
            // Pour les images, retourne une image de remplacement
            if (event.request.headers.get('accept').includes('image')) {
              return caches.match('/img/logo.png');
            }
            // Pour le CSS/JS, retourne une réponse vide
            if (event.request.headers.get('accept').includes('text/css')) {
              return new Response('', { headers: { 'Content-Type': 'text/css' }});
            }
            if (event.request.headers.get('accept').includes('javascript')) {
              return new Response('', { headers: { 'Content-Type': 'application/javascript' }});
            }
          });
      })
  );
});