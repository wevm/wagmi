import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
      wagmi: path.resolve(__dirname, '../../packages/react/src'),
    },
  },
})
