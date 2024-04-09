import fs from 'fs';

import { defineConfig } from 'vite'

// failback rules;
const failbackRules = [
  // { pattern: '/apps/(?!assets/).*', failback: '/apps/index.html' },
  { pattern: '/(?!assets/).*', failback: '/index.html' },
];

export default defineConfig({
  base: '',
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      "/api": 'http://localhost:5000/api'
    },
  },
  build: {
    lib: false,
    manifest: false,
    rollupOptions: {
      input: {
        'main': 'index.html'
      }
    }
  },
  plugins: [
    spaFailbackPlugin()
  ]
});

function spaFailbackPlugin() {
  function spaFailbackMiddleware(req, res, next) {
    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const uri = new URL(req.url,baseURL);
    const pathname = uri.pathname;
    if (pathname.startsWith('/@vite')
        || pathname.indexOf('/src/') > -1
        || fs.existsSync('public' + pathname)
        || pathname.endsWith('.map')
    ) {
      next();
      return;
    }
    if (!fs.existsSync(__dirname + pathname)) {
      for (const rule of failbackRules) {
        const regex = new RegExp(rule.pattern);
        if (regex.test(req.url)) {
          let url = rule.failback;
          if (uri.search) {
            url += uri.search;
          }
          console.log(`${pathname} change to: ${url}`);
          req.url = url;
          break;
        }
      }
    }
    next();
  }

  return {
    name: 'spa-failback',
    configureServer: (server) => {
      server.middlewares.use(spaFailbackMiddleware);
    },
    configurePreviewServer: (server) => {
      server.middlewares.use(spaFailbackMiddleware);
    },
  }
}
