const path = require('path');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');
const eslintPlugin = require('esbuild-plugin-eslint-hybrid').default;

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
exports.initBuildParams = async () => {
  console.log(eslintPlugin);
  return {
    color: true,
    entryPoints: ['src/index.tsx'],
    loader: {
      '.ts': 'tsx',
      '.json': 'json',
      '.png': 'file',
      '.jpeg': 'file',
      '.jpg': 'file',
      '.svg': 'file',
    },
    assetNames: 'assets/[name]-[hash]',
    entryNames: 'js/[name]-[hash]',
    chunkNames: 'js/[name]-[hash]',
    outdir: 'build',
    minify: false,
    format: 'esm',
    bundle: true,
    sourcemap: false,
    logLevel: 'error',
    splitting: true,
    metafile: true,
    plugins: [
      sassPlugin({
        type: 'css',
        filter: /\.modules\.scss$/,
        loadPaths: [
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './node_modules/.pnpm/node_modules'),
        ],
        transform: postcssModules({}),
      }),

      sassPlugin({
        type: 'css',
        filter: /\.scss$/,
        loadPaths: [
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './node_modules/.pnpm/node_modules'),
        ],
      }),
      eslintPlugin({
        useEslintrc: true,
        throwOnError: false,
        throwOnWarning: false,
      }),

      htmlPlugin({
        files: [
          {
            entryPoints: ['src/index.tsx'],
            filename: 'index.html',
            htmlTemplate: path.resolve(__dirname, '../src/index.html'),
            title: 'Hello ESBuilder 1!',
            scriptLoading: 'module',
          },
        ],
      }),
    ],
  };
};
