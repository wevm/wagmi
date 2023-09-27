import react from '@vitejs/plugin-react'
import ssr from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), ssr()],
})
