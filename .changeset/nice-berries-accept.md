---
'@wagmi/core': minor
---

**Breaking**: With the introduction of the [`@wagmi/core/chains` entrypoint](/core/chains), `@wagmi/core` no longer exports the following:

- `chain`
- `allChains`
- `defaultChains`
- `defaultL2Chains`
- `chainId`
- `etherscanBlockExplorers`
- `alchemyRpcUrls`, `infuraRpcUrls`, `publicRpcUrls`

Read below for migration steps.

#### Removed `chain`

The `chain` export has been removed. `@wagmi/core` now only exports the `mainnet` & `goerli` chains. If you need to use an alternative chain (`polygon`, `optimism`, etc), you will need to import it from the [`@wagmi/core/chains` entrypoint](/core/chains).

```diff
import {
- chain
  configureChains
} from '@wagmi/core'
+ import { mainnet, polygon, optimism } from '@wagmi/core/chains'

const { ... } = configureChains(
- [chain.mainnet, chain.polygon, chain.optimism],
+ [mainnet, polygon, optimism],
  {
    ...
  }
)
```

#### Removed `allChains`

The `allChains` export has been removed. If you need a list of all chains, you can utilize [`@wagmi/core/chains` entrypoint](/core/chains).

```diff
- import { allChains } from '@wagmi/core'
+ import * as allChains from '@wagmi/core/chains'

const { ... } = configureChains(allChains, ...)
```

#### Removed `defaultChains` & `defaultL2Chains`

The `defaultChains` & `defaultL2Chains` exports have been removed. If you still need the `defaultChains` or `defaultL2Chains` exports, you can build them yourself:

```diff
- import { defaultChains } from '@wagmi/core'
+ import { mainnet, goerli } from '@wagmi/core/chains'

+ const defaultChains = [mainnet, goerli]
```

> The `defaultChains` export was previously populated with `mainnet` & `goerli`.

```diff
- import { defaultL2Chains } from '@wagmi/core'
+ import {
+   arbitrum,
+   arbitrumGoerli,
+   polygon,
+   polygonMumbai,
+   optimism,
+   optimismGoerli
+ } from '@wagmi/core/chains'

+ const defaultL2Chains = [
+  arbitrum,
+  arbitrumGoerli,
+  polygon,
+  polygonMumbai,
+  optimism
+  optimismGoerli
+ ]
```

> The `defaultL2Chains` export was previously populated with `arbitrum` & `optimism`.

#### Removed `chainId`

The `chainId` export has been removed. You can extract a chain ID from the chain itself.

```diff
- import { chainId } from '@wagmi/core'
+ import { mainnet, polygon, optimism } from '@wagmi/core/chains'

-const mainnetChainId = chainId.mainnet
-const polygonChainId = chainId.polygon
-const optimismChainId = chainId.optimism
+const mainnetChainId = mainnet.chainId
+const polygonChainId = polygon.chainId
+const optimismChainId = optimism.chainId
```

#### Removed `etherscanBlockExplorers`

The `etherscanBlockExplorers` export has been removed. You can extract a block explorer from the chain itself.

```diff
- import { etherscanBlockExplorers } from '@wagmi/core'
+ import { mainnet, polygon, optimism } from '@wagmi/core/chains'

-const mainnetEtherscanBlockExplorer = etherscanBlockExplorers.mainnet
-const polygonEtherscanBlockExplorer = etherscanBlockExplorers.polygon
-const optimismEtherscanBlockExplorer = etherscanBlockExplorers.optimism
+const mainnetEtherscanBlockExplorer = mainnet.blockExplorer
+const polygonEtherscanBlockExplorer = polygon.blockExplorer
+const optimismEtherscanBlockExplorer = optimism.blockExplorer
```

#### Removed `alchemyRpcUrls`, `infuraRpcUrls` & `publicRpcUrls`

The `alchemyRpcUrls`, `infuraRpcUrls` & `publicRpcUrls` exports have been removed. You can extract a RPC URL from the chain itself.

```diff
- import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from '@wagmi/core'
+ import { mainnet } from '@wagmi/core/chains'

-const mainnetAlchemyRpcUrl = alchemyRpcUrls.mainnet
-const mainnetInfuraRpcUrl = infuraRpcUrls.mainnet
-const mainnetOptimismRpcUrl = publicRpcUrls.mainnet
+const mainnetAlchemyRpcUrl = mainnet.rpcUrls.alchemy
+const mainnetInfuraRpcUrl = mainnet.rpcUrls.infura
+const mainnetOptimismRpcUrl = mainnet.rpcUrls.optimism
```
