import { createOptions, buildOrWatch } from './scripts/esbuild-helper.mjs';

const options = createOptions(
  [
    './src/main.ts'
  ],
  './dist/'
);
buildOrWatch(options);
