---
"@wagmi/vue": patch
---

Added `eventemitter3` to Vite `optimizeDeps.include` in Nuxt module to fix CJS/ESM interop error when using auto-imports.
