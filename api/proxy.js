const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let target = 'http://rest.apizza.net/mock/c93fdfb30dab4ca2008a92a4497f29eb';
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/rest.apizza.net": "/rest.apizza.net"
    }
  })(req, res);
}
