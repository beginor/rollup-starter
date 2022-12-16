import { build } from 'esbuild';

const production = process.env.NODE_ENV === 'production';
const watching = !!process.env.ESBUILD_WATCH;

/**
 * create esbuild options;
 * @param {string[]} entryPoints entry points;
 * @param {string} output output file or dir (end with /)
 * @returns {import('esbuild').BuildOptions}
 */
function createOptions(entryPoints, output) {
  /** @type {import('esbuild').BuildOptions} */
  const options = {
    entryPoints,
    tsconfig: './tsconfig.json',
    format: 'esm',
    bundle: true,
    minify: production,
    sourcemap: !production,
    legalComments: 'none',
    chunkNames: "chunks/[name]",
    treeShaking: production,
    packages: 'external',
    plugins:[],
  };
  if (output.endsWith('/')) {
    options.outdir = output;
    options.splitting = true;
  }
  else {
    options.outfile = output;
    options.splitting = false;
  }
  return options;
}

/**
 * call esbuild
 * @param {import('esbuild').BuildOptions} options esbuild options
 */
function esbuild(options) {
  if (watching) {
    options.watch = {
      onRebuild(error, result) {
        const date = new Date();
        if (error) {
          console.error(`${date.toLocaleString()} watch build failed: `);
          console.error(JSON.stringify(error, undefined, 2));
        }
        else {
          console.log(`${date.toLocaleString()} watch build succeeded: `);
          console.error(JSON.stringify(result, undefined, 2));
        }
      }
    };
  }

  const startTime = new Date();
  console.log(`${startTime.toLocaleString()} start build ${JSON.stringify(options.entryPoints)} -> ${options.outdir ?? options.outfile}`);

  return build(options).then(result => {
    const endTime = new Date();
    if (watching) {
      console.log(`${endTime.toLocaleString()} watching ...`);
    }
    else {
      console.log(`${endTime.toLocaleString()} build completed in ${endTime - startTime} ms, result is: `);
      console.log(JSON.stringify(result, undefined, 2));
    }
  }).catch(ex => {
    console.error(ex);
    process.exit(1);
  });
}

export { createOptions, esbuild };
