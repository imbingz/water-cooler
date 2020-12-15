const cacheFileName = "wc-cache-v1.6";
const filesToCache = [
  './assets/pwa-assets/offline.html'
]


self.addEventListener('install', (e) => {
  console.log("Hit sw install");
  e.waitUntil(
    caches
      .open(cacheFileName)
      .then(cache => {
        return cache.addAll(filesToCache)
      })
      .catch(err => console.log("On SW Install, caching error: ", err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log("hit sw activation");
  e.waitUntil(
    caches
      .keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== cacheFileName) {
              console.log("Deleting Key: ", key);
              return caches.delete(key);
            }
          })
        )
      })
      .catch(err => console.log("On SW Activation, key delete error: ", err))
  )
})

// self.ClientRectList.claim();

// Sooooo, since 

self.addEventListener('fetch', (e) => {
  console.log("Fetch Listener: ", e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then(response => {
        return fetch(e.request)
      })
      .catch(err => {
        console.log("On SW Fetch Intercept, response error: ", err);
        return caches.match('/assets/pwa-assets/offline.html')
      })  
  )
});