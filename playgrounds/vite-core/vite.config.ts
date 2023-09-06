import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const connectorsPath = '../../packages/connectors/src'
const corePath = '../../packages/core/src/exports'

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
      '@wagmi/connectors': path.resolve(__dirname, connectorsPath),
      '@wagmi/core': path.resolve(__dirname, corePath),
    },
  },
})
