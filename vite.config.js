import { defineConfig } from 'vite';

import spaFallbackPlugin from './vite-plugin-spafallback';

// spa fallback rules;
const fallbackRules = [
  { pattern: /\/(?!assets\/).*/, fallback: '/index.html' },
];

export default defineConfig({
  base: '',
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000/api'
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
    spaFallbackPlugin(fallbackRules),
  ]
});
