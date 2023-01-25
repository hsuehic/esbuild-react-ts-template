import { LiveServerParams, start } from "live-server";
import { watch } from "chokidar";
import { build, BuildOptions } from "esbuild";

import { removeSync, copySync } from "fs-extra";

import { buildParams } from "./build-options";

/**
 * Use ESM and splitting for better performance for development
 */
const options: BuildOptions = { ...buildParams, minify: false, incremental: true, format: "esm", splitting: true };

/**
 * Live Server Params
 * @link https://www.npmjs.com/package/live-server#usage-from-node
 */
const serverParams: LiveServerParams = {
  port: 8181, // Set the server port. Defaults to 8080.
  root: "build", // Set root directory that's being served. Defaults to cwd.
  open: false // When false, it won't load your browser by default.
  // host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  // logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
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

(async () => {
  // Build
  const result = await build(options).catch(() => process.exit(1));

  // Start live server
  start(serverParams);
  /**
   * Watch development server changes
   * ignored: ignore watch `.*` files
   */
  return watch("src/**/*", { ignored: /(^|[/\\])\../, ignoreInitial: true }).on("all", async (event, p) => {
    if (event === "change") {
      console.log(`⚡ [esbuild] Rebuilding ${p}`);
      console.time("⚡ [esbuild] Done");
      if (result.rebuild) await result.rebuild();
      console.timeEnd("⚡ [esbuild] Done");
    }
  });
})();
