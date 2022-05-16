---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking:** Duplicate exports with different names and the same functionality were removed to simplify the public API.

- `createWagmiClient` alias was removed. Use `createClient` instead.
- `useWagmiClient` alias was removed. Use `useClient` instead.
- `WagmiClient` alias was removed. Use `Client` instead.
- `createWagmiStorage` alias was removed. Use `createStorage` instead.
- `Provider` was renamed. Use `ClientProvider` (or `WagmiProvider` alias) instead.
