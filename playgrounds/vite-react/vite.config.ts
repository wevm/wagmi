import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const connectorsPath = '../../packages/connectors/src'
const corePath = '../../packages/core/src'
const reactPath = '../../packages/react/src'

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
      '@wagmi/core/chains': path.resolve(__dirname, `${corePath}/chains.ts`),
      '@wagmi/core/internal': path.resolve(
        __dirname,
        `${corePath}/internal.ts`,
      ),
      '@wagmi/core/query': path.resolve(__dirname, `${corePath}/query.ts`),

      wagmi: path.resolve(__dirname, reactPath),
      'wagmi/actions': path.resolve(__dirname, `${reactPath}/actions.ts`),
      'wagmi/chains': path.resolve(__dirname, `${reactPath}/chains.ts`),
      'wagmi/connectors': path.resolve(__dirname, `${reactPath}/connectors.ts`),
      'wagmi/query': path.resolve(__dirname, `${reactPath}/query.ts`),
    },
  },
})
