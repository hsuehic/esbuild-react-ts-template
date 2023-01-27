import path from "path";
import { BuildOptions } from "esbuild";

import cssModulesPlugin from "esbuild-css-modules-plugin";
import { sassPlugin } from "esbuild-sass-plugin";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
export const buildParams: BuildOptions = {
  color: true,
  entryPoints: ["src/index.tsx"],
  loader: { ".ts": "tsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file" },
  assetNames: "assets/[name]-[hash]",
  entryNames: "js/[name]-[hash]",
  chunkNames: "js/[name]-[hash]",
  outdir: "build",
  minify: false,
  format: "esm",
  bundle: true,
  sourcemap: false,
  logLevel: "error",
  incremental: false,
  splitting: true,
  metafile: true,
  plugins: [
    cssModulesPlugin(),
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 0 })]).process(source, {
          from: undefined
        });
        return css;
      }
    }),
    htmlPlugin({
      files: [
        {
          entryPoints: ["src/index.tsx"],
          filename: "index.html",
          htmlTemplate: path.resolve(__dirname, "../src/index.html"),
          title: "Hello ESBuilder 1!",
          scriptLoading: "module"
        }
      ]
    })
  ]
};
