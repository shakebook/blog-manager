const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/blog/api',
    createProxyMiddleware({
      target: 'http://laughing.plus',
      changeOrigin: true,
    })
  );
};