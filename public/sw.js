// Service worker for 'Jogo do Impostor'
const CACHE_NAME = 'impostor-game-v2';

// Install event - cache core shell
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache first with Stale-while-revalidate for static files
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Non-GET requests should pass through
  if (e.request.method !== 'GET') return;

  // Ignore WebSockets, dev systems, and hot module replacement files
  if (url.pathname.includes('/ws') || url.pathname.includes('hot-update') || url.hostname.includes('localhost') && url.port === '3000' && !url.pathname.match(/\.(png|svg|jpg|jpeg|gif|css|js|json)$/)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh in background to update cache for next load
        fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse);
            });
          }
        }).catch(() => {/* Ignore network errors of background fetch */});
        
        return cachedResponse;
      }

      // If not cached, fetch from network and cache
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Cache static assets and document layout only
          if (e.request.destination === 'document' || 
              e.request.destination === 'script' || 
              e.request.destination === 'style' || 
              e.request.destination === 'image' || 
              e.request.destination === 'manifest') {
            cache.put(e.request, responseToCache);
          }
        });

        return networkResponse;
      }).catch((err) => {
        // Fallback for document requests to ensure offline loading index.html
        if (e.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});
