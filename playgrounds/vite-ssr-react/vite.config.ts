import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  plugins: [react(), ssr()],
})
