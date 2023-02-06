/** Browser Sync Config */
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDir = __dirname;
const indexFile = 'index.html'

// failback rules;
const failbackRules = [
  // { pattern: '/apps/(?!assets/).*/', failback: '/apps/index.html' },
  { pattern: '/(?!assets/).*/', failback: '/index.html' },
];

/** @type {import('browser-sync').Options} */
module.exports = {
  /**  files to watch */
  files: [
    'dist/**/*.(html|js)',
    'index.html'
  ],
  server: {
    baseDir,
    directory: true,
    index: indexFile,
    middleware: function(req, res, next) {
      const uri = url.parse(req.url);
      if (!fs.existsSync(baseDir + uri.pathname)) {
        for (const rule of failbackRules) {
          const regex = new RegExp(rule.pattern);
          if (regex.test(req.url)) {
            let url = rule.failback;
            if (uri.search) {
              url += uri.search;
            }
            req.url = url;
            break;
          }
        }
      }
      next();
    }
  },
  open: false,
  cors: true
};
