const CACHE_NAME = 'mobile-id-v21';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './icon.png',
    './id_photo.jpg',
    './jeongjehun.jpg',
    './songjiwoo.jpg',
    './kimseoyeon.jpg',
    './annapple95.jpg',
    './arinida88888.jpg',
    './tmddkdl0.jpg',
    './kkingkkag123.jpg',
    './dlwodnjs07.jpg',
    './vjliz32.jpg',
    './choijunhyuk.png',
    './a0104009.jpg',
    './home_bg.png',
    './home_logged_in.png'
];

self.addEventListener('install', (event) => {
    // Force this service worker to become the active service worker
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    // Claim any clients immediately, so they page is controlled by the new SW
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        ])
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).catch(() => {
                    // Fallback or just let it fail silently if not in cache
                    return new Response('Network error occurred', {
                        status: 408,
                        statusText: 'Network error occurred'
                    });
                });
            })
    );
});
