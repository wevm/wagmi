// eslint-disable-next-line import/no-unresolved
import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    devtools({
      locator: {
        componentLocation: true,
        jsxLocation: true,
      },
      autoname: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    // Required because it crashes if we optimize tanstack solid-query
    exclude: ['@tanstack/solid-query'],
  },
})
