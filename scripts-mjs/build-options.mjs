import path from 'path';

// import cssModulesPlugin from "esbuild-css-modules-plugin";
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import eslintPlugin from 'esbuild-plugin-eslint';

import { fileURLToPath } from 'url';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

// import postcss from "postcss";
// import autoprefixer from "autoprefixer";
// import postcssPresetEnv from "postcss-preset-env";

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
export const buildParams = {
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
    // cssModulesPlugin({
    //   v2: true
    // }),
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
