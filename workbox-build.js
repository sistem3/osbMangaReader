const swBuild = require('workbox-build');

swBuild.generateSW({
  navigateFallback: 'index.html',
  globDirectory: './dist',
  globPatterns: [
    'index.html',
    '**.js',
    '**.css',
  ],
  swDest: 'dist/service-worker.js',
}).then(() => console.log('Service Worker generated')).catch(err => console.error(err, 'Service Worker failed to generate'));
