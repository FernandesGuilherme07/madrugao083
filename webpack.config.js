const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
    }),
  ],
};