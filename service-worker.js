self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cacheAssets').then(function(cache) {
            return cache.addAll(
                [
                    './',
                    './css/main.css',
                    './js/main.js',
                    './img/ui/arrow.png',
                    './img/ui/jurrasic-error.png',
                    './img/ui/no-image.png'
                ]
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const eventRequest = event.request;
    console.log(eventRequest);
    event.respondWith();
});