import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // `@coinbase-wallet/sdk` hardcodes `process.env`
    // https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/src/CoinbaseWalletSDK.ts#L15-L17
    'process.env': {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@wagmi/chains': path.resolve(
        __dirname,
        '../../references/packages/chains/src',
      ),
      '@wagmi/core': path.resolve(__dirname, '../../packages/core/src'),
      '@wagmi/connectors': path.resolve(
        __dirname,
        '../../references/packages/connectors/src',
      ),
    },
  },
})
