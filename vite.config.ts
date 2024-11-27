import { defineConfig } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

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
  build: {
    lib: {
      entry: "src/lib/JsonViewer.svelte",
      formats: ["es"],
      fileName: "json-viewer",
      name: `[name].js`,
    },
    rollupOptions: {
      external: ["svelte"],
      //   output: {
      //     entryFileNames: `[name].js`,
      //   },
    },
  },
});
