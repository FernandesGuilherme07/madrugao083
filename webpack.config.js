const { GenerateSW } = require('workbox-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'


module.exports = {
    // ...
    plugins: [
      new GenerateSW({
        dest: "public",
        disable: !isProd,
      }),
    ],
  };
  