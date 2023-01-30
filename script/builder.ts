// JavaScript Modules via script tag is only supported by mondern browsers. We disable code splitting for production

import { build, BuildOptions } from "esbuild";
import { removeSync, copySync } from "fs-extra";

import { buildParams } from "./build-options";

const options: BuildOptions = {
  ...buildParams,
  sourcemap: true,
  watch: false,
  minify: true,
  incremental: false,
  format: "cjs",
  splitting: false
};

// Clean build folder
try {
  removeSync("build");
} catch (err) {
  console.error(err);
}
// Copy public folder into build folder
try {
  copySync("public", "build");
} catch (err) {
  console.error(err);
}

const s: number = new Date().getTime();

// Run build
console.log(`⚡ [esbuild] Building started at:`, s);
build(options).catch(() => process.exit(1));
const e: number = new Date().getTime();
console.log(`⚡ [esbuild] Building completed at:`, e);

console.log("Duration:", e - s, "ms");

console.log("");
