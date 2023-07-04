const withPWA = require('next-pwa');

module.exports = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js',
});
