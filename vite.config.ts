import { defineConfig } from 'vite'
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte({
        compilerOptions: {
            customElement: true,
        },
    })],
    resolve: {
        alias: {
            '@': resolve('src'),
            '@components': resolve('src/lib/components'),
            '@utils': resolve('src/utils'),
            '@styles': resolve('src/styles')
        }
    },
    build: {
        lib: {
            entry: 'src/wc.ts',
            name: 'json viewer Web Component library',
        },
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
            }
        }
    }
})
