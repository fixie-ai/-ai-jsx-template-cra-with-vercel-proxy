// import httpProxy from 'http-proxy';

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error('OPENAI_API_KEY environment variable must be set');
// }

// const proxy = httpProxy.createProxy({ target: 'https://api.openai.com', changeOrigin: true, selfHandleResponse: true });
// proxy.on('proxyRes', (proxyRes, _req, res) => {
//   // proxyRes.on('data', res.write.bind(res));
//   // proxyRes.on('end', res.end.bind(res));
// });

// export default function handler(
//   req,
//   res,
// ) {
//   req.headers.authorization = `Bearer ${process.env.OPENAI_API_KEY}`;
//   proxy.web(req, res);
// }
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  pathRewrite: {
    "^/api": "" // strip "/api" from the URL
  },
  onProxyRes(proxyRes) {
  }
});

export default function handler(req, res) {
  req.headers.authorization = `Bearer ${process.env.OPENAI_API_KEY}`;
  return apiProxy(req, res);
};