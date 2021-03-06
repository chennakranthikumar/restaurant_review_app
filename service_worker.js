// Define the Caches

var staticCacheName = 'mws-restaurant-static-v';
// Set Get Random number for Cache ID to overcome the unexpected cache errors
 var randomNumberBetween0and2999 = Math.floor(Math.random() * 3000);
 var cache_id = randomNumberBetween0and2999;
 staticCacheName += cache_id;

self.addEventListener("install", function(event) {
console.log("cached storaged version"+staticCacheName); 
 event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      'index.html',
      'restaurant.html',
      '/css/main.css',

      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/img/*',


    ])
    .catch(error => {

    });
  }));
});

self.addEventListener('activate', function(event) {
	console.log("cached storaged version"+staticCacheName);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch',
function(event)
{
  event.respondWith
  (
    caches.match(event.request)
    .then
    (
      function(response)
      {
        if (response !== undefined)
        {
          return response;
        }

        else
        {
          return fetch(event.request).then
          (
              function (response)
              {
                let responseClone = response.clone();

                caches.open(staticCacheName)
                .then
                (
                  function (cache)
                  {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) // end of promise for cache match

  ); // end of respond with

}
);
