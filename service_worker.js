var firstCacheName = 'version0';
var cacheData = [];

self.addEventListener('install', e => {
  console.log("service worker installed successfully");
  e.waitUntil(
    caches.open(firstCacheName).then(cache => {
      return cache.addAll(cacheData);
    })
  )
})


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
            cacheName != firstCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
})

self.addEventListener('fetch', e => {
  console.log("service worker fetched successfully");
  e.respondWith(
    caches.open(firstCacheName).then(cache => {
      return cache.match(e.request).then(result => {
        return result || fetch(e.request).then(response => {
          cache.put(e.request, response.clone());
          return response;

        })
      })
    })
  )
})
