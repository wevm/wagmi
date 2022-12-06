---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking**: the shape of the `Chain` type has been modified.

#### RPC URLs

The `rpcUrls` shape has changed to include an array of URLs, and also the transport method (`http` or `webSocket`):

```diff
type Chain = {
  ...
  rpcUrls: {
-   [key: string]: string
+   [key: string]: {
+     http: string[]
+     webSocket: string[]
+   }
  }
  ...
}
```

Note that you will also need to ensure that usage is migrated:

```diff
- const rpcUrl = mainnet.rpcUrls.alchemy
+ const rpcUrl = mainnet.rpcUrls.alchemy.http[0]
```

#### Contracts

The `multicall` and `ens` attributes have been moved into the `contracts` object:

```diff
type Contract = {
  address: Address
  blockCreated?: number
}

type Chain = {
  ...
- multicall: Contract
- ens: Contract
+ contracts: {
+   multicall3: Contract
+   ensRegistry: Contract
+ }
  ...
}
```

Note that you will also need to ensure that usage is migrated:

```diff
- const multicallContract = mainnet.multicall
+ const multicallContract = mainnet.contracts.multicall3
```
