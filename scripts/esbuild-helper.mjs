import * as esbuild from 'esbuild';

const production = process.env.NODE_ENV === 'production';
const watching = !!process.env.ESBUILD_WATCH;

/**
 * create esbuild options;
 * @param {string[]} entryPoints entry points;
 * @param {string} output output file or dir (end with /)
 * @returns {esbuild.BuildOptions}
 */
function createOptions(entryPoints, output) {
  /** @type {esbuild.BuildOptions} */
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
 * build or watch with options;
 * @param {esbuild.BuildOptions} options esbuild options
 */
function buildOrWatch(options) {
  const task = `${JSON.stringify(options.entryPoints)} -> ${options.outdir ?? options.outfile}`;

  if (watching) {
    let startTime = new Date();
    /** @type {esbuild.Plugin} */
    const plugin = {
      name: 'watch-plugin',
      setup(pluginBuild) {
        pluginBuild.onStart(start => {
          startTime = new Date();
        });
        pluginBuild.onEnd(result => {
          const now = new Date();
          const elapsed = now - startTime;
          if (result.errors.length > 0 || result.warnings.length > 0) {
            if (result.errors.length > 0) {
              console.error(`${now.toLocaleString()} Build completed with errors in ${elapsed} ms: `);
              // console.error(result.errors);
            }
            if (result.warnings.length > 0) {
              console.error(`${now.toLocaleString()} Build completed with warnings in ${elapsed} ms: `);
              // console.error(result.warnings);
            }
          }
          else {
            console.log(`Build successfully in ${elapsed} ms !`);
          }
        });
      }
    };
    console.log(`${startTime.toLocaleString()} Creating watch context for ${task} ...`);
    esbuild.context({ ...options, plugins: [plugin]}).then(context => {
      console.log(`${startTime.toLocaleString()} Start watching ...`);
      context.watch({}).then(() => {
        startTime = new Date();
        console.log(`${startTime.toLocaleString()} Watch started ...` );
      }).catch(ex => {
        console.error(`Watch failed with error ${ex}`);
      })
    }).catch(ex => {
      console.error(`Create context with error ${ex}`);
    });
  }
  else {
    const startTime = new Date();
    console.log(`${startTime.toLocaleString()} start build ${task}`);
    esbuild.build(options).then(result => {
      const endTime = new Date();
      console.log(`${endTime.toLocaleString()} build completed in ${endTime - startTime} ms, result is: `);
      console.log(JSON.stringify(result, undefined, 2));
    }).catch(ex => {
      console.error(ex);
      process.exit(1);
    });
  }
}

export { createOptions, buildOrWatch };
