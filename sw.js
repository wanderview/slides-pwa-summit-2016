'use strict';

let version = 1;
let prefix = 'slides-pwa-summit-2016-';
let cacheName = prefix + version;

let precache = [
  'css/reveal.css',
  'css/theme/nightly.css',
  'lib/css/zenburn.css',
  'lib/js/head.min.js',
  'js/reveal.js',
  'https://fonts.googleapis.com/css?family=Montserrat:700',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic,700italic',
  'css/print/paper.css',
  'css/theme/img/nightly-content-bg.png',
  'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3ZBw1xU1rKptJj_0jans920.woff2',
  'https://fonts.gstatic.com/s/opensans/v13/xjAJXh38I15wypJXxuGMBogp9Q8gbYrhqGlRav_IXfk.woff2',
  'plugin/markdown/marked.js',
  'plugin/markdown/markdown.js',
  'plugin/notes/notes.js',
  'plugin/highlight/highlight.js',
  'https://fonts.gstatic.com/s/montserrat/v7/IQHow_FEYlDC4Gzy_m8fcmaVI6zN22yiurzcBKxPjFE.woff2',
];

addEventListener('install', evt => {
  debugger;
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(
        precache.map(url => new Request(url, { cache: 'no-cache' }))
      );
    }).then(_ => { return self.skipWaiting(); })
  );
});

addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key.indexOf(prefix) === 0 && key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

addEventListener('fetch', evt => {
  evt.respondWith(caches.open(cacheName).then(cache => {
    return cache.match(evt.request);
  }).then(response => {
    return response || fetch(evt.request);
  }));
});
