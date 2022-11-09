---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking**: Made `apiKey` required on `infuraProvider` and `alchemyProvider`.

```diff
import { configureChains } from 'wagmi'

const config = configureChains(defaultChains, [
- alchemyProvider(),
+ alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY })
])
```

You can find your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/), or your Infura API key from the [Infura Dashboard](https://infura.io/login).
