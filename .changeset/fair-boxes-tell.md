---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking:** `alchemyProvider` and `infuraProvider` now use a generic `apiKey` configuration option instead of `alchemyId` and `infuraId`.

```diff
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { infuraProvider } from '@wagmi/core/providers/infura'

alchemyProvider({
-  alchemyId: 'yourAlchemyApiKey',
+  apiKey: 'yourAlchemyApiKey',
})

infuraProvider({
-  infuraId: 'yourInfuraApiKey',
+  apiKey: 'yourInfuraApiKey',
})
```
