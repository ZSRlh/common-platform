import { BASEURL } from "@/assets/constants/constants";

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req: any, res: any) => {
  let target = BASEURL;
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/"
    }
  })(req, res);
}
