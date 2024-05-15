import fs from 'fs';

/**
 * @typedef FallbackRule
 * @property {RegExp} pattern - regex based route pattern
 * @property {string} fallback - fallback url
 */

/**
 * spa fallback plugin
 * @param {FallbackRule[]} rules spa fallback rules;
 * @returns {import('vite').Plugin}
 */
export default function spaFallbackPlugin(rules) {
  let publicDir = 'public';
  const bypassRegex = /@vite|@react-refresh|\/src\/|\/node_modules\/|\.map$/;

  function spaFallbackMiddleware(req, res, next) {
    const baseURL =  (req.protocol || 'http') + '://' + req.headers.host + '/';
    const uri = new URL(req.url,baseURL);
    const pathname = uri.pathname;
    if (fs.existsSync(__dirname + pathname)
        || fs.existsSync(publicDir + pathname)
        || bypassRegex.test(pathname)
    ) {
      next();
      return;
    }
    for (const rule of rules) {
      const { pattern, fallback } = rule;
      if (pattern.test(req.url)) {
        let url = fallback;
        if (uri.search) {
          url += uri.search;
        }
        console.log(`[spaFallback] change request url "${pathname}" to: "${url}"`);
        req.url = url;
        break;
      }
    }
    next();
  }

  return {
    name: 'spa-fallback',
    enforce: 'pre',
    apply: 'serve',
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
