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
    spaFallbackPlugin()
  ]
});

function spaFallbackPlugin() {
  let publicDir = 'public';

  function spaFallbackMiddleware(req, res, next) {
    const baseURL =  (req.protocol || 'http') + '://' + req.headers.host + '/';
    const uri = new URL(req.url,baseURL);
    const pathname = uri.pathname;
    if (fs.existsSync(__dirname + pathname)
        || fs.existsSync(publicDir + pathname)
        || pathname.startsWith('/@vite')
        || pathname.indexOf('/src/') > -1
        || pathname.endsWith('.map')
        || pathname.indexOf('/node_modules/') > -1
    ) {
      next();
      return;
    }
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
    next();
  }

  return {
    name: 'spa-fallback',
    configureServer: (server) => {
      publicDir = server.config.publicDir;
      server.middlewares.use(spaFallbackMiddleware);
    },
    configurePreviewServer: (server) => {
      publicDir = server.config.publicDir;
      server.middlewares.use(spaFallbackMiddleware);
    },
  }
}
