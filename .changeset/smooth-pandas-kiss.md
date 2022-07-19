---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking**: Moved the `pollingInterval` config option from the chain provider config to `configureChains` config.

```diff
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
-   alchemyProvider({ alchemyId, pollingInterval: 5000 }),
-   publicProvider({ pollingInterval: 5000 })
+   alchemyProvider({ alchemyId }),
+   publicProvider()
  ],
+ { pollingInterval: 5000 }
)
```
