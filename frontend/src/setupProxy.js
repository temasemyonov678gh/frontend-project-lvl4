const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
    }),
  );

  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
    }),
  );
};
