const CORE_CACHE = 1
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
const CORE_ASSETS = ["manifest.json","icons", "css/style.css", "/offline"]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim())
})

self.addEventListener("fetch", (event) => {
    // Prevent a bug with some chrome extensions
    if(!(event.request.url.indexOf('http') === 0)){
       return;
    }

    event.respondWith(
        caches.open(CORE_CACHE_NAME).then(cache => {
            return cache.match(event.request)
                .then(response => {
                    if(response) {
                        return response
                    }
                    return fetch(event.request)
                    .then(response => {
                        cache.put(event.request, response.clone())
                        return response
                    })
                }).catch((err) => {
                    return caches.open(CORE_CACHE_NAME).then(cache => cache.match('/offline'))
                })
        })
    )
})
