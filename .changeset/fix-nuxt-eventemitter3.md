---
"@wagmi/vue": patch
---

Add `eventemitter3` to Vite `optimizeDeps.include` in the Nuxt module to fix CJS/ESM interop error when using auto-imports.
