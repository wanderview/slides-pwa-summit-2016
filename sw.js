'use strict';

let version = 2;
let prefix = 'slides-pwa-summit-2016-';
let cacheName = prefix + version;

let precache = [
  // content
  './',
  'img/dom.png',
  'img/sw-page-loads-chart.png',
  'img/push-demo-3x.gif',
  'img/push-chart.png',
  'img/devtools-sw-menu.png',
  'img/devtools-sw-debugger.png',
  'img/sw-network-panel.png',
  'img/storage.png',
  'img/add-to-homescreen-2x.gif',
  'img/bg-sync-2x.gif',

  // shell
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
  let req = evt.request;
  if (req.url.indexOf('index.html') !== -1) {
    req = new Request('./');
  }
  evt.respondWith(caches.open(cacheName).then(cache => {
    return cache.match(req);
  }).then(response => {
    return response || fetch(req);
  }));
});
