---
"wagmi": patch
---

Aliased `WagmiProviderProps` to `HydrateProps` to avoid duplication. also shortened the optional fields on `HydrateProps` (`initialState`, `reconnectOnMount`) by removing the redundant `| undefined`.
