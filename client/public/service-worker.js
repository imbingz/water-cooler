// * Global Variables
const cacheFileName = "wc-cache-v1.6";
const filesToCache = [
  './assets/pwa-assets/offline.html'
]


// * Event Listeners
// ** On SW Install, Catch Files for Offline Use
self.addEventListener('install', (e) => {
  // console.log("Hit sw install");
  e.waitUntil(
    caches
      .open(cacheFileName)
      .then(cache => {
        return cache.addAll(filesToCache)
      })
      .catch(err => console.log("On SW Install, caching error: ", err))
  );
  self.skipWaiting();
  // NOTE: I'm having an issue getting this to work, or I'm just doing it wrong 😅: service-worker.js:1 Uncaught (in promise) DOMException: Only the active worker can claim clients
  // self.clients.claim();
});

// ** On SW Activation, Check For cacheFileName Change and Delete Old File
self.addEventListener('activate', (e) => {
  // console.log("hit sw activation");
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




// ** On All Fetch Request, Intercept and Serve Through SW; If Offline, Serve Cached offline.html Page
self.addEventListener('fetch', (e) => {
  // console.log("Fetch Listener: ", e.request);
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