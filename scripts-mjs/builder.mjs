// JavaScript Modules via script tag is only supported by mondern browsers. We disable code splitting for production

import { build } from 'esbuild';
import fs from 'fs-extra';

// import { exec } from "child_process";

import { buildParams } from './build-options.mjs';

const { removeSync, copySync } = fs;

const options = {
  ...buildParams,
  sourcemap: true,
  minify: true,
  format: 'esm',
  splitting: true,
};

// Clean build folder
try {
  console.time('remove build');
  removeSync('build');
  console.timeEnd('remove build');
} catch (err) {
  console.error(err);
}

// Copy public folder into build folder
try {
  console.time('public -> build');
  copySync('public', 'build');
  console.timeEnd('public -> build');
} catch (err) {
  console.error(err);
}

// // Clean build folder
// try {
//   console.time("remove build");
//   exec("rm -rf ./build");
//   console.timeEnd("remove build");
// } catch (err) {
//   console.error(err);
// }

// // Copy public folder into build folder
// try {
//   console.time("public -> build");
//   exec("cp -R ./public ./build");
//   console.timeEnd("public -> build");
// } catch (err) {
//   console.error(err);
// }

// Run build
console.time('⚡ [esbuild] Building');
build(options).catch(() => process.exit(1));
console.timeEnd('⚡ [esbuild] Building');
