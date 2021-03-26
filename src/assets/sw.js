const CORE_CACHE = 2;
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`;
const CORE_ASSETS = [
    "manifest.json",
    "icons",
    "css/style.css",
    "js/bundle.min.js",
    "/offline",
    "/checkout"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CORE_CACHE_NAME)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (e) => {
    // Clear old caches
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CORE_CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    // Prevent a bug with some chrome extensions
    if (!(e.request.url.indexOf("http") === 0)) {
        return;
    }

    e.respondWith(
        caches.open(CORE_CACHE_NAME).then((cache) => {
            return cache
                .match(e.request)
                .then((res) => {
                    if (res) {
                        return res;
                    }
                    return fetch(e.request).then((res) => {
                        cache.put(e.request, res.clone());
                        return res;
                    });
                })
                .catch((err) => {
                    return caches
                        .open(CORE_CACHE_NAME)
                        .then((cache) => cache.match("/offline"));
                });
        })
    );
});
