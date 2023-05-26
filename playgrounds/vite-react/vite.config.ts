import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // `@coinbase-wallet/sdk` hardcodes `process.env` and uses `Buffer`
  // https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/src/CoinbaseWalletSDK.ts#L15-L17
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
      plugins: [NodeGlobalsPolyfillPlugin({ process: true, buffer: true })],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@wagmi/chains': path.resolve(__dirname, '../../packages/chains/src'),
      '@wagmi/core': path.resolve(__dirname, '../../packages/core/src'),
      '@wagmi/connectors': path.resolve(
        __dirname,
        '../../packages/connectors/src',
      ),
      wagmi: path.resolve(__dirname, '../../packages/react/src'),
    },
  },
})
