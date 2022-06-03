---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking**: The `provider` config option is now required on `createClient`. It is recommended to pass the [`provider` given from `configureChains`](https://wagmi.sh/docs/providers/configuring-chains).

```diff
import {
  createClient,
+ defaultChains,
+ configureChains
} from 'wagmi'
+import { publicProvider } from 'wagmi/providers/publicProvider'

+const { provider } = configureChains(defaultChains, [
+ publicProvider
+])

const client = createClient({
+ provider
})
```

If you previously used an ethers.js Provider, you now need to provide your `chains` on the Provider instance:

```diff
import {
  createClient,
+ defaultChains
} from 'wagmi'
import ethers from 'ethers'

const client = createClient({
- provider: getDefaultProvider()
+ provider: Object.assign(getDefaultProvider(), { chains: defaultChains })
})
```
