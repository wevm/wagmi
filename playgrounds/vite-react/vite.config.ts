import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const connectorsPath = '../../packages/connectors/src/exports'
const corePath = '../../packages/core/src/exports'
const reactPath = '../../packages/react/src/exports'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@wagmi/connectors': path.resolve(__dirname, connectorsPath),
      '@wagmi/core': path.resolve(__dirname, corePath),
      wagmi: path.resolve(__dirname, reactPath),
    },
  },
})
