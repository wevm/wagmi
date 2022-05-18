---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking:** Duplicate exports with different names and the same functionality were removed to simplify the public API. In addition, confusing exports were renamed to be more descriptive.

- `createWagmiClient` alias was removed. Use `createClient` instead.
- `useWagmiClient` alias was removed. Use `useClient` instead.
- `WagmiClient` alias was removed. Use `Client` instead.
- `createWagmiStorage` alias was removed. Use `createStorage` instead.
- `Provider` was renamed and `WagmiProvider` alias was removed. Use `WagmiConfig` instead.
