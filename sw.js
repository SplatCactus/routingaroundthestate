'use strict';

var CACHE_NAME = 'iran-strike-v1';
var SHELL = [
  '/',
  '/index.html',
  '/404.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Sans+3:wght@400;600&display=swap'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin && !url.href.startsWith('https://fonts.')) return;

  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (response) {
        /* Non-200 navigation response → serve cached 404 page */
        if (e.request.mode === 'navigate' && (!response || response.status !== 200)) {
          return caches.match('/404.html');
        }
        if (!response || response.status !== 200 || response.type === 'error') return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        return response;
      }).catch(function () {
        /* Network failure — serve 404 page for navigations, nothing for assets */
        if (e.request.mode === 'navigate') {
          return caches.match('/404.html');
        }
      });
    })
  );
});
