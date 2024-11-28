import { defineConfig } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import babel from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
      "@components": resolve("src/lib/components"),
      "@utils": resolve("src/utils"),
      "@styles": resolve("src/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  build: {
    lib: {
      entry: "src/lib/JsonViewer.svelte",
      formats: ["es", "umd"],
      fileName: "json-viewer",
      name: `[name].js`,
    },
    rollupOptions: {
      external: ["svelte"],
      //   output: {
      //     entryFileNames: `[name].js`,
      //   },
      plugins: [
        babel({
          extensions: [".js", ".ts"],
          babelHelpers: "runtime",
          plugins: ["@babel/plugin-transform-runtime"],
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: false,
                targets: {
                  browsers: ["last 2 versions", "> 1%", "not ie <= 11"],
                },
              },
            ],
          ],
        }),
      ],
    },
  },
});
