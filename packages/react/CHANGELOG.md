# wagmi

## 0.10.10

### Patch Changes

- [#1648](https://github.com/wagmi-dev/wagmi/pull/1648) [`a2db9170`](https://github.com/wagmi-dev/wagmi/commit/a2db91709720161cd70eeb5e84dd78433264f0a3) Thanks [@tmm](https://github.com/tmm)! - Exported internal type.

## 0.10.9

### Patch Changes

- [#1646](https://github.com/wagmi-dev/wagmi/pull/1646) [`fcdbe353`](https://github.com/wagmi-dev/wagmi/commit/fcdbe3531e6d05cda4a4a511bae1ad4c9e426d88) Thanks [@jxom](https://github.com/jxom)! - Upgraded `zustand` to v4.3.1.

- Updated dependencies [[`fcdbe353`](https://github.com/wagmi-dev/wagmi/commit/fcdbe3531e6d05cda4a4a511bae1ad4c9e426d88)]:
  - @wagmi/core@0.8.14

## 0.10.8

### Patch Changes

- [#1639](https://github.com/wagmi-dev/wagmi/pull/1639) [`c6869f06`](https://github.com/wagmi-dev/wagmi/commit/c6869f0604fffb197752a08256f31db77f52e746) Thanks [@jxom](https://github.com/jxom)! - Added `isRainbow` flag to `InjectedConnector`.

- Updated dependencies [[`c6869f06`](https://github.com/wagmi-dev/wagmi/commit/c6869f0604fffb197752a08256f31db77f52e746)]:
  - @wagmi/core@0.8.13

## 0.10.7

### Patch Changes

- [#1636](https://github.com/wagmi-dev/wagmi/pull/1636) [`025f6771`](https://github.com/wagmi-dev/wagmi/commit/025f6771b32ff7eed22f527be81c5141ddaf9c3d) Thanks [@DanielSinclair](https://github.com/DanielSinclair)! - Added `isRainbow` flag to injected `window.ethereum` types.

- Updated dependencies [[`025f6771`](https://github.com/wagmi-dev/wagmi/commit/025f6771b32ff7eed22f527be81c5141ddaf9c3d)]:
  - @wagmi/core@0.8.12

## 0.10.6

### Patch Changes

- [#1623](https://github.com/wagmi-dev/wagmi/pull/1623) [`c97a4bc5`](https://github.com/wagmi-dev/wagmi/commit/c97a4bc5df422dc9a9d3d8bac0261ec6933ce15b) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useSigner` would not update on account change.

## 0.10.5

### Patch Changes

- [#1621](https://github.com/wagmi-dev/wagmi/pull/1621) [`5812b590`](https://github.com/wagmi-dev/wagmi/commit/5812b5909277bf2862cb57a31d52465b47291410) Thanks [@tmm](https://github.com/tmm)! - Bumped @wagmi/connectors

- Updated dependencies [[`5812b590`](https://github.com/wagmi-dev/wagmi/commit/5812b5909277bf2862cb57a31d52465b47291410)]:
  - @wagmi/core@0.8.11

## 0.10.4

### Patch Changes

- [#1607](https://github.com/wagmi-dev/wagmi/pull/1607) [`49a41357`](https://github.com/wagmi-dev/wagmi/commit/49a41357f9ca39479bdf759f5998bc169a91ac87) Thanks [@tmm](https://github.com/tmm)! - Exported hook types.

## 0.10.3

### Patch Changes

- [#1598](https://github.com/wagmi-dev/wagmi/pull/1598) [`fc10ebe6`](https://github.com/wagmi-dev/wagmi/commit/fc10ebe659dd5f3b7a8e00581f094652280a779b) Thanks [@jxom](https://github.com/jxom)! - Fixed CJS dependency version range

- Updated dependencies [[`fc10ebe6`](https://github.com/wagmi-dev/wagmi/commit/fc10ebe659dd5f3b7a8e00581f094652280a779b)]:
  - @wagmi/core@0.8.10

## 0.10.2

### Patch Changes

- [#1593](https://github.com/wagmi-dev/wagmi/pull/1593) [`216d555c`](https://github.com/wagmi-dev/wagmi/commit/216d555c62bd95c3c7c8f8e20f7269f6c8504610) Thanks [@jxom](https://github.com/jxom)! - Added CJS escape hatch bundle under the "cjs" tag.

- Updated dependencies [[`216d555c`](https://github.com/wagmi-dev/wagmi/commit/216d555c62bd95c3c7c8f8e20f7269f6c8504610)]:
  - @wagmi/core@0.8.9

## 0.10.1

### Patch Changes

- [#1573](https://github.com/wagmi-dev/wagmi/pull/1573) [`ef380d9c`](https://github.com/wagmi-dev/wagmi/commit/ef380d9c6d51ae0495b9c35925d2843c75d97fd4) Thanks [@tmm](https://github.com/tmm)! - Updated internal types.

- Updated dependencies [[`ef380d9c`](https://github.com/wagmi-dev/wagmi/commit/ef380d9c6d51ae0495b9c35925d2843c75d97fd4)]:
  - @wagmi/core@0.8.8

## 0.10.0

### Minor Changes

- [#1470](https://github.com/wagmi-dev/wagmi/pull/1470) [`3a1a6c9f`](https://github.com/wagmi-dev/wagmi/commit/3a1a6c9fe5db5c360adfd116f9a03a1238b5720c) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `useSigner` hook now always returns `undefined` when no signer is present. Previously, it returned `null`.

  When no signer is present, the hook will be in an `"idle"` status.

### Patch Changes

- [#1470](https://github.com/wagmi-dev/wagmi/pull/1470) [`3a1a6c9f`](https://github.com/wagmi-dev/wagmi/commit/3a1a6c9fe5db5c360adfd116f9a03a1238b5720c) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useSigner` would broadcast to other `useSigner`s unnecessarily.

- [#1470](https://github.com/wagmi-dev/wagmi/pull/1470) [`3a1a6c9f`](https://github.com/wagmi-dev/wagmi/commit/3a1a6c9fe5db5c360adfd116f9a03a1238b5720c) Thanks [@jxom](https://github.com/jxom)! - The `WalletConnectConnector` now supports WalletConnect v2.

  It can be enabled by setting `version` to `'2'` and supplying a [WalletConnect Cloud `projectId`](https://cloud.walletconnect.com/sign-in).

- [#1570](https://github.com/wagmi-dev/wagmi/pull/1570) [`216f585b`](https://github.com/wagmi-dev/wagmi/commit/216f585be8a9e3a56e3243f49ccd54d655b5a6dd) Thanks [@jxom](https://github.com/jxom)! - Added `useWatchPendingTransactions`

- Updated dependencies [[`216f585b`](https://github.com/wagmi-dev/wagmi/commit/216f585be8a9e3a56e3243f49ccd54d655b5a6dd), [`3a1a6c9f`](https://github.com/wagmi-dev/wagmi/commit/3a1a6c9fe5db5c360adfd116f9a03a1238b5720c)]:
  - @wagmi/core@0.8.7

## 0.9.6

### Patch Changes

- [#1539](https://github.com/wagmi-dev/wagmi/pull/1539) [`732da004`](https://github.com/wagmi-dev/wagmi/commit/732da0042c7e28091b2e36a484ea8239971306f5) Thanks [@0xFlicker](https://github.com/0xFlicker)! - All Providers (ie. Alchemy, Infura, Public) now use the ENS Registry address on the wagmi `Chain` object (`chain.contracts.ensRegistry`).

- [#1574](https://github.com/wagmi-dev/wagmi/pull/1574) [`ecde3d10`](https://github.com/wagmi-dev/wagmi/commit/ecde3d1029ccdf90e2853ba0e9ae4f5f4ebb9c4c) Thanks [@jxom](https://github.com/jxom)! - Added the following chains:

  - `iotex`
  - `iotexTestnet`
  - `zkSync`
  - `zkSyncTestnet`

- Updated dependencies [[`732da004`](https://github.com/wagmi-dev/wagmi/commit/732da0042c7e28091b2e36a484ea8239971306f5), [`ecde3d10`](https://github.com/wagmi-dev/wagmi/commit/ecde3d1029ccdf90e2853ba0e9ae4f5f4ebb9c4c)]:
  - @wagmi/core@0.8.6

## 0.9.5

### Patch Changes

- [#1542](https://github.com/wagmi-dev/wagmi/pull/1542) [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Added the following chains:

  - `evmos`
  - `evmosTestnet`
  - `gnosis`

- [#1542](https://github.com/wagmi-dev/wagmi/pull/1542) [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Updated Goerli symbol to `"ETH"`.

- [#1542](https://github.com/wagmi-dev/wagmi/pull/1542) [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Updated Arbitrum Goerli RPC and Block Explorer.

- [#1542](https://github.com/wagmi-dev/wagmi/pull/1542) [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where connecting to MetaMask may return with a stale address.

- [#1542](https://github.com/wagmi-dev/wagmi/pull/1542) [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Removed ENS registry for Sepolia.

- Updated dependencies [[`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549), [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549), [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549), [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549), [`731b3b73`](https://github.com/wagmi-dev/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549)]:
  - @wagmi/core@0.8.5

## 0.9.4

### Patch Changes

- [#1508](https://github.com/wagmi-dev/wagmi/pull/1508) [`0b50b62f`](https://github.com/wagmi-dev/wagmi/commit/0b50b62f7389619e429509a3e337e451e823b059) Thanks [@jxom](https://github.com/jxom)! - Updated `@wagmi/chains` to `0.1.3`.

- [#1507](https://github.com/wagmi-dev/wagmi/pull/1507) [`7a083bcf`](https://github.com/wagmi-dev/wagmi/commit/7a083bcf31d671817a4da2f40fb2160a1ba9d7b7) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useBlockNumber` would return data when `watch` is enabled and `enabled` is falsy.

- [#1504](https://github.com/wagmi-dev/wagmi/pull/1504) [`11b8b794`](https://github.com/wagmi-dev/wagmi/commit/11b8b794fbfd4a2b40f39962e2758e9fbf48cb54) Thanks [@tmm](https://github.com/tmm)! - Converted ethers custom "ACTION_REJECTED" error to standard RPC Error.

- Updated dependencies [[`0b50b62f`](https://github.com/wagmi-dev/wagmi/commit/0b50b62f7389619e429509a3e337e451e823b059), [`11b8b794`](https://github.com/wagmi-dev/wagmi/commit/11b8b794fbfd4a2b40f39962e2758e9fbf48cb54)]:
  - @wagmi/core@0.8.4

## 0.9.3

### Patch Changes

- [#1431](https://github.com/wagmi-dev/wagmi/pull/1431) [`af28f8f9`](https://github.com/wagmi-dev/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc) Thanks [@jxom](https://github.com/jxom)! - Re-export connectors from `@wagmi/connectors`

- [#1431](https://github.com/wagmi-dev/wagmi/pull/1431) [`af28f8f9`](https://github.com/wagmi-dev/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc) Thanks [@jxom](https://github.com/jxom)! - Added `LedgerConnector` connector

- Updated dependencies [[`af28f8f9`](https://github.com/wagmi-dev/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc), [`af28f8f9`](https://github.com/wagmi-dev/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc)]:
  - @wagmi/core@0.8.3

## 0.9.2

### Patch Changes

- [#1442](https://github.com/wagmi-dev/wagmi/pull/1442) [`cde15289`](https://github.com/wagmi-dev/wagmi/commit/cde152899c758dea10787412b0aef669ed7202b2) Thanks [@0xproflupin](https://github.com/0xproflupin)! - Added Phantom wallet support to `InjectedConnector`

- [#1448](https://github.com/wagmi-dev/wagmi/pull/1448) [`c6075f3a`](https://github.com/wagmi-dev/wagmi/commit/c6075f3a16885d850ad2656272351f9517c9f67b) Thanks [@tmm](https://github.com/tmm)! - Updated [ABIType](https://github.com/wagmi-dev/abitype) version.

- [#1444](https://github.com/wagmi-dev/wagmi/pull/1444) [`310a8bc4`](https://github.com/wagmi-dev/wagmi/commit/310a8bc428ce4e7f68377f581b45dcdd64381cce) Thanks [@jxom](https://github.com/jxom)! - Assert that a `connector` exists before invoking the callback in `watchSigner`.

- [#1434](https://github.com/wagmi-dev/wagmi/pull/1434) [`100e2a3b`](https://github.com/wagmi-dev/wagmi/commit/100e2a3b22f4602716554487b1d98738e053be76) Thanks [@tmm](https://github.com/tmm)! - Updated `MockConnector` `chainId` behavior to default to first chain from `chains` if not provided in `options`.

- Updated dependencies [[`cde15289`](https://github.com/wagmi-dev/wagmi/commit/cde152899c758dea10787412b0aef669ed7202b2), [`c6075f3a`](https://github.com/wagmi-dev/wagmi/commit/c6075f3a16885d850ad2656272351f9517c9f67b), [`310a8bc4`](https://github.com/wagmi-dev/wagmi/commit/310a8bc428ce4e7f68377f581b45dcdd64381cce), [`100e2a3b`](https://github.com/wagmi-dev/wagmi/commit/100e2a3b22f4602716554487b1d98738e053be76)]:
  - @wagmi/core@0.8.2

## 0.9.1

### Patch Changes

- [#1437](https://github.com/wagmi-dev/wagmi/pull/1437) [`c34a3dc6`](https://github.com/wagmi-dev/wagmi/commit/c34a3dc6396e6473d9f0505fad88ec910f8f5275) Thanks [@jxom](https://github.com/jxom)! - Omitted `"EIP712Domain"` type from `signTypedData` `types` arg since ethers throws an [internal error](https://github.com/ethers-io/ethers.js/blob/c80fcddf50a9023486e9f9acb1848aba4c19f7b6/packages/hash/src.ts/typed-data.ts#L466) if you include it.

- [#1445](https://github.com/wagmi-dev/wagmi/pull/1445) [`51dd53cb`](https://github.com/wagmi-dev/wagmi/commit/51dd53cba3fe0f79fa1393270b738194577ddf54) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where the wagmi client wouldn't rehydrate the store in local storage when `autoConnect` is truthy.

- Updated dependencies [[`c34a3dc6`](https://github.com/wagmi-dev/wagmi/commit/c34a3dc6396e6473d9f0505fad88ec910f8f5275), [`51dd53cb`](https://github.com/wagmi-dev/wagmi/commit/51dd53cba3fe0f79fa1393270b738194577ddf54)]:
  - @wagmi/core@0.8.1

## 0.9.0

### Minor Changes

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: With the introduction of the [`wagmi/chains` entrypoint](/react/chains#wagmichains), `wagmi` no longer exports the following:

  - `chain`
  - `allChains`
  - `defaultChains`
  - `defaultL2Chains`
  - `chainId`
  - `etherscanBlockExplorers`
  - `alchemyRpcUrls`, `infuraRpcUrls`, `publicRpcUrls`

  Read below for migration steps.

  #### Removed `chain`

  The `chain` export has been removed. `wagmi` now only exports the `mainnet` & `goerli` chains. If you need to use an alternative chain (`polygon`, `optimism`, etc), you will need to import it from the [`wagmi/chains` entrypoint](/react/chains#wagmichains).

  ```diff
  import {
  - chain
    configureChains
  } from 'wagmi'
  + import { mainnet, polygon, optimism } from 'wagmi/chains'

  const { ... } = configureChains(
  - [chain.mainnet, chain.polygon, chain.optimism],
  + [mainnet, polygon, optimism],
    {
      ...
    }
  )
  ```

  #### Removed `allChains`

  The `allChains` export has been removed. If you need a list of all chains, you can utilize [`wagmi/chains` entrypoint](/react/chains#wagmichains).

  ```diff
  - import { allChains } from 'wagmi'
  + import * as allChains from 'wagmi/chains'

  const { ... } = configureChains(allChains, ...)
  ```

  #### Removed `defaultChains` & `defaultL2Chains`

  The `defaultChains` & `defaultL2Chains` exports have been removed. If you still need the `defaultChains` or `defaultL2Chains` exports, you can build them yourself:

  ```diff
  - import { defaultChains } from 'wagmi'
  + import { mainnet, goerli } from 'wagmi/chains'

  + const defaultChains = [mainnet, goerli]
  ```

  > The `defaultChains` export was previously populated with `mainnet` & `goerli`.

  ```diff
  - import { defaultL2Chains } from 'wagmi'
  + import {
  +   arbitrum,
  +   arbitrumGoerli,
  +   polygon,
  +   polygonMumbai,
  +   optimism,
  +   optimismGoerli
  + } from 'wagmi/chains'

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
  - import { chainId } from 'wagmi'
  + import { mainnet, polygon, optimism } from 'wagmi/chains'

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
  - import { etherscanBlockExplorers } from 'wagmi'
  + import { mainnet, polygon, optimism } from 'wagmi/chains'

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
  - import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from 'wagmi'
  + import { mainnet } from 'wagmi/chains'

  -const mainnetAlchemyRpcUrl = alchemyRpcUrls.mainnet
  -const mainnetInfuraRpcUrl = infuraRpcUrls.mainnet
  -const mainnetOptimismRpcUrl = publicRpcUrls.mainnet
  +const mainnetAlchemyRpcUrl = mainnet.rpcUrls.alchemy
  +const mainnetInfuraRpcUrl = mainnet.rpcUrls.infura
  +const mainnetOptimismRpcUrl = mainnet.rpcUrls.optimism
  ```

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: the shape of the `Chain` type has been modified.

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

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: Removed the `wait` config option on `useWaitForTransaction`. Use the transaction `hash` instead.

  ```diff
  const { data } = useWaitForTransaction({
  - wait: transaction.wait
  + hash: transaction.hash
  })
  ```

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - Updated errors to use `cause` instead of `internal`

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - `useEnsResolver`'s result is no longer persisted by the query client since it cannot serialize its prototype methods.

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: Changed `useWaitForTransaction` behavior to return an error if the transaction reverted.

### Patch Changes

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - `useWaitForTransaction` now throws an error for cancelled or replaced transactions.

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - `useWaitForTransaction` now respects repriced (sped up) transactions.

- [#1344](https://github.com/wagmi-dev/wagmi/pull/1344) [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - Updated `@coinbase/wallet-sdk` to `^3.6.0`.

- Updated dependencies [[`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652), [`57a19374`](https://github.com/wagmi-dev/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652)]:
  - @wagmi/core@0.8.0

## 0.8.10

### Patch Changes

- [#1411](https://github.com/wagmi-dev/wagmi/pull/1411) [`659be184`](https://github.com/wagmi-dev/wagmi/commit/659be1840c613ce9f7aca9ac96694c4f60da4a66) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where block invalidation was not properly disabled when setting `enabled: false`.

- [#1409](https://github.com/wagmi-dev/wagmi/pull/1409) [`b557b3ee`](https://github.com/wagmi-dev/wagmi/commit/b557b3ee4fc58217e61d860fc3d1109d2abc813e) Thanks [@jxom](https://github.com/jxom)! - Ensure that `useSyncExternalStoreWithTracked` rerenders when no values are being tracked.

- Updated dependencies [[`659be184`](https://github.com/wagmi-dev/wagmi/commit/659be1840c613ce9f7aca9ac96694c4f60da4a66)]:
  - @wagmi/core@0.7.9

## 0.8.9

### Patch Changes

- [#1406](https://github.com/wagmi-dev/wagmi/pull/1406) [`4f18c450`](https://github.com/wagmi-dev/wagmi/commit/4f18c450a4d7952bfcfa6c533348ffbe55893d3c) Thanks [@tmm](https://github.com/tmm)! - Function for selecting the [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target. Defaults to `() => typeof window !== 'undefined' ? window.ethereum : undefined`.

  ```ts
  import { InjectedConnector } from 'wagmi/connectors/injected'

  const connector = new InjectedConnector({
    options: {
      name: 'My Injected Wallet',
      getProvider: () =>
        typeof window !== 'undefined' ? window.myInjectedWallet : undefined,
    },
  })
  ```

- Updated dependencies [[`4f18c450`](https://github.com/wagmi-dev/wagmi/commit/4f18c450a4d7952bfcfa6c533348ffbe55893d3c)]:
  - @wagmi/core@0.7.8

## 0.8.8

### Patch Changes

- [#1386](https://github.com/wagmi-dev/wagmi/pull/1386) [`206a2adb`](https://github.com/wagmi-dev/wagmi/commit/206a2adbb4ee5149a364543b34612050ccf78c21) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `persister` would still use `window.localStorage` instead of the wagmi `storage`.

- [#1376](https://github.com/wagmi-dev/wagmi/pull/1376) [`a70a9528`](https://github.com/wagmi-dev/wagmi/commit/a70a9528f93f4d7fea28b7652751dfef2dcacf9b) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where `switchChain` on `WalletConnectConnector` would not resolve.

- [#1392](https://github.com/wagmi-dev/wagmi/pull/1392) [`88afc849`](https://github.com/wagmi-dev/wagmi/commit/88afc84978afe9689ab7364633e4422ecd7699ea) Thanks [@tmm](https://github.com/tmm)! - Added check for active connector when connecting

- Updated dependencies [[`206a2adb`](https://github.com/wagmi-dev/wagmi/commit/206a2adbb4ee5149a364543b34612050ccf78c21), [`a70a9528`](https://github.com/wagmi-dev/wagmi/commit/a70a9528f93f4d7fea28b7652751dfef2dcacf9b), [`206a2adb`](https://github.com/wagmi-dev/wagmi/commit/206a2adbb4ee5149a364543b34612050ccf78c21), [`88afc849`](https://github.com/wagmi-dev/wagmi/commit/88afc84978afe9689ab7364633e4422ecd7699ea)]:
  - @wagmi/core@0.7.7

## 0.8.7

### Patch Changes

- [#1384](https://github.com/wagmi-dev/wagmi/pull/1384) [`027e88d6`](https://github.com/wagmi-dev/wagmi/commit/027e88d6e5f8d028d46ee78aec8500701e0173d9) Thanks [@tmm](https://github.com/tmm)! - Fixed issue reconnecting after disconnect with `MetaMaskConnector` in MetaMask mobile browser.

- [#1377](https://github.com/wagmi-dev/wagmi/pull/1377) [`089c4f3b`](https://github.com/wagmi-dev/wagmi/commit/089c4f3b3b8ce5cf7807f144410e2f64b72e0580) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where transforming `useContractRead`, `useContractReads` or `useContractInfiniteReads`'s return data via `select` wasn't inferring the type.

- Updated dependencies [[`027e88d6`](https://github.com/wagmi-dev/wagmi/commit/027e88d6e5f8d028d46ee78aec8500701e0173d9)]:
  - @wagmi/core@0.7.6

## 0.8.6

### Patch Changes

- [`1169914a`](https://github.com/wagmi-dev/wagmi/commit/1169914a0f0ad2810ca1c536b1f1bc6c20f2c1be) Thanks [@jxom](https://github.com/jxom)! - Use `get_accounts` for `getSigner` in InjectedConnector

- Updated dependencies [[`1169914a`](https://github.com/wagmi-dev/wagmi/commit/1169914a0f0ad2810ca1c536b1f1bc6c20f2c1be)]:
  - @wagmi/core@0.7.5

## 0.8.5

### Patch Changes

- [#1282](https://github.com/wagmi-dev/wagmi/pull/1282) [`6d286c9e`](https://github.com/wagmi-dev/wagmi/commit/6d286c9ed6f64a9872352904d4d171a6bc1c7a96) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useContractRead` would perform an unnecessary rerender if another hook had `watch` enabled.

## 0.8.4

### Patch Changes

- [#1309](https://github.com/wagmi-dev/wagmi/pull/1309) [`1f4a4261`](https://github.com/wagmi-dev/wagmi/commit/1f4a4261247b1d3a90e3123157bc851a35d49b9c) Thanks [@tmm](https://github.com/tmm)! - Fixed internal type

- Updated dependencies [[`1f4a4261`](https://github.com/wagmi-dev/wagmi/commit/1f4a4261247b1d3a90e3123157bc851a35d49b9c)]:
  - @wagmi/core@0.7.4

## 0.8.3

### Patch Changes

- [#1294](https://github.com/wagmi-dev/wagmi/pull/1294) [`b2f88949`](https://github.com/wagmi-dev/wagmi/commit/b2f88949f32aabaf13f318472648cd51a8b7f2e7) Thanks [@tmm](https://github.com/tmm)! - Set `abi` return type value for `usePrepareContractWrite` as more permissive when not inferrable as `Abi`.

- Updated dependencies [[`b2f88949`](https://github.com/wagmi-dev/wagmi/commit/b2f88949f32aabaf13f318472648cd51a8b7f2e7)]:
  - @wagmi/core@0.7.3

## 0.8.2

### Patch Changes

- [`e9f806b6`](https://github.com/wagmi-dev/wagmi/commit/e9f806b652ba62effb3ddac464815e447fc287f6) Thanks [@tmm](https://github.com/tmm)! - Bumped abitype and zustand versions.

- [#1290](https://github.com/wagmi-dev/wagmi/pull/1290) [`88450052`](https://github.com/wagmi-dev/wagmi/commit/88450052b9f070fe53e18d84f72918c410b961f0) Thanks [@tmm](https://github.com/tmm)! - Fixed `useAccount`'s' `onConnect` callback `isReconnected` flag.

- Updated dependencies [[`e9f806b6`](https://github.com/wagmi-dev/wagmi/commit/e9f806b652ba62effb3ddac464815e447fc287f6)]:
  - @wagmi/core@0.7.2

## 0.8.1

### Patch Changes

- [#1272](https://github.com/wagmi-dev/wagmi/pull/1272) [`1f7fc41`](https://github.com/wagmi-dev/wagmi/commit/1f7fc419f7960bbdc51dfa85c2f33b89f1ecc1bf) Thanks [@tmm](https://github.com/tmm)! - Fixed ethers import path

- Updated dependencies [[`1f7fc41`](https://github.com/wagmi-dev/wagmi/commit/1f7fc419f7960bbdc51dfa85c2f33b89f1ecc1bf)]:
  - @wagmi/core@0.7.1

## 0.8.0

### Minor Changes

- [#1202](https://github.com/wagmi-dev/wagmi/pull/1202) [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Removed the following deprecated chains:

  - `ropsten`
  - `rinkeby`
  - `kovan`
  - `optimismKovan`
  - `arbitrumRinkeby`

  If you feel you still need to include one of these testnets in your application, you will have to define it manually:

  ```diff
  -import { rinkeby } from 'wagmi'
  +import { Chain } from 'wagmi'

  +export const rinkeby: Chain = {
  + id: 4,
  + name: 'Rinkeby',
  + network: 'rinkeby',
  + nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
  + rpcUrls: {
  +   alchemy: 'https://eth-rinkeby.alchemyapi.io/v2',
  +   default: 'https://rpc.ankr.com/eth_rinkeby',
  +   infura: 'https://rinkeby.infura.io/v3',
  +   public: 'https://rpc.ankr.com/eth_rinkeby',
  +  },
  + blockExplorers: {
  +   etherscan: 'https://rinkeby.etherscan.io',
  +   default: 'https://rinkeby.etherscan.io',
  + },
  + ens: {
  +   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  + },
  + multicall: {
  +   address: '0xca11bde05977b3631167028862be2a173976ca11',
  +   blockCreated: 10299530,
  + },
  + testnet: true,
  }
  ```

  You can reference these removed chains [here](https://github.com/wagmi-dev/wagmi/blob/389765f7d9af063ab0df07389a2bbfbc10a41060/packages/core/src/constants/chains.ts).

- [#1202](https://github.com/wagmi-dev/wagmi/pull/1202) [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Made `apiKey` required on `infuraProvider` and `alchemyProvider`.

  ```diff
  import { configureChains } from 'wagmi'

  const config = configureChains(defaultChains, [
  - alchemyProvider(),
  + alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY })
  ])
  ```

  You can find your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/), or your Infura API key from the [Infura Dashboard](https://infura.io/login).

- [#1202](https://github.com/wagmi-dev/wagmi/pull/1202) [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `addressOrName` renamed to `address` for `useBalance` and `useEnsAvatar`.

  ```diff
  const result = useBalance({
  - addressOrName: '0x…',
  + address: '0x…',
  })
  ```

  If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

  ```diff
  + const { data: address } = useEnsAddress({ name: 'example.eth' })
  const result = useBalance({
  - addressOrName: 'example.eth',
  + address,
  })
  ```

- [#1202](https://github.com/wagmi-dev/wagmi/pull/1202) [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - Removed CommonJS support

### Patch Changes

- Updated dependencies [[`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2), [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2), [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2), [`9bf56af`](https://github.com/wagmi-dev/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2)]:
  - @wagmi/core@0.7.0

## 0.7.15

### Patch Changes

- [#1262](https://github.com/wagmi-dev/wagmi/pull/1262) [`45e2ca4`](https://github.com/wagmi-dev/wagmi/commit/45e2ca4d1f33a7b1165c387d420b8d47f4f66935) Thanks [@tmm](https://github.com/tmm)! - Added default for `structuralSharing` for `useContractRead`, `useContractReads`, and `useContractInfiniteReads`.

## 0.7.14

### Patch Changes

- [#1260](https://github.com/wagmi-dev/wagmi/pull/1260) [`0e12f03`](https://github.com/wagmi-dev/wagmi/commit/0e12f0380442bccca9ed18991e783819778032fe) Thanks [@ilmpc](https://github.com/ilmpc)! - Deprecated `isDataEqual` option from and added `structuralSharing` option to `useContractRead`, `useContractReads`, and `useContractInfiniteReads`.

## 0.7.13

### Patch Changes

- [#1250](https://github.com/wagmi-dev/wagmi/pull/1250) [`ce2e0f4`](https://github.com/wagmi-dev/wagmi/commit/ce2e0f4a46b8fd1c509ead552012ef4c072a525b) Thanks [@tmm](https://github.com/tmm)! - Added support for Trust Wallet browser extension.

- Updated dependencies [[`ce2e0f4`](https://github.com/wagmi-dev/wagmi/commit/ce2e0f4a46b8fd1c509ead552012ef4c072a525b)]:
  - @wagmi/core@0.6.12

## 0.7.12

### Patch Changes

- [#1234](https://github.com/wagmi-dev/wagmi/pull/1234) [`3ff9303`](https://github.com/wagmi-dev/wagmi/commit/3ff930349250f62137cca4ca3b382522882abf8a) Thanks [@tmm](https://github.com/tmm)! - Fixed issue with adding chain to wallet without block explorer URL.

- Updated dependencies [[`3ff9303`](https://github.com/wagmi-dev/wagmi/commit/3ff930349250f62137cca4ca3b382522882abf8a)]:
  - @wagmi/core@0.6.11

## 0.7.11

### Patch Changes

- [#1232](https://github.com/wagmi-dev/wagmi/pull/1232) [`c0ca509`](https://github.com/wagmi-dev/wagmi/commit/c0ca509506dcf6d98b058df549dc761c9a5f3d1c) Thanks [@tmm](https://github.com/tmm)! - Added validation to check that chain is configured for connector when accessing `Signer`.

- Updated dependencies [[`c0ca509`](https://github.com/wagmi-dev/wagmi/commit/c0ca509506dcf6d98b058df549dc761c9a5f3d1c)]:
  - @wagmi/core@0.6.10

## 0.7.10

### Patch Changes

- [#1206](https://github.com/wagmi-dev/wagmi/pull/1206) [`15ff089`](https://github.com/wagmi-dev/wagmi/commit/15ff0896216abecf5967294ae5aeb26ea7fb480b) Thanks [@jxom](https://github.com/jxom)! - Added `scopeKey` as a configuration option to the Hooks which scope its cache to a given context. Hooks that have identical scope will share the same cache.

- [#1207](https://github.com/wagmi-dev/wagmi/pull/1207) [`c73d463`](https://github.com/wagmi-dev/wagmi/commit/c73d463d65c9dbfcfe709187e47323a769589741) Thanks [@lvshaoping007](https://github.com/lvshaoping007)! - Added Kucoin wallet support to `InjectedConnector`

- Updated dependencies [[`c73d463`](https://github.com/wagmi-dev/wagmi/commit/c73d463d65c9dbfcfe709187e47323a769589741)]:
  - @wagmi/core@0.6.9

## 0.7.9

### Patch Changes

- [#1201](https://github.com/wagmi-dev/wagmi/pull/1201) [`9a07efa`](https://github.com/wagmi-dev/wagmi/commit/9a07efaa397d3ba03f2edbe527c359f21e22139a) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where non-checksum addresses did not resolve with an ENS name

- [#1132](https://github.com/wagmi-dev/wagmi/pull/1132) [`d41c0d6`](https://github.com/wagmi-dev/wagmi/commit/d41c0d650f8c0e54145758685b7604b8909d7ae0) Thanks [@toniocodo](https://github.com/toniocodo)! - Added ERC-4626 ABI

- Updated dependencies [[`d41c0d6`](https://github.com/wagmi-dev/wagmi/commit/d41c0d650f8c0e54145758685b7604b8909d7ae0), [`9a07efa`](https://github.com/wagmi-dev/wagmi/commit/9a07efaa397d3ba03f2edbe527c359f21e22139a)]:
  - @wagmi/core@0.6.8

## 0.7.8

### Patch Changes

- [#1174](https://github.com/wagmi-dev/wagmi/pull/1174) [`196a458`](https://github.com/wagmi-dev/wagmi/commit/196a458f64141e8a9f39c1b1e1af5937f692cb39) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `client.chains` (active connector chains) would be populated when there is no active connector (disconnected user).

- [#1176](https://github.com/wagmi-dev/wagmi/pull/1176) [`389765f`](https://github.com/wagmi-dev/wagmi/commit/389765f7d9af063ab0df07389a2bbfbc10a41060) Thanks [@jxom](https://github.com/jxom)! - Migrate away from Alchemy RPC URLs in the public RPC URL list

- Updated dependencies [[`196a458`](https://github.com/wagmi-dev/wagmi/commit/196a458f64141e8a9f39c1b1e1af5937f692cb39), [`389765f`](https://github.com/wagmi-dev/wagmi/commit/389765f7d9af063ab0df07389a2bbfbc10a41060)]:
  - @wagmi/core@0.6.7

## 0.7.7

### Patch Changes

- [#1166](https://github.com/wagmi-dev/wagmi/pull/1166) [`6fbe910`](https://github.com/wagmi-dev/wagmi/commit/6fbe91080b54e33e8543e9638ff5089e749ada3f) Thanks [@jxom](https://github.com/jxom)! - Export the React entrypoint `Client` type instead of `@wagmi/core`'s `Client`.

- [`81ce9e6`](https://github.com/wagmi-dev/wagmi/commit/81ce9e64d85f7d01370324c1a529988a0919894f) Thanks [@jxom](https://github.com/jxom)! - Add `isPortal` to injected MetaMask flags.

- [`c2c0109`](https://github.com/wagmi-dev/wagmi/commit/c2c01096ef4cd0ffadbb49062969c208604c6194) Thanks [@jxom](https://github.com/jxom)! - Add etherscan block explorer to Optimism Goerli

- Updated dependencies [[`81ce9e6`](https://github.com/wagmi-dev/wagmi/commit/81ce9e64d85f7d01370324c1a529988a0919894f), [`c2c0109`](https://github.com/wagmi-dev/wagmi/commit/c2c01096ef4cd0ffadbb49062969c208604c6194)]:
  - @wagmi/core@0.6.6

## 0.7.6

### Patch Changes

- [#1162](https://github.com/wagmi-dev/wagmi/pull/1162) [`30335b3`](https://github.com/wagmi-dev/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where non-indexed event parameter types were set to `null`.

- [#1162](https://github.com/wagmi-dev/wagmi/pull/1162) [`30335b3`](https://github.com/wagmi-dev/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where `useContractReads` and `useContractInfiniteReads` types were slowing down TypeScript compiler.

- Updated dependencies [[`30335b3`](https://github.com/wagmi-dev/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e), [`30335b3`](https://github.com/wagmi-dev/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e)]:
  - @wagmi/core@0.6.5

## 0.7.5

### Patch Changes

- [#1103](https://github.com/wagmi-dev/wagmi/pull/1103) [`651eda0`](https://github.com/wagmi-dev/wagmi/commit/651eda06384bd0955268427f898e9337b2dc5a31) Thanks [@tmm](https://github.com/tmm)! - Bumped `abitype` dependency.

- Updated dependencies [[`651eda0`](https://github.com/wagmi-dev/wagmi/commit/651eda06384bd0955268427f898e9337b2dc5a31)]:
  - @wagmi/core@0.6.4

## 0.7.4

### Patch Changes

- [#1099](https://github.com/wagmi-dev/wagmi/pull/1099) [`748e617`](https://github.com/wagmi-dev/wagmi/commit/748e61719ad706acae057be903321ebe0c2e817e) Thanks [@jxom](https://github.com/jxom)! - Added `isFetchedAfterMount` to the return value of hooks.

  The `isFetchedAfterMount` will be truthy if the hook has fetched after the component has been mounted. This value can be utilized to not show the result if it has previously been cached.

- [#1091](https://github.com/wagmi-dev/wagmi/pull/1091) [`a3aaf59`](https://github.com/wagmi-dev/wagmi/commit/a3aaf590e8e993017baa9a1ac50ecd63dd287caf) Thanks [@tmm](https://github.com/tmm)! - Fixed `useAccount` `onConnect`/`onDisconnect` from not firing when the account was already connected/disconnected.

## 0.7.3

### Patch Changes

- [#1086](https://github.com/wagmi-dev/wagmi/pull/1086) [`4e28d2a`](https://github.com/wagmi-dev/wagmi/commit/4e28d2ad4c2e6b3479b728563040b9529463cbcf) Thanks [@tmm](https://github.com/tmm)! - Exposed module types.

- Updated dependencies [[`4e28d2a`](https://github.com/wagmi-dev/wagmi/commit/4e28d2ad4c2e6b3479b728563040b9529463cbcf)]:
  - @wagmi/core@0.6.3

## 0.7.2

### Patch Changes

- [#1080](https://github.com/wagmi-dev/wagmi/pull/1080) [`3be5e8b`](https://github.com/wagmi-dev/wagmi/commit/3be5e8b01e58ed40cc9dab7ef9533c0197cb74d0) Thanks [@tmm](https://github.com/tmm)! - Added `abitype` to `dependencies` so types ship correctly.

- Updated dependencies [[`3be5e8b`](https://github.com/wagmi-dev/wagmi/commit/3be5e8b01e58ed40cc9dab7ef9533c0197cb74d0)]:
  - @wagmi/core@0.6.2

## 0.7.1

### Patch Changes

- [#1074](https://github.com/wagmi-dev/wagmi/pull/1074) [`8db807f`](https://github.com/wagmi-dev/wagmi/commit/8db807f16149aa278c2a7db9ee5245431db12173) Thanks [@IljaDaderko](https://github.com/IljaDaderko)! - Exported `EventListener` type

- Updated dependencies [[`8db807f`](https://github.com/wagmi-dev/wagmi/commit/8db807f16149aa278c2a7db9ee5245431db12173)]:
  - @wagmi/core@0.6.1

## 0.7.0

### Minor Changes

- [#940](https://github.com/wagmi-dev/wagmi/pull/940) [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `usePrepareContractWrite` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

  If you wish to defer this check until the click handler is pressed, you can place `chainId` in `useContractWrite` instead:

  ```diff
  import { usePrepareContractWrite, useContractWrite } from 'wagmi'
  import { optimism } from 'wagmi/chains'

  // ...

  const { config } = usePrepareContractWrite({
    addressOrName: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    contractInterface: ['function mint()'],
    functionName: 'mint',
  })
  const { write } = useContractWrite({
    ...config,
  + chainId: optimism.id
  })

  ```

- [#940](https://github.com/wagmi-dev/wagmi/pull/940) [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `usePrepareSendTransaction` hook will now only run when the end-user is connected to their wallet.

  This is to reach parity with `usePrepareContractWrite`.

  If the end-user is not connected, then the `usePrepareSendTransaction` hook will remain idle.

- [#940](https://github.com/wagmi-dev/wagmi/pull/940) [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `usePrepareSendTransaction` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

  If you wish to defer this check until the click handler is pressed, you can place `chainId` in `useContractWrite` instead:

  ```diff
  import { usePrepareSendTransaction, useContractWrite } from 'wagmi'
  import { optimism } from 'wagmi/chains'

  // ...

  const { config } = usePrepareSendTransaction({
    request: {
      to: 'moxey.eth',
      value: parseEther('1'),
    },
  })
  const { sendTransaction } = useSendTransaction({
    ...config,
  + chainId: optimism.id
  })

  ```

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `useContractEvent` no longer accepts a `signerOrProvider` configuration option.

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `addressOrName` and `contractInterface` renamed to `address` and `abi` respectively for contract hooks: `useContract`, `useContractEvent`, `useContractRead`, `useContractReads`, `useContractInfiniteReads`, `useContractWrite`, `usePrepareContractWrite`.

  ```diff
  import { useContractRead } from 'wagmi'

  const result = useContractRead({
  - addressOrName: '0x…',
  + address: '0x…',
  - contractInterface: […] as const,
  + abi: […] as const,
    functionName: 'balanceOf',
    args: ['0x…'],
  })
  ```

  If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

  ```diff
  - import { useContractRead } from 'wagmi'
  + import { useContractRead, useEnsAddress } from 'wagmi'

  + const { data: address} = useEnsAddress({ name: 'example.eth'})
  const result = useContractRead({
  - addressOrName: 'example.eth',
  + address,
    abi: […],
    functionName: 'balanceOf',
    args: ['0x…'],
  })
  ```

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Updated TypeScript generics for contract and typed data hooks.

  Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `abi` allows TypeScript to infer `functionName`, `args`, `overrides`, and return types for functions, and `eventName` and `listener` types for events.

  ```diff
  import { useContractRead } from 'wagmi'

  const result = useContractRead({
    address: '0x…',
  - abi: […],
  + abi: […] as const,
    functionName: 'balanceOf', // will autocomplete and catch typos
    args: ['0x…'], // inferred based on `abi`, `functionName`, `args`
  })
  result.data // inferred based on `functionName`
  ```

  This works for the following actions: `useContractRead`, `useContractWrite`, `usePrepareContractWrite`, `useContractReads`, `useContractInfiniteReads`, and `useContractEvent`.

  Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `useSignTypedData`'s config option, `types`, allows TypeScript to infer `value`.

  ```diff
  import { useSignTypedData } from 'wagmi'

  const result = useSignTypedData({
    domain: {
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    types: {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
  - },
  + } as const,
    value: { // `value` is inferred based on `types`
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
  })
  ```

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Updated TypeScript version to `typescript@>=4.7.4`.

  `@wagmi/core` can now infer types based on [ABI](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, giving you full end-to-end type-safety from your contracts to your frontend and incredible developer experience (e.g. autocomplete contract function names and catch misspellings, type contract function arguments, etc.).

  For this to work, you must upgrade to `typescript@>=4.7.4`. Why is TypeScript v4.7.4 or greater necessary? TypeScript 4.7.4 introduced the ability to [extend constraints on inferred type variables](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#extends-constraints-on-infer-type-variables), which is used extensively to help narrow types for ABIs. Good news! When upgrading TypeScript from 4.6 to 4.7 there are likely no [breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#breaking-changes) for your set up.

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Updated `paginatedIndexesConfig` `fn` parameter return type. `fn` now returns an array instead of a single object.

  ```diff
  import { BigNumber } from 'ethers'
  import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

  useContractInfiniteReads({
    cacheKey: 'contracts',
    ...paginatedIndexesConfig(
  -    (index) => ({
  +    (index) => [{
        ...mlootContractConfig,
        functionName: 'tokenURI',
        args: [BigNumber.from(index)] as const,
  -    }),
  +    }],
      { start: 0, perPage: 10, direction: 'increment' },
    ),
  })
  ```

- [#941](https://github.com/wagmi-dev/wagmi/pull/941) [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `args` config option must now be an array for the following hooks: `useContractRead`, `useContractWrite`, `usePrepareContractWrite`, `useContractReads`, and `useContractInfiniteReads`.

  ```diff
  import { useContractRead } from 'wagmi'

  const { data } = useContractRead({
    address: '0x…',
    abi: […],
    functionName: 'balanceOf',
  - args: '0x…',
  + args: ['0x…'],
  })
  ```

### Patch Changes

- [#940](https://github.com/wagmi-dev/wagmi/pull/940) [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - The `useSigner` hook now accepts an optional `chainId` to use for signer initialization as an argument.

  ```tsx
  import { useSigner } from 'wagmi'
  import { optimism } from 'wagmi/core'

  // ...

  useSigner({ chainId: optimism.id })
  ```

- [#1061](https://github.com/wagmi-dev/wagmi/pull/1061) [`a4ffe8b`](https://github.com/wagmi-dev/wagmi/commit/a4ffe8b25516d5504685ae94579da4cd8c409329) Thanks [@alecananian](https://github.com/alecananian)! - Added Arbitrum Goerli Arbiscan block explorer

- [#1050](https://github.com/wagmi-dev/wagmi/pull/1050) [`73d4d47`](https://github.com/wagmi-dev/wagmi/commit/73d4d47bc679f4f9a1cf46010fe2bf858c9d0b5c) Thanks [@jxom](https://github.com/jxom)! - update dependencies

  - `@coinbase/wallet-sdk@3.5.3`
  - `@tanstack/query-sync-storage-persister@4.10.1`
  - `@tanstack/react-query@4.10.1`
  - `@tanstack/react-query-persist-client@4.10.1`
  - `@walletconnect/ethereum-provider@1.8.0`

- [#1048](https://github.com/wagmi-dev/wagmi/pull/1048) [`ed13074`](https://github.com/wagmi-dev/wagmi/commit/ed130747c0f28c1d9980a1328883e4000a60455e) Thanks [@Max-3-7](https://github.com/Max-3-7)! - Added support for Avalanche core wallet

- [#1046](https://github.com/wagmi-dev/wagmi/pull/1046) [`ab9ecaa`](https://github.com/wagmi-dev/wagmi/commit/ab9ecaa74dfa4324279e167dd7e348319ef7d35d) Thanks [@jxom](https://github.com/jxom)! - make ethers block format validator compatible with Celo

- Updated dependencies [[`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663), [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663), [`a4ffe8b`](https://github.com/wagmi-dev/wagmi/commit/a4ffe8b25516d5504685ae94579da4cd8c409329), [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663), [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c), [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663), [`ed13074`](https://github.com/wagmi-dev/wagmi/commit/ed130747c0f28c1d9980a1328883e4000a60455e), [`b6cb8f4`](https://github.com/wagmi-dev/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663), [`ab9ecaa`](https://github.com/wagmi-dev/wagmi/commit/ab9ecaa74dfa4324279e167dd7e348319ef7d35d), [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c), [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c), [`73d4d47`](https://github.com/wagmi-dev/wagmi/commit/73d4d47bc679f4f9a1cf46010fe2bf858c9d0b5c), [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c), [`0c96009`](https://github.com/wagmi-dev/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c)]:
  - @wagmi/core@0.6.0

## 0.6.8

### Patch Changes

- [`0b77286b`](https://github.com/wagmi-dev/wagmi/commit/0b77286b89cb8603426cf5081872416c291a6531) Thanks [@jxom](https://github.com/jxom)! - Isolate wagmi's React Query `queryClient` instance.

* [`8cb07462`](https://github.com/wagmi-dev/wagmi/commit/8cb07462acc3c5637398d11d2451f8b8e330d553) Thanks [@jxom](https://github.com/jxom)! - Added `chainId` as an argument to `watchBlockNumber`.

- [`53c1a474`](https://github.com/wagmi-dev/wagmi/commit/53c1a4747d03b685e8cfbf55361fc2a56777fb06) Thanks [@tmm](https://github.com/tmm)! - Added missing `decimals` option to `Connector` `watchAsset`

* [`4d74dd4f`](https://github.com/wagmi-dev/wagmi/commit/4d74dd4ff827ba5c43c3546a218f38cee45ea76a) Thanks [@jxom](https://github.com/jxom)! - Support ERC20 contracts that represent strings as bytes32

* Updated dependencies [[`8cb07462`](https://github.com/wagmi-dev/wagmi/commit/8cb07462acc3c5637398d11d2451f8b8e330d553), [`53c1a474`](https://github.com/wagmi-dev/wagmi/commit/53c1a4747d03b685e8cfbf55361fc2a56777fb06), [`4d74dd4f`](https://github.com/wagmi-dev/wagmi/commit/4d74dd4ff827ba5c43c3546a218f38cee45ea76a)]:
  - @wagmi/core@0.5.8

## 0.6.7

### Patch Changes

- [`aa51bc4d`](https://github.com/wagmi-dev/wagmi/commit/aa51bc4dc5683bf0178597d2fdb8f2e9d82e7970) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue in `CoinbaseWalletConnector` where the browser extension would unintendedly reset the network when the browser is refreshed.

* [#955](https://github.com/wagmi-dev/wagmi/pull/955) [`e326cd80`](https://github.com/wagmi-dev/wagmi/commit/e326cd80fe65267db623eb6c80ccdd75572914cf) Thanks [@0xFlicker](https://github.com/0xFlicker)! - Added Infura RPC URL for Sepolia

- [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useProvider` & `getProvider` were not returning referentially equal providers.

* [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where the `watch` option was not respecting the neighboring `chainId` option in `useBlockNumber`.

- [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where block listeners (via `watch`) were firing excessively on L2 chains.

- Updated dependencies [[`aa51bc4d`](https://github.com/wagmi-dev/wagmi/commit/aa51bc4dc5683bf0178597d2fdb8f2e9d82e7970), [`e326cd80`](https://github.com/wagmi-dev/wagmi/commit/e326cd80fe65267db623eb6c80ccdd75572914cf), [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69), [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69), [`cec14089`](https://github.com/wagmi-dev/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69)]:
  - @wagmi/core@0.5.7

## 0.6.6

### Patch Changes

- [#936](https://github.com/wagmi-dev/wagmi/pull/936) [`3329d1f`](https://github.com/wagmi-dev/wagmi/commit/3329d1f5880431566e14ac1640f48d0975aec4c2) Thanks [@jxom](https://github.com/jxom)! - Added the ability to provide a custom logger to override how logs are broadcasted to the consumer in wagmi.

  A custom logger can be provided to the wagmi client via `logger`.

  ### API

  ```tsx
  logger?: {
    warn: typeof console.warn | null
  }
  ```

  ### Examples

  **Passing in a custom logger**

  You can pass in a function to define your own custom logger.

  ```diff
  + import { logWarn } from './logger';

  const client = createClient({
    ...
  + logger: {
  +   warn: message => logWarn(message)
  + }
    ...
  })
  ```

  **Disabling a logger**

  You can disable a logger by passing `null` as the value.

  ```diff
  const client = createClient({
    ...
  + logger: {
  +   warn: null
  + }
    ...
  })
  ```

* [#889](https://github.com/wagmi-dev/wagmi/pull/889) [`27788ed`](https://github.com/wagmi-dev/wagmi/commit/27788ed989b5dc26849c7945fb91a92e56766018) Thanks [@jxom](https://github.com/jxom)! - Make multicall & readContracts more error robust

* Updated dependencies [[`3329d1f`](https://github.com/wagmi-dev/wagmi/commit/3329d1f5880431566e14ac1640f48d0975aec4c2), [`27788ed`](https://github.com/wagmi-dev/wagmi/commit/27788ed989b5dc26849c7945fb91a92e56766018)]:
  - @wagmi/core@0.5.6

## 0.6.5

### Patch Changes

- [#912](https://github.com/wagmi-dev/wagmi/pull/912) [`e529e12`](https://github.com/wagmi-dev/wagmi/commit/e529e125c713ed3ef24a59c6bf226fe4deee7ac9) Thanks [@zouhangwithsweet](https://github.com/zouhangwithsweet)! - Added BitKeep to injected flags

- [#912](https://github.com/wagmi-dev/wagmi/pull/910) Thanks [@mytangying](https://github.com/zouhangwithsweet)! - Added MathWallet to injected flags

- [#904](https://github.com/wagmi-dev/wagmi/pull/904) [`c231058`](https://github.com/wagmi-dev/wagmi/commit/c23105850f335f8798031e14c7098b7dee8c2975) Thanks [@jxom](https://github.com/jxom)! - Removed `contractInterface` & `signer` from persisted query keys.

- Updated dependencies [[`e529e12`](https://github.com/wagmi-dev/wagmi/commit/e529e125c713ed3ef24a59c6bf226fe4deee7ac9), [`c231058`](https://github.com/wagmi-dev/wagmi/commit/c23105850f335f8798031e14c7098b7dee8c2975)]:
  - @wagmi/core@0.5.5

## 0.6.4

### Patch Changes

- [#852](https://github.com/wagmi-dev/wagmi/pull/852) [`c3192d0`](https://github.com/wagmi-dev/wagmi/commit/c3192d0663aa332ae9edfd9dd49b333454013ab7) Thanks [@skeithc](https://github.com/skeithc)! - Added support for the Sepolia testnet

- Updated dependencies [[`c3192d0`](https://github.com/wagmi-dev/wagmi/commit/c3192d0663aa332ae9edfd9dd49b333454013ab7)]:
  - @wagmi/core@0.5.4

## 0.6.3

### Patch Changes

- [#835](https://github.com/wagmi-dev/wagmi/pull/835) [`1b85e54`](https://github.com/wagmi-dev/wagmi/commit/1b85e54ae654e2564cf5bc2dae6411fe0a25875c) Thanks [@jxom](https://github.com/jxom)! - Update `@coinbase/wallet-sdk` to `3.4.1`

* [#843](https://github.com/wagmi-dev/wagmi/pull/843) [`e77dee6`](https://github.com/wagmi-dev/wagmi/commit/e77dee6a606b8aac4279569c54cec8902476fee9) Thanks [@tmm](https://github.com/tmm)! - Fix `MockConnector` entrypoint path

- [#834](https://github.com/wagmi-dev/wagmi/pull/834) [`9655879`](https://github.com/wagmi-dev/wagmi/commit/96558793b0319df47aefafa6b7b9c959068d491b) Thanks [@jxom](https://github.com/jxom)! - Update zustand to `4.0.0`

* [#833](https://github.com/wagmi-dev/wagmi/pull/833) [`3ae6d0f`](https://github.com/wagmi-dev/wagmi/commit/3ae6d0f5e2d65432024272b43afe68a8f63bb7ea) Thanks [@jxom](https://github.com/jxom)! - Updated `react-query@4.0.0-beta.23` to `@tanstack/react-query@^4.0.10`

* Updated dependencies [[`1b85e54`](https://github.com/wagmi-dev/wagmi/commit/1b85e54ae654e2564cf5bc2dae6411fe0a25875c), [`9655879`](https://github.com/wagmi-dev/wagmi/commit/96558793b0319df47aefafa6b7b9c959068d491b)]:
  - @wagmi/core@0.5.3

## 0.6.2

### Patch Changes

- [#823](https://github.com/wagmi-dev/wagmi/pull/823) [`10b8b78`](https://github.com/wagmi-dev/wagmi/commit/10b8b78605b7246b2c55b8d69f96663906e5cd20) Thanks [@tmm](https://github.com/tmm)! - Add Optimism Goerli to `chain` lookup.

- Updated dependencies [[`10b8b78`](https://github.com/wagmi-dev/wagmi/commit/10b8b78605b7246b2c55b8d69f96663906e5cd20)]:
  - @wagmi/core@0.5.2

## 0.6.1

### Patch Changes

- [#767](https://github.com/wagmi-dev/wagmi/pull/767) [`e9392f3`](https://github.com/wagmi-dev/wagmi/commit/e9392f396e48e928bd9d2522e3ad671c589f08cb) Thanks [@klyap](https://github.com/klyap)! - Add Optimism Goerli chain ahead of [Kovan deprecation](https://dev.optimism.io/kovan-to-goerli).

* [#817](https://github.com/wagmi-dev/wagmi/pull/817) [`7e5cac7`](https://github.com/wagmi-dev/wagmi/commit/7e5cac75815dcd8aa563462342a4853fc5207735) Thanks [@alecananian](https://github.com/alecananian)! - Added custom name mapping for 1inch Wallet injected provider

- [#806](https://github.com/wagmi-dev/wagmi/pull/806) [`0b34e56`](https://github.com/wagmi-dev/wagmi/commit/0b34e56db97e6dcdb71088e0149b2d55ebc604a5) Thanks [@vmichalik](https://github.com/vmichalik)! - Fix canonical testnet native asset symbols by changing them to ETH

* [#778](https://github.com/wagmi-dev/wagmi/pull/778) [`0892908`](https://github.com/wagmi-dev/wagmi/commit/08929084eeeba1a3a55aa098fa9d92a243685ad5) Thanks [@0xcadams](https://github.com/0xcadams)! - Add Arbitrum Goerli chain.

* Updated dependencies [[`e9392f3`](https://github.com/wagmi-dev/wagmi/commit/e9392f396e48e928bd9d2522e3ad671c589f08cb), [`7e5cac7`](https://github.com/wagmi-dev/wagmi/commit/7e5cac75815dcd8aa563462342a4853fc5207735), [`0b34e56`](https://github.com/wagmi-dev/wagmi/commit/0b34e56db97e6dcdb71088e0149b2d55ebc604a5), [`0892908`](https://github.com/wagmi-dev/wagmi/commit/08929084eeeba1a3a55aa098fa9d92a243685ad5)]:
  - @wagmi/core@0.5.1

## 0.6.0

### Minor Changes

- [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** The `useSendTransaction` hook's `data` now returns an object only consisting of `hash` & `wait`, and not the full [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

  If you require the full `TransactionResponse`, you can use `useTransaction`:

  ```diff
  import { useSendTransaction, useTransaction } from 'wagmi'

  const {
    data: {
      hash,
      wait,
  -   ...transaction
    }
  } = useSendTransaction(...)

  +const { data: transaction } = useTransaction({ hash })
  ```

  > Why? The old implementation of `useSendTransaction` created a long-running async task, causing [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks) when invoked in a click handler.

* [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The configuration passed to the `useSendTransaction` hook now needs to be either:

  - prepared with the `usePrepareSendTransaction` hook **(new)**, or
  - recklessly unprepared **(previous functionality)**

  > Why? [Read here](https://wagmi.sh/docs/prepare-hooks/intro)

  ### Prepared usage

  ```diff
  import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'

  +const { config } = usePrepareSendTransaction({
  +  request: {
  +    to: 'moxey.eth',
  +    value: parseEther('1'),
  +  }
  +})

  const { data } = useSendTransaction({
  - request: {
  -   to: 'moxey.eth',
  -   value: parseEther('1')
  - }
  + ...config
  })
  ```

  ### Recklessly unprepared usage

  If you are not ready to upgrade to `usePrepareSendTransaction`, it is possible to use `useSendTransaction` without preparing the configuration first by passing `mode: 'recklesslyUnprepared'`.

  ```diff
  import { useSendTransaction } from 'wagmi'

  const { data } = useSendTransaction({
  + mode: 'recklesslyUnprepared',
    request: {
      to: 'moxey.eth',
      value: parseEther('1'),
    }
  })
  ```

- [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: If a `chainId` is passed to `useContractWrite` or `useSendTransaction`, it will no longer attempt to switch chain before sending the transaction. Instead, it will throw an error if the user is on the wrong chain.

  > Why? Eagerly prompting to switch chain in these actions created a long-running async task that that makes [iOS App Links](https://wagmi.sh/docs/prepare-hooks/intro#ios-app-link-constraints) vulnerable.

* [#760](https://github.com/wagmi-dev/wagmi/pull/760) [`d8af6bf`](https://github.com/wagmi-dev/wagmi/commit/d8af6bf50885aec110ae4d64716642453aa27896) Thanks [@tmm](https://github.com/tmm)! - **Breaking:** `alchemyProvider` and `infuraProvider` now use a generic `apiKey` configuration option instead of `alchemyId` and `infuraId`.

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

- [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - Added the `usePrepareContractWrite` hook that eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.

  It returns config to be passed through to `useContractWrite`.

  ```ts
  const { config } = usePrepareContractWrite({
    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    contractInterface: wagmigotchiABI,
    functionName: 'feed',
  })
  const { write } = useContractWrite(config)
  ```

* [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** When `useSendTransaction` is in "prepare mode" (used with `usePrepareSendTransaction`), `sendTransaction`/`sendTransactionAsync` will be `undefined` until the configuration has been prepared. Ensure that your usage reflects this.

  ```tsx
  const { config } = usePrepareSendTransaction({ ... })
  const { sendTransaction } = useSendTransaction(config)

  <button
    disabled={!sendTransaction}
    onClick={() => sendTransaction?.()}
  >
    Send
  </button>
  ```

- [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - Added the `usePrepareSendTransaction` hook that eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).

  It returns config to be passed through to `useSendTransaction`.

  ```ts
  import { usePrepareSendTransaction, useSendTransaction } from '@wagmi/core'

  const { config } = usePrepareSendTransaction({
    request: {
      to: 'moxey.eth',
      value: parseEther('1'),
    },
  })
  const { sendTransaction } = useSendTransaction(config)
  ```

* [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** The `sendTransaction`/`sendTransactionAsync` configuration object has now been altered to only accept "reckless" configuration. If one or more of these values are set, it can lead to [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).

  ```diff
  <button
    onClick={() => {
      sendTransaction({
  -     request: {
  +     recklesslySetUnpreparedRequest:
          to: 'moxey.eth',
          value: parseEther('1')
        }
      })
    }}
  >
    Send
  </button>
  ```

- [#727](https://github.com/wagmi-dev/wagmi/pull/727) [`ac3b9b8`](https://github.com/wagmi-dev/wagmi/commit/ac3b9b87f80cb45b65d003f09d916d7d1427a62e) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Moved the `pollingInterval` config option from the chain provider config to `configureChains` config.

  ```diff
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
    [
  -   alchemyProvider({ apiKey, pollingInterval: 5000 }),
  -   publicProvider({ pollingInterval: 5000 })
  +   alchemyProvider({ apiKey }),
  +   publicProvider()
    ],
  + { pollingInterval: 5000 }
  )
  ```

* [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** When `useContractWrite` is in "prepare mode" (used with `usePrepareContractWrite`), `write`/`writeAsync` will be `undefined` until the configuration has been prepared. Ensure that your usage reflects this.

  ```tsx
  const { config } = usePrepareContractWrite({ ... })
  const { write } = useContractWrite(config)

  <button
    disabled={!write}
    onClick={() => write?.()}
  >
    Send
  </button>
  ```

- [#658](https://github.com/wagmi-dev/wagmi/pull/658) [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The configuration passed to the `useContractWrite` hook now needs to be either:

  - prepared with the `usePrepareContractWrite` hook **(new)**, or
  - recklessly unprepared **(previous functionality)**

  > Why? [Read here](https://wagmi.sh/docs/prepare-hooks/intro)

  ### Prepared usage

  ```diff
  import { usePrepareContractWrite, useContractWrite } from 'wagmi'

  +const { config } = usePrepareContractWrite({
  + addressOrName: '0x...',
  + contractInterface: wagmiAbi,
  + functionName: 'mint',
  + args: [tokenId]
  +})

  const { data } = useContractWrite({
  - addressOrName: '0x...',
  - contractInterface: wagmiAbi,
  - functionName: 'mint',
  - args: [tokenId],
  + ...config
  })
  ```

  ### Recklessly unprepared usage

  If you are not ready to upgrade to `usePrepareContractWrite`, it is possible to use `useContractWrite` without preparing the configuration first by passing `mode: 'recklesslyUnprepared'`.

  ```diff
  import { useContractWrite } from 'wagmi'

  const { data } = useContractWrite({
  + mode: 'recklesslyUnprepared',
    addressOrName: '0x...',
    contractInterface: wagmiAbi,
    functionName: 'mint',
    args: [tokenId],
  })
  ```

### Patch Changes

- [#733](https://github.com/wagmi-dev/wagmi/pull/733) [`6232487`](https://github.com/wagmi-dev/wagmi/commit/623248703bc728d539e28bf8a89b8ab22f0a5703) Thanks [@tmm](https://github.com/tmm)! - Add mock connector entrypoint

* [#762](https://github.com/wagmi-dev/wagmi/pull/762) [`ccaeed5`](https://github.com/wagmi-dev/wagmi/commit/ccaeed53d731f51879e0cdd5648797a32f7d7a31) Thanks [@jxom](https://github.com/jxom)! - Fix `useContractRead` return value unexpectedly returning null for falsy values

- [#734](https://github.com/wagmi-dev/wagmi/pull/734) [`7c2fa04`](https://github.com/wagmi-dev/wagmi/commit/7c2fa04e9b695840d6fa088e1f8d069f3c916551) Thanks [@jxom](https://github.com/jxom)! - Fix issue where `useProvider` & `useWebSocketProvider` would not update when `chainId` config changes

* [#739](https://github.com/wagmi-dev/wagmi/pull/739) [`c2295a5`](https://github.com/wagmi-dev/wagmi/commit/c2295a56cc86d02cc6602e2b4557b8ab9a091a3f) Thanks [@tmm](https://github.com/tmm)! - Fix balance formatting for tokens that do not have 18 decimals.

- [#759](https://github.com/wagmi-dev/wagmi/pull/759) [`959953d`](https://github.com/wagmi-dev/wagmi/commit/959953d1f5b3e8189bac56de245c62333470d18e) Thanks [@tmm](https://github.com/tmm)! - Added `useTransaction` hook:

  ```ts
  import { useTransaction } from 'wagmi'

  const result = useTransaction({
    hash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
  })
  ```

- Updated dependencies [[`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`d8af6bf`](https://github.com/wagmi-dev/wagmi/commit/d8af6bf50885aec110ae4d64716642453aa27896), [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`c2295a5`](https://github.com/wagmi-dev/wagmi/commit/c2295a56cc86d02cc6602e2b4557b8ab9a091a3f), [`ac3b9b8`](https://github.com/wagmi-dev/wagmi/commit/ac3b9b87f80cb45b65d003f09d916d7d1427a62e), [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`d70c115`](https://github.com/wagmi-dev/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432), [`959953d`](https://github.com/wagmi-dev/wagmi/commit/959953d1f5b3e8189bac56de245c62333470d18e)]:
  - @wagmi/core@0.5.0

## 0.5.11

### Patch Changes

- [`4c7d123`](https://github.com/wagmi-dev/wagmi/commit/4c7d123c8e74f93e770096857eb8c40ce0a47681) Thanks [@jxom](https://github.com/jxom)! - Fix issue where `useProvider` & `useWebSocketProvider` would not update when `chainId` config changes

## 0.5.10

### Patch Changes

- [#713](https://github.com/tmm/wagmi/pull/713) [`08b0113`](https://github.com/tmm/wagmi/commit/08b0113bef9f32dceab2ecd823b1ee00f9bdc45d) Thanks [@jxom](https://github.com/jxom)! - Fix an issue where the `useContractRead` query function could return `undefined` instead of a serializable `null`.

* [#725](https://github.com/tmm/wagmi/pull/725) [`b976920`](https://github.com/tmm/wagmi/commit/b97692051d778d7e112872663832c97963a8029a) Thanks [@tmm](https://github.com/tmm)! - Lock `react-query` version

- [#721](https://github.com/tmm/wagmi/pull/721) [`abea25f`](https://github.com/tmm/wagmi/commit/abea25fd15d81d1ecaec9d3fbd687042ab29b1e6) Thanks [@tmm](https://github.com/tmm)! - Add `name` to `useToken` `data` value.

- Updated dependencies [[`abea25f`](https://github.com/tmm/wagmi/commit/abea25fd15d81d1ecaec9d3fbd687042ab29b1e6), [`abea25f`](https://github.com/tmm/wagmi/commit/abea25fd15d81d1ecaec9d3fbd687042ab29b1e6)]:
  - @wagmi/core@0.4.9

## 0.5.9

### Patch Changes

- [#677](https://github.com/tmm/wagmi/pull/677) [`35e4219`](https://github.com/tmm/wagmi/commit/35e42199af9dd346549c1718e144728f55b8d7dd) Thanks [@jxom](https://github.com/jxom)! - Move `parseContractResult` to `@wagmi/core`

* [#677](https://github.com/tmm/wagmi/pull/677) [`35e4219`](https://github.com/tmm/wagmi/commit/35e42199af9dd346549c1718e144728f55b8d7dd) Thanks [@jxom](https://github.com/jxom)! - Parse tuples correctly in `parseContractResult`

* Updated dependencies [[`35e4219`](https://github.com/tmm/wagmi/commit/35e42199af9dd346549c1718e144728f55b8d7dd)]:
  - @wagmi/core@0.4.7

## 0.5.8

### Patch Changes

- [#670](https://github.com/tmm/wagmi/pull/670) [`29a0d21`](https://github.com/tmm/wagmi/commit/29a0d21ee83995559f63542778dfa805f15e7441) Thanks [@tmm](https://github.com/tmm)! - Fix broken release not containing `deepEqual` from `@wagmi/core`.

- Updated dependencies [[`29a0d21`](https://github.com/tmm/wagmi/commit/29a0d21ee83995559f63542778dfa805f15e7441)]:
  - @wagmi/core@0.4.6

## 0.5.7

### Patch Changes

- [#659](https://github.com/tmm/wagmi/pull/659) [`be76586`](https://github.com/tmm/wagmi/commit/be76586431238dc5a0970a6f10a3dff9faa8ca2d) Thanks [@jxom](https://github.com/jxom)! - Added an `isDataEqual` config option to `useContractRead`, `useContractReads` & `useContractInfiniteReads` to define whether or not that data has changed. Defaults to `deepEqual`.

* [#659](https://github.com/tmm/wagmi/pull/659) [`be76586`](https://github.com/tmm/wagmi/commit/be76586431238dc5a0970a6f10a3dff9faa8ca2d) Thanks [@jxom](https://github.com/jxom)! - Added `onBlock` config to `useBlockNumber`

- [#659](https://github.com/tmm/wagmi/pull/659) [`be76586`](https://github.com/tmm/wagmi/commit/be76586431238dc5a0970a6f10a3dff9faa8ca2d) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useContractRead` & `useContractReads` would return unstable data.

## 0.5.6

### Patch Changes

- [#654](https://github.com/tmm/wagmi/pull/654) [`e66530b`](https://github.com/tmm/wagmi/commit/e66530bf4881b3533c528f8c5a5f41be0eab0a64) Thanks [@jxom](https://github.com/jxom)! - omit `contractInterface` from `useContractRead` & `useContractReads` query key hash

* [#654](https://github.com/tmm/wagmi/pull/654) [`e66530b`](https://github.com/tmm/wagmi/commit/e66530bf4881b3533c528f8c5a5f41be0eab0a64) Thanks [@jxom](https://github.com/jxom)! - fix `multicall` returning nullish data for all calls unexpectedly

* Updated dependencies [[`e66530b`](https://github.com/tmm/wagmi/commit/e66530bf4881b3533c528f8c5a5f41be0eab0a64)]:
  - @wagmi/core@0.4.5

## 0.5.5

### Patch Changes

- [#629](https://github.com/tmm/wagmi/pull/629) [`199db71`](https://github.com/tmm/wagmi/commit/199db7165eed43d36cb882d373f95e7c49212f23) Thanks [@jxom](https://github.com/jxom)! - Add `wagmi/actions` entrypoint that exports imperative `@wagmi/core` actions

* [#616](https://github.com/tmm/wagmi/pull/616) [`7a7a17a`](https://github.com/tmm/wagmi/commit/7a7a17a46d4c9e6465cc46a111b5fe8a56109f1b) Thanks [@tmm](https://github.com/tmm)! - Adds `UNSTABLE_shimOnConnectSelectAccount` flag. With this flag and "disconnected" with `shimDisconnect` enabled, the user is prompted to select a different MetaMask account (than the currently connected account) when trying to connect (e.g. `useConnect`/`connect` action).

* Updated dependencies [[`7a7a17a`](https://github.com/tmm/wagmi/commit/7a7a17a46d4c9e6465cc46a111b5fe8a56109f1b)]:
  - @wagmi/core@0.4.4

## 0.5.4

### Patch Changes

- [#631](https://github.com/tmm/wagmi/pull/631) [`a780e32`](https://github.com/tmm/wagmi/commit/a780e32e91a0072c795fa0b5a6111302768e2a01) Thanks [@tmm](https://github.com/tmm)! - Fix WalletConnect stale session

- Updated dependencies [[`a780e32`](https://github.com/tmm/wagmi/commit/a780e32e91a0072c795fa0b5a6111302768e2a01)]:
  - @wagmi/core@0.4.3

## 0.5.3

### Patch Changes

- [#627](https://github.com/tmm/wagmi/pull/627) [`5985530`](https://github.com/tmm/wagmi/commit/59855301d138313e83a607b3f05053e9f46a78a8) Thanks [@jxom](https://github.com/jxom)! - equalityFn in `useSyncExternalStoreWithTracked` should return truthy when there are no tracked keys.

## 0.5.2

### Patch Changes

- [#624](https://github.com/tmm/wagmi/pull/624) [`416fa7e`](https://github.com/tmm/wagmi/commit/416fa7ee1f8019ab86e33fb93783ffddecc02c49) Thanks [@jxom](https://github.com/jxom)! - Fix broken `WebSocketProvider` type defs

- Updated dependencies [[`416fa7e`](https://github.com/tmm/wagmi/commit/416fa7ee1f8019ab86e33fb93783ffddecc02c49)]:
  - @wagmi/core@0.4.2

## 0.5.1

### Patch Changes

- [#622](https://github.com/tmm/wagmi/pull/622) [`d171581`](https://github.com/tmm/wagmi/commit/d171581464891dd870d97b6232205da0cb152d9b) Thanks [@tmm](https://github.com/tmm)! - Use `domain.chainId` to validate and switch chain before signing in `useSignTypedData`.

* [#618](https://github.com/tmm/wagmi/pull/618) [`a5138e8`](https://github.com/tmm/wagmi/commit/a5138e82a00e4d9469ad78c97b2d34200d7f1fbe) Thanks [@tmm](https://github.com/tmm)! - Fix adding chains when using MetaMask mobile app, add `publicRpcUrls` constant, and default to public endpoint when adding chain.

* Updated dependencies [[`d171581`](https://github.com/tmm/wagmi/commit/d171581464891dd870d97b6232205da0cb152d9b), [`a5138e8`](https://github.com/tmm/wagmi/commit/a5138e82a00e4d9469ad78c97b2d34200d7f1fbe)]:
  - @wagmi/core@0.4.1

## 0.5.0

### Minor Changes

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `useContractWrite` hook parameters have been consolidated into a singular config parameter.

  Before:

  ```tsx
  useContractWrite(
    {
      addressOrName: mlootContractAddress,
      contractInterface: mlootABI,
    },
    'claim',
  )
  ```

  After:

  ```tsx
  useContractWrite({
    addressOrName: mlootContractAddress,
    contractInterface: mlootABI,
    functionName: 'claim',
  })
  ```

* [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `useContractEvent` hook parameters have been consolidated into a singular config parameter.

  Before:

  ```tsx
  useContractEvent(
    {
      addressOrName: uniContractAddress,
      contractInterface: erc20ABI,
    },
    'Transfer',
    listener,
  ),
  ```

  After:

  ```tsx
  useContractEvent({
    addressOrName: uniContractAddress,
    contractInterface: erc20ABI,
    eventName: 'Transfer',
    listener,
  })
  ```

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `client` prop is now required on `WagmiConfig`.

  ````diff
  ```tsx
  import {
    createClient,
  + configureChains,
  + defaultChains
  } from 'wagmi'
  +import { publicProvider } from 'wagmi/providers/public'

  +const { provider, webSocketProvider } = configureChains(defaultChains, [
  + publicProvider(),
  +])

  +const client = createClient({
  + provider,
  + webSocketProvider,
  +})

  function App() {
    return (
      <WagmiConfig
  +     client={client}
      >
        <YourRoutes />
      </WagmiConfig>
    )
  }
  ````

* [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `provider` config option is now required on `createClient`. It is recommended to pass the [`provider` given from `configureChains`](https://wagmi.sh/docs/providers/configuring-chains).

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

- [`4f8f3c0`](https://github.com/tmm/wagmi/commit/4f8f3c0d65383bd8bbdfc3f1033adfdb11d80ebb) Thanks [@nachoiacovino](https://github.com/nachoiacovino)! - Use ethereum-lists chains symbols

* [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The following changes were made to the `useAccount` return value:

  ### The `data` value is now `address` & `connector`

  ```diff
  {
  - data?: {
  -   address: string
  -   connector: Connector
  - }
  + address?: string
  + connector?: Connector
  }
  ```

  ### Global connection status values have been added

  The following global connection status values have been added:

  ```diff
  {
  + isConnecting: boolean
  + isReconnecting: boolean
  + isConnected: boolean
  + isDisconnected: boolean
  + status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
  }
  ```

  The `useAccount` hook is now aware of any connection event in your application, so now you can use these connection status values to determine if your user is connected, disconnected or connecting to a wallet on a global scope.

  ### `error`, states & `refetch` values have been removed

  Since the `useAccount` hook never dealt with asynchronous data, all of these values were
  redundant & unused.

  ```diff
  {
  - error?: Error
  - isIdle: boolean
  - isLoading: boolean
  - isFetching: boolean
  - isSuccess: boolean
  - isError: boolean
  - isFetched: boolean
  - isRefetching: boolean
  - refetch: (options: {
  -   throwOnError: boolean
  -   cancelRefetch: boolean
  - }) => Promise<{
  -   address: string
  -   connector: Connector
  - }>
  - status: 'idle' | 'error' | 'loading' | 'success'
  }
  ```

  ### Summary of changes

  Below is the whole diff of changes to the `useAccount` return value.

  ```diff
  {
  - data?: {
  -   address: string
  -   connector: Connector
  - }
  + address?: string
  + connector?: Connector
  - error?: Error
  - isIdle: boolean
  - isLoading: boolean
  - isFetching: boolean
  - isSuccess: boolean
  - isError: boolean
  - isFetched: boolean
  - isRefetching: boolean
  + isConnecting: boolean
  + isReconnecting: boolean
  + isConnected: boolean
  + isDisconnected: boolean
  - refetch: (options: {
  -   throwOnError: boolean
  -   cancelRefetch: boolean
  - }) => Promise<{
  -   address: string
  -   connector: Connector
  - }>
  - status: 'idle' | 'error' | 'loading' | 'success'
  + status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
  }
  ```

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** Removed the `chainId` parameter from `connectors` function on `createClient`.

  ```diff
  const client = createClient({
  - connectors({ chainId }) {
  + connectors() {
      ...
    }
  })
  ```

  If you previously derived RPC URLs from the `chainId` on `connectors`, you can now remove that logic as `wagmi` now handles RPC URLs internally when used with `configureChains`.

  ```diff
  import {
    chain,
  +  configureChains,
    createClient
  } from 'wagmi';

  +import { publicProvider } from 'wagmi/providers/public'

  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  +const { chains } = configureChains(
  +  [chain.mainnet],
  +  [publicProvider()]
  +);

  const client = createClient({
  -  connectors({ chainId }) {
  -    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
  -    const rpcUrl = chain.rpcUrls.alchemy
  -      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
  -      : chain.rpcUrls.default
  -    return [
  +  connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
  -       chainId: chain.id,
  -       jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
  -       rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { name: 'Injected' },
      }),
    ]
  -  },
  })
  ```

* [#596](https://github.com/tmm/wagmi/pull/596) [`a770af7`](https://github.com/tmm/wagmi/commit/a770af7d2cb214b6620d5341115f1e938e1e77ff) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `TypedDataDomain` and `TypedDataField` types were removed and incorporated into `SignTypedDataArgs`.

- [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The following changes were made to the `useAccount` configuration:

  ## `onConnect` has been added

  The `onConnect` callback is invoked when the account connects.

  It provides the connected address & connector, as well as a `isReconnected` flag for if the user reconnected via `autoConnect`.

  ```tsx
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected')
    },
  })
  ```

  ## `onDisconnect` has been added

  The `onDisconnect` callback is invoked when the account disconnected.

  ```tsx
  const account = useAccount({
    onDisconnect() {
      console.log('Disconnected')
    },
  })
  ```

  ## `suspense` has been removed

  The `useAccount` hook is a synchronous hook – so `suspense` never worked.

  ```diff
  const account = useAccount({
  -  suspense: true,
  })
  ```

  ## `onError` has been removed

  The `useAccount` hook never had any error definitions – so `onError` was never invoked.

  ```diff
  const account = useAccount({
  - onError(error) {
  -   console.log('Error', error)
  - },
  })
  ```

  ## `onSettled` has been removed

  The `useAccount` hook is a synchronous hook. `onSettled` was always invoked immediately.

  ```diff
  const account = useAccount({
  - onSettled(data) {
  -   console.log('Settled', data)
  - },
  })
  ```

  If you used `onSettled`, you can move the code beneath the `useAccount` hook:

  ```diff
  const account = useAccount({
  - onSettled(data) {
  -   console.log('Address:', data.address)
  - },
  })
  + console.log('Address:', account.address)
  ```

  ## `onSuccess` has been removed

  The `useAccount` hook is a synchronous hook. `onSuccess` was always invoked immediately.

  ```diff
  const account = useAccount({
  - onSuccess(data) {
  -   console.log('Success', data)
  - },
  })
  ```

  If you used `onSuccess`, you can move the code beneath the `useAccount` hook:

  ```diff
  const account = useAccount({
  - onSuccess(data) {
  -   console.log('Address:', data.address)
  - },
  })
  + console.log('Address:', account.address)
  ```

* [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The following changes were made to the `useConnect` return value:

  ### Connection status flags have been moved

  The `isConnected`, `isConnecting`, `isReconnecting` & `isDisconnected` flags have been moved to the `useAccount` hook.

  ```diff
  -import { useConnect } from 'wagmi'
  +import { useAccount } from 'wagmi'

  function App() {
    const {
      isConnected,
      isConnecting,
      isConnecting,
      isDisconnected
  - } = useConnect()
  + } = useAccount()
  }
  ```

  ### New `connect` mutation status flags have been added

  The `isLoading`, `isSuccess` and `isError` flags have been added to `useConnect`.

  These flags represent the **local** async state of `useConnect`.

  ### `activeConnector` has been removed

  The `activeConnector` value has been removed. You can find the active connector on `useAccount`.

  ```diff
  -import { useConnect } from 'wagmi'
  +import { useAccount } from 'wagmi'

  function App() {
  - const { activeConnector } = useConnect()
  + const { connector } = useAccount()
  }
  ```

- [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The following changes were made to the `useConnect` configuration:

  ### `onBeforeConnect` has been renamed

  The `onBeforeConnect` callback has been renamed to `onMutate`

  ### `onConnect` has been renamed

  The `onConnect` callback has been renamed to `onSuccess`

* [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `connector` parameter to `connect` & `connectAsync` now has to be in the config object parameter shape.

  ```diff
  import { useConnect } from 'wagmi'

  function App() {
    const { connect, connectors } = useConnect()

    return (
      <button
  -     onClick={() => connect(connectors[0])}
  +     onClick={() => connect({ connector: connectors[0] })}
      >
        Connect
      </button>
    )
  }
  ```

- [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The "switch network" functionality has been moved out of `useNetwork` into a new `useSwitchNetwork` hook.

  The `useNetwork` hook now accepts no configuration and only returns `chain` (renamed from `activeChain`) and `chains`.

  ```diff
  import {
    useNetwork
  + useSwitchNetwork
  } from 'wagmi'

  const {
  - activeChain
  + chain,
    chains,
  - data,
  - error,
  - isError,
  - isIdle,
  - isLoading,
  - isSuccess,
  - pendingChainId,
  - switchNetwork,
  - switchNetworkAsync,
  - status,
  - reset,
  -} = useNetwork({
  - chainId: 69,
  - onError(error) {},
  - onMutate(args) {},
  - onSettled(data, error) {},
  - onSuccess(data) {}
  -})
  +} = useNetwork()

  +const {
  + data,
  + error,
  + isError,
  + isIdle,
  + isLoading,
  + isSuccess,
  + pendingChainId,
  + switchNetwork,
  + switchNetworkAsync,
  + status,
  + reset,
  +} = useSwitchNetwork({
  + chainId: 69,
  + onError(error) {},
  + onMutate(args) {},
  + onSettled(data, error) {},
  + onSuccess(data) {}
  +})
  ```

* [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `useContractRead` hook parameters have been consolidated into a singular config parameter.

  Before:

  ```tsx
  useContractRead(
    {
      addressOrName: wagmigotchiContractAddress,
      contractInterface: wagmigotchiABI,
    },
    'love',
    { args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c' },
  )
  ```

  After:

  ```tsx
  useContractRead({
    addressOrName: wagmigotchiContractAddress,
    contractInterface: wagmigotchiABI,
    functionName: 'love',
    args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
  })
  ```

### Patch Changes

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - Added a `useContractInfiniteReads` hook that provides the ability to call multiple ethers Contract read-only methods with "infinite scrolling" ("fetch more") support. Useful for rendering a dynamic list of contract data.

  [Learn more](https://wagmi.sh/docs/hooks/useContractInfiniteReads)

* [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - Added a `useContractReads` hook that provides the ability to batch up multiple ethers Contract read-only methods.

  [Learn more](https://wagmi.sh/docs/hooks/useContractReads)

- [#598](https://github.com/tmm/wagmi/pull/598) [`fef26bf`](https://github.com/tmm/wagmi/commit/fef26bf8aef76fc9621e3cd54d4e0ca8f69abb38) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Update `@coinbase/wallet-sdk` to fix errors when connecting with older versions of the Coinbase Wallet extension and mobile app.

* [#611](https://github.com/tmm/wagmi/pull/611) [`3089c34`](https://github.com/tmm/wagmi/commit/3089c34196d4034acabac031e0a2f7ee63ae30cc) Thanks [@tmm](https://github.com/tmm)! - Added `chainId` config parameter for `useContractWrite` and `useSendTransaction`.

  If `chainId` is provided, the connector will validate that `chainId` is the active chain before sending a transaction (and switch to `chainId` if necessary).

* Updated dependencies [[`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4), [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4), [`4f8f3c0`](https://github.com/tmm/wagmi/commit/4f8f3c0d65383bd8bbdfc3f1033adfdb11d80ebb), [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4), [`3089c34`](https://github.com/tmm/wagmi/commit/3089c34196d4034acabac031e0a2f7ee63ae30cc), [`a770af7`](https://github.com/tmm/wagmi/commit/a770af7d2cb214b6620d5341115f1e938e1e77ff), [`4f8f3c0`](https://github.com/tmm/wagmi/commit/4f8f3c0d65383bd8bbdfc3f1033adfdb11d80ebb), [`fef26bf`](https://github.com/tmm/wagmi/commit/fef26bf8aef76fc9621e3cd54d4e0ca8f69abb38), [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4), [`3089c34`](https://github.com/tmm/wagmi/commit/3089c34196d4034acabac031e0a2f7ee63ae30cc), [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70), [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4), [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4)]:
  - @wagmi/core@0.4.0

## 0.4.12

### Patch Changes

- [#570](https://github.com/tmm/wagmi/pull/570) [`0e3fe15`](https://github.com/tmm/wagmi/commit/0e3fe15445377f35d6f4142b49bf1c96bfeb62cd) Thanks [@tmm](https://github.com/tmm)! - adds chain for [Foundry](https://github.com/foundry-rs)

- Updated dependencies [[`0e3fe15`](https://github.com/tmm/wagmi/commit/0e3fe15445377f35d6f4142b49bf1c96bfeb62cd)]:
  - @wagmi/core@0.3.8

## 0.4.11

### Patch Changes

- [#566](https://github.com/tmm/wagmi/pull/566) [`8713c00`](https://github.com/tmm/wagmi/commit/8713c00f70fcac3afef4ba183e3c87c6d3cbbf65) Thanks [@jxom](https://github.com/jxom)! - Fixed `parseContractResult` breaking `useContractRead` for more complex contract types

## 0.4.10

### Patch Changes

- [`20a1ab7`](https://github.com/tmm/wagmi/commit/20a1ab7bd02a24c4f1ea02be1bc3ecfbe4abc584) Thanks [@jxom](https://github.com/jxom)! - Updated to `react-query@4.0.0-beta.23`

* [`20a1ab7`](https://github.com/tmm/wagmi/commit/20a1ab7bd02a24c4f1ea02be1bc3ecfbe4abc584) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue in `useContractRead` where contract structs wouldn't be parsed back to an ethers `Result` correctly.

## 0.4.9

### Patch Changes

- [#555](https://github.com/tmm/wagmi/pull/555) [`8bf014d`](https://github.com/tmm/wagmi/commit/8bf014d8167e9f9feb1fd91488aab42dd51c92af) Thanks [@tmm](https://github.com/tmm)! - wire up `useEnsName` `chainId`

## 0.4.8

### Patch Changes

- [#550](https://github.com/tmm/wagmi/pull/550) [`2a5313e`](https://github.com/tmm/wagmi/commit/2a5313e8cbc9ba6335e8e4b85e43862c9b711bd3) Thanks [@tmm](https://github.com/tmm)! - fix `CoinbaseWalletConnector` possible type error

* [#548](https://github.com/tmm/wagmi/pull/548) [`0c48719`](https://github.com/tmm/wagmi/commit/0c487199f2421f042abc1f1d139468ccbbc5646a) Thanks [@dohaki](https://github.com/dohaki)! - add ensAddress to Chain type

- [#549](https://github.com/tmm/wagmi/pull/549) [`89b3a74`](https://github.com/tmm/wagmi/commit/89b3a74ead4234daacd0dcf8506659887ebf0553) Thanks [@tmm](https://github.com/tmm)! - Turns on [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess=) and [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks=) for better runtime safety.

- Updated dependencies [[`2a5313e`](https://github.com/tmm/wagmi/commit/2a5313e8cbc9ba6335e8e4b85e43862c9b711bd3), [`0c48719`](https://github.com/tmm/wagmi/commit/0c487199f2421f042abc1f1d139468ccbbc5646a), [`89b3a74`](https://github.com/tmm/wagmi/commit/89b3a74ead4234daacd0dcf8506659887ebf0553)]:
  - @wagmi/core@0.3.7

## 0.4.7

### Patch Changes

- [#526](https://github.com/tmm/wagmi/pull/526) [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f) Thanks [@jxom](https://github.com/jxom)! - Added `shimChainChangedDisconnect` option to `InjectedConnector`. Defaults to `true` for `MetaMaskConnector`.

* [#526](https://github.com/tmm/wagmi/pull/526) [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f) Thanks [@jxom](https://github.com/jxom)! - Added `chainId` config option to `useConnect()` & `connect()`. Consumers can now pick what chain they want their user to be connected to.

  Examples:

  ```tsx
  import { useConnect, chain } from 'wagmi'
  import { InjectedConnector } from 'wagmi/connectors/injected'

  function App() {
    const connect = useConnect({
      chainId: chain.polygon.id,
    })
  }
  ```

  ```tsx
  import { useConnect, chain } from 'wagmi'
  import { InjectedConnector } from 'wagmi/connectors/injected'

  function App() {
    const connect = useConnect()

    return (
      <button onClick={() => connect({ chainId: chain.optimism.id })}>
        Connect to Optimism
      </button>
    )
  }
  ```

* Updated dependencies [[`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f), [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f), [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f)]:
  - @wagmi/core@0.3.6

## 0.4.6

### Patch Changes

- [#543](https://github.com/tmm/wagmi/pull/543) [`4d489fd`](https://github.com/tmm/wagmi/commit/4d489fd630dd8c00440bdaf4d646de662c41ff52) Thanks [@tmm](https://github.com/tmm)! - fix fee data formatting for null values

- Updated dependencies [[`4d489fd`](https://github.com/tmm/wagmi/commit/4d489fd630dd8c00440bdaf4d646de662c41ff52)]:
  - @wagmi/core@0.3.5

## 0.4.5

### Patch Changes

- [`01cc47b`](https://github.com/tmm/wagmi/commit/01cc47b2385c78d82bc799c2dedacb2a42457e2f) Thanks [@jxom](https://github.com/jxom)! - Update `react-query` to `4.0.0-beta.19`

## 0.4.4

### Patch Changes

- [`c4deb66`](https://github.com/tmm/wagmi/commit/c4deb6655a52e4cc4e5b3fd82202db11d6106848) Thanks [@jxom](https://github.com/jxom)! - infer `options.chainId` config from `chains` on WalletConnectConnector

- Updated dependencies [[`c4deb66`](https://github.com/tmm/wagmi/commit/c4deb6655a52e4cc4e5b3fd82202db11d6106848)]:
  - @wagmi/core@0.3.4

## 0.4.3

### Patch Changes

- [#486](https://github.com/tmm/wagmi/pull/486) [`dbfe3dd`](https://github.com/tmm/wagmi/commit/dbfe3dd320d178d6854a8096101200c1508786bb) Thanks [@tmm](https://github.com/tmm)! - add chains entrypoint

- Updated dependencies [[`dbfe3dd`](https://github.com/tmm/wagmi/commit/dbfe3dd320d178d6854a8096101200c1508786bb)]:
  - @wagmi/core@0.3.3

## 0.4.2

### Patch Changes

- [`b1a2e58`](https://github.com/tmm/wagmi/commit/b1a2e5830e325be448bf865aeccda60217fc8d75) Thanks [@jxom](https://github.com/jxom)! - Made the `defaultChains` type generic in `configureChains`.

## 0.4.1

### Patch Changes

- [#484](https://github.com/tmm/wagmi/pull/484) [`1b9a503`](https://github.com/tmm/wagmi/commit/1b9a5033d51c6655b4f6570c490da6e0e9a29da9) Thanks [@tmm](https://github.com/tmm)! - export React Context

- Updated dependencies [[`1b9a503`](https://github.com/tmm/wagmi/commit/1b9a5033d51c6655b4f6570c490da6e0e9a29da9)]:
  - @wagmi/core@0.3.1

## 0.4.0

### Minor Changes

- [#468](https://github.com/tmm/wagmi/pull/468) [`44a884b`](https://github.com/tmm/wagmi/commit/44a884b84171c418f57701e80ef8de972948ef0b) Thanks [@tmm](https://github.com/tmm)! - **Breaking:** Duplicate exports with different names and the same functionality were removed to simplify the public API. In addition, confusing exports were renamed to be more descriptive.

  - `createWagmiClient` alias was removed. Use `createClient` instead.
  - `useWagmiClient` alias was removed. Use `useClient` instead.
  - `WagmiClient` alias was removed. Use `Client` instead.
  - `createWagmiStorage` alias was removed. Use `createStorage` instead.
  - `Provider` was renamed and `WagmiProvider` alias was removed. Use `WagmiConfig` instead.

* [#408](https://github.com/tmm/wagmi/pull/408) [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a) Thanks [@jxom](https://github.com/jxom)! - Add `configureChains` API.

  The `configureChains` function allows you to configure your chains with a selected provider (Alchemy, Infura, JSON RPC, Public RPC URLs). This means you don't have to worry about deriving your own RPC URLs for each chain, or instantiating a Ethereum Provider.

  `configureChains` accepts 3 parameters: an array of chains, and an array of providers, and a config object.

  [Learn more about configuring chains & providers.](https://wagmi.sh/docs/providers/configuring-chains)

  ### Before

  ```tsx
  import { providers } from 'ethers'
  import { chain, createClient, defaultChains } from 'wagmi'
  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  const alchemyId = process.env.ALCHEMY_ID

  const chains = defaultChains
  const defaultChain = chain.mainnet

  const client = createClient({
    autoConnect: true,
    connectors({ chainId }) {
      const chain = chains.find((x) => x.id === chainId) ?? defaultChain
      const rpcUrl = chain.rpcUrls.alchemy
        ? `${chain.rpcUrls.alchemy}/${alchemyId}`
        : chain.rpcUrls.default
      return [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'wagmi',
            chainId: chain.id,
            jsonRpcUrl: rpcUrl,
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
            rpc: { [chain.id]: rpcUrl },
          },
        }),
        new InjectedConnector({
          chains,
          options: {
            name: 'Injected',
            shimDisconnect: true,
          },
        }),
      ]
    },
    provider: ({ chainId }) =>
      new providers.AlchemyProvider(chainId, alchemyId),
  })
  ```

  ### After

  ```tsx
  import { chain, createClient, defaultChains } from 'wagmi'

  import { alchemyProvider } from 'wagmi/providers/alchemy'
  import { publicProvider } from 'wagmi/providers/public'

  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  const alchemyId = process.env.ALCHEMY_ID

  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    [alchemyProvider({ alchemyId }), publicProvider()],
  )

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })
  ```

### Patch Changes

- [#404](https://github.com/tmm/wagmi/pull/404) [`f81c156`](https://github.com/tmm/wagmi/commit/f81c15665e2e71534f84ada3fa705f2d78627472) Thanks [@holic](https://github.com/holic)! - Add `ProviderRpcError` and `RpcError` error classes.

  Certain wagmi-standardized errors may wrap `ProviderRpcError` or `RpcError`. For these cases, you can access the original provider rpc or rpc error value using the `internal` property.

* [#459](https://github.com/tmm/wagmi/pull/459) [`72dcf7c`](https://github.com/tmm/wagmi/commit/72dcf7c09e814261b2e43a8fa364c57675c472de) Thanks [@tmm](https://github.com/tmm)! - update dependencies

- [#447](https://github.com/tmm/wagmi/pull/447) [`b9ebf78`](https://github.com/tmm/wagmi/commit/b9ebf782e0900725bcb76483686b30f09d357ebd) Thanks [@tmm](https://github.com/tmm)! - Fix case where connector disconnected while app was closed and stale data was returned when autoconnecting. For example, [MetaMask was locked](https://github.com/tmm/wagmi/issues/444) when page was closed.

- Updated dependencies [[`f81c156`](https://github.com/tmm/wagmi/commit/f81c15665e2e71534f84ada3fa705f2d78627472), [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a), [`44a884b`](https://github.com/tmm/wagmi/commit/44a884b84171c418f57701e80ef8de972948ef0b), [`72dcf7c`](https://github.com/tmm/wagmi/commit/72dcf7c09e814261b2e43a8fa364c57675c472de), [`a54f3e2`](https://github.com/tmm/wagmi/commit/a54f3e23ea385ed8aa4ad188128d7089ba20f83e), [`b9ebf78`](https://github.com/tmm/wagmi/commit/b9ebf782e0900725bcb76483686b30f09d357ebd), [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a)]:
  - @wagmi/core@0.3.0

## 0.3.5

### Patch Changes

- [`4e03666`](https://github.com/tmm/wagmi/commit/4e03666428d42fc9186c617001b5eb356229677e) Thanks [@tmm](https://github.com/tmm)! - bump dependencies #429
  add imToken support for WC switch chains #432
  fix MetaMask and Brave Wallet collision #436
- Updated dependencies [[`4e03666`](https://github.com/tmm/wagmi/commit/4e03666428d42fc9186c617001b5eb356229677e)]:
  - @wagmi/core@0.2.5

## 0.3.4

### Patch Changes

- [#421](https://github.com/tmm/wagmi/pull/421) [`a232b3f`](https://github.com/tmm/wagmi/commit/a232b3ff5cc41e882c4d2a34c599a8cb670edd2b) Thanks [@tmm](https://github.com/tmm)! - fix erc721 abi

- Updated dependencies [[`a232b3f`](https://github.com/tmm/wagmi/commit/a232b3ff5cc41e882c4d2a34c599a8cb670edd2b)]:
  - @wagmi/core@0.2.4

## 0.3.3

### Patch Changes

- [#412](https://github.com/tmm/wagmi/pull/412) [`80bef4f`](https://github.com/tmm/wagmi/commit/80bef4ff3f714b0b8f896f1b4b658acc7266299b) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Import providers from `ethers` peer dependency rather than `@ethersproject/providers` to avoid multiple conflicting versions being installed

- Updated dependencies [[`80bef4f`](https://github.com/tmm/wagmi/commit/80bef4ff3f714b0b8f896f1b4b658acc7266299b)]:
  - @wagmi/core@0.2.3

## 0.3.2

### Patch Changes

- [`018c2a1`](https://github.com/tmm/wagmi/commit/018c2a11b22ee513571cc7f83fd63f7eb169ee70) Thanks [@tmm](https://github.com/tmm)! - - warn and fallback to default client #380

  - remove signerOrProvider option from read contract #390

  - MetaMaskConnector #391

- Updated dependencies [[`018c2a1`](https://github.com/tmm/wagmi/commit/018c2a11b22ee513571cc7f83fd63f7eb169ee70)]:
  - @wagmi/core@0.2.2

## 0.3.1

### Patch Changes

- [`afc4607`](https://github.com/tmm/wagmi/commit/afc46071e91601ab8a2b465524da796cd60b6ad4) Thanks [@tmm](https://github.com/tmm)! - - Fix time scaling e9593df
  - Use fully-specified path for use-sync-external-store import 7b235c1
  - Update serialize 236fc17
- Updated dependencies [[`afc4607`](https://github.com/tmm/wagmi/commit/afc46071e91601ab8a2b465524da796cd60b6ad4)]:
  - @wagmi/core@0.2.1

## 0.3.0

### Minor Changes

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - don't persist account data when `autoConnect` is falsy

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - fix(@wagmi/core): persist connector chains to local storage

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - force address to be required in `useAccount`

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Initial 0.3.0 release

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Add `cacheOnBlock` config for `useContractRead`
  Update `react-query` to v4
  Fix `watchBlockNumber` listener leak

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - fix `useContractWrite` mutation fn arguments

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Update react-query to 4.0.0-beta.5

### Patch Changes

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - add chainId to actions and hooks

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - showtime

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - improve type support for ethers providers

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update zustand

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update babel target

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update block explorers and rpc urls structure

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - keep previous data when watching

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - republish

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - fix stale connectors when switching chains

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - last beta

* Updated dependencies [[`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d), [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d)]:
  - @wagmi/core@0.2.0

## 0.3.0-next.21

### Patch Changes

- showtime

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.18

## 0.3.0-next.20

### Patch Changes

- update block explorers and rpc urls structure

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.17

## 0.3.0-next.19

### Minor Changes

- Update react-query to 4.0.0-beta.5

## 0.3.0-next.18

### Patch Changes

- last beta

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.16

## 0.3.0-next.17

### Patch Changes

- update zustand

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.15

## 0.3.0-next.16

### Minor Changes

- Add `cacheOnBlock` config for `useContractRead`
- Update `react-query` to v4
- Fix `watchBlockNumber` listener leak

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.14

## 0.3.0-next.15

### Patch Changes

- keep previous data when watching

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.13

## 0.3.0-next.14

### Patch Changes

- add chainId to actions and hooks

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.12

## 0.3.0-next.13

### Patch Changes

- fix stale connectors when switching chains

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.11

## 0.3.0-next.12

### Patch Changes

- republish

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.10

## 0.3.0-next.11

### Patch Changes

- improve type support for ethers providers

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.9

## 0.3.0-next.10

### Patch Changes

- update babel target

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.8

## 0.3.0-next.9

### Minor Changes

- - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.7

## 0.3.0-next.8

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.6

## 0.3.0-next.7

### Minor Changes

- don't persist account data when `autoConnect` is falsy

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.5

## 0.3.0-next.6

### Minor Changes

- fix `useContractWrite` mutation fn arguments

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.4

## 0.3.0-next.5

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.3

## 0.3.0-next.4

### Minor Changes

- force address to be required in `useAccount`

## 0.3.0-next.3

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.2

## 0.3.0-next.2

### Minor Changes

- Initial 0.3.0 release

### Patch Changes

- Updated dependencies []:
  - @wagmi/core@0.2.0-next.1

## 0.2.28

### Patch Changes

- [`747d895`](https://github.com/tmm/wagmi/commit/747d895a54b562958afde34b1d34e81ab5039e2c) Thanks [@tmm](https://github.com/tmm)! - add warning to WalletLinkConnector

- Updated dependencies [[`747d895`](https://github.com/tmm/wagmi/commit/747d895a54b562958afde34b1d34e81ab5039e2c)]:
  - wagmi-core@0.1.22

## 0.2.27

### Patch Changes

- [`c858c51`](https://github.com/tmm/wagmi/commit/c858c51b44d9039f1d0db5bcf016639f47d1931f) Thanks [@tmm](https://github.com/tmm)! - update coinbase connector

- Updated dependencies [[`c858c51`](https://github.com/tmm/wagmi/commit/c858c51b44d9039f1d0db5bcf016639f47d1931f)]:
  - wagmi-core@0.1.21

## 0.2.26

### Patch Changes

- Updated dependencies [[`36e6989`](https://github.com/tmm/wagmi/commit/36e69894f4c27aaad7fb6d678476c8bb870244bb)]:
  - wagmi-core@0.1.20

## 0.2.25

### Patch Changes

- [`d467df6`](https://github.com/tmm/wagmi/commit/d467df6374210dbc4b016788b4beb4fded54cb4d) Thanks [@tmm](https://github.com/tmm)! - fix global type leaking

- Updated dependencies [[`d467df6`](https://github.com/tmm/wagmi/commit/d467df6374210dbc4b016788b4beb4fded54cb4d)]:
  - wagmi-core@0.1.19

## 0.2.24

### Patch Changes

- [#294](https://github.com/tmm/wagmi/pull/294) [`1d253f3`](https://github.com/tmm/wagmi/commit/1d253f3a59b61d24c88d25c99decd84a6c734e5d) Thanks [@tmm](https://github.com/tmm)! - change babel target

- Updated dependencies [[`1d253f3`](https://github.com/tmm/wagmi/commit/1d253f3a59b61d24c88d25c99decd84a6c734e5d)]:
  - wagmi-core@0.1.18

## 0.2.23

### Patch Changes

- [#292](https://github.com/tmm/wagmi/pull/292) [`53c9be1`](https://github.com/tmm/wagmi/commit/53c9be17ee0c2ae6b8f34f2351b8858257b3f5f2) Thanks [@tmm](https://github.com/tmm)! - fix private fields

- Updated dependencies [[`53c9be1`](https://github.com/tmm/wagmi/commit/53c9be17ee0c2ae6b8f34f2351b8858257b3f5f2)]:
  - wagmi-core@0.1.17

## 0.2.22

### Patch Changes

- [`79a2499`](https://github.com/tmm/wagmi/commit/79a249989029f818c32c0e84c0dd2c75e8aa990a) Thanks [@tmm](https://github.com/tmm)! - update build target to es2021

- Updated dependencies [[`79a2499`](https://github.com/tmm/wagmi/commit/79a249989029f818c32c0e84c0dd2c75e8aa990a)]:
  - wagmi-core@0.1.16

## 0.2.21

### Patch Changes

- [`f9790b5`](https://github.com/tmm/wagmi/commit/f9790b55600df09c77bb8ca349c5a3457df1b07c) Thanks [@tmm](https://github.com/tmm)! - fix WalletConnect issue

- Updated dependencies [[`f9790b5`](https://github.com/tmm/wagmi/commit/f9790b55600df09c77bb8ca349c5a3457df1b07c)]:
  - wagmi-core@0.1.15

## 0.2.20

### Patch Changes

- [`fed29fb`](https://github.com/tmm/wagmi/commit/fed29fb4714abe234e2dabb63782cfc4439a10cf) Thanks [@tmm](https://github.com/tmm)! - export useSignTypedData

## 0.2.19

### Patch Changes

- [`6987278`](https://github.com/tmm/wagmi/commit/69872786e0b54b89a20945cc5471c1f4675b0a68) Thanks [@tmm](https://github.com/tmm)! - add useSignedTypeData

## 0.2.18

### Patch Changes

- [#236](https://github.com/tmm/wagmi/pull/236) [`53bad61`](https://github.com/tmm/wagmi/commit/53bad615788764e31121678083c382c1bd042fe8) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Updated `@walletconnect/ethereum-provider` to [v1.7.4](https://github.com/WalletConnect/walletconnect-monorepo/releases/tag/1.7.4)

- Updated dependencies [[`53bad61`](https://github.com/tmm/wagmi/commit/53bad615788764e31121678083c382c1bd042fe8)]:
  - wagmi-core@0.1.14

## 0.2.17

### Patch Changes

- [`8e9412a`](https://github.com/tmm/wagmi/commit/8e9412af71958301ae2f9748febb936e79900aa0) Thanks [@tmm](https://github.com/tmm)! - bump walletlink

- Updated dependencies [[`8e9412a`](https://github.com/tmm/wagmi/commit/8e9412af71958301ae2f9748febb936e79900aa0)]:
  - wagmi-core@0.1.13

## 0.2.16

### Patch Changes

- [#210](https://github.com/tmm/wagmi/pull/210) [`684468a`](https://github.com/tmm/wagmi/commit/684468aee3e42a1ce2b4b599f3f17d1819213de8) Thanks [@tmm](https://github.com/tmm)! - update chains to match chainslist.org

- Updated dependencies [[`684468a`](https://github.com/tmm/wagmi/commit/684468aee3e42a1ce2b4b599f3f17d1819213de8)]:
  - wagmi-core@0.1.12

## 0.2.15

### Patch Changes

- [#195](https://github.com/tmm/wagmi/pull/195) [`25b6083`](https://github.com/tmm/wagmi/commit/25b6083a662a0236794d1765343467691421c14b) Thanks [@tmm](https://github.com/tmm)! - rename wagmi-private to wagmi-core

- Updated dependencies [[`25b6083`](https://github.com/tmm/wagmi/commit/25b6083a662a0236794d1765343467691421c14b)]:
  - wagmi-core@0.1.11

## 0.2.14

### Patch Changes

- [#192](https://github.com/tmm/wagmi/pull/192) [`428cedb`](https://github.com/tmm/wagmi/commit/428cedb3dec4e3e4b9f4559c8e65932e05f94e05) Thanks [@tmm](https://github.com/tmm)! - rename core and testing packages

- Updated dependencies [[`428cedb`](https://github.com/tmm/wagmi/commit/428cedb3dec4e3e4b9f4559c8e65932e05f94e05)]:
  - wagmi-core@0.1.10

## 0.2.13

### Patch Changes

- [#190](https://github.com/tmm/wagmi/pull/190) [`7034bb8`](https://github.com/tmm/wagmi/commit/7034bb868412b9f481b206371280e84c2d52706d) Thanks [@tmm](https://github.com/tmm)! - add shim for metamask chain changed to prevent disconnect

- Updated dependencies [[`7034bb8`](https://github.com/tmm/wagmi/commit/7034bb868412b9f481b206371280e84c2d52706d)]:
  - wagmi-private@0.1.9

## 0.2.12

### Patch Changes

- [`566b47f`](https://github.com/tmm/wagmi/commit/566b47f53c80e1cdcc368d43c53b1772eeb5be20) Thanks [@tmm](https://github.com/tmm)! - fix contract read skip option

## 0.2.11

### Patch Changes

- [`09f0719`](https://github.com/tmm/wagmi/commit/09f071947012e3133362a7eb80c0f39356899190) Thanks [@tmm](https://github.com/tmm)! - - safe state updates h/t @bpierre
  - add useEnsResolveName hook h/t @shunkakinoki

## 0.2.10

### Patch Changes

- [#159](https://github.com/tmm/wagmi/pull/159) [`981438d`](https://github.com/tmm/wagmi/commit/981438d527fb6b5f025dd9bb405fa9e7a2751597) Thanks [@markdalgleish](https://github.com/markdalgleish)! - add `WagmiProvider` alias for `Provider`

## 0.2.9

### Patch Changes

- [#137](https://github.com/tmm/wagmi/pull/137) [`dceeb43`](https://github.com/tmm/wagmi/commit/dceeb430d9021fbf98366859cb1cd0149e80c55c) Thanks [@tmm](https://github.com/tmm)! - add siwe guide

- Updated dependencies [[`dceeb43`](https://github.com/tmm/wagmi/commit/dceeb430d9021fbf98366859cb1cd0149e80c55c)]:
  - wagmi-private@0.1.8

## 0.2.8

### Patch Changes

- [`b49cb89`](https://github.com/tmm/wagmi/commit/b49cb89ef59289ee1185eafab427d3ab55c17c25) Thanks [@tmm](https://github.com/tmm)! - refactor contract read/write hook state

## 0.2.7

### Patch Changes

- [`7132631`](https://github.com/tmm/wagmi/commit/713263159899feb257c11614716f0af4f6b06a14) Thanks [@tmm](https://github.com/tmm)! - update contract read and write state

## 0.2.6

### Patch Changes

- [#127](https://github.com/tmm/wagmi/pull/127) [`f05b031`](https://github.com/tmm/wagmi/commit/f05b0310f7f7e6447e9b6c81cedbb27dcf2f3649) Thanks [@tmm](https://github.com/tmm)! - update switch chain return type

- Updated dependencies [[`f05b031`](https://github.com/tmm/wagmi/commit/f05b0310f7f7e6447e9b6c81cedbb27dcf2f3649)]:
  - wagmi-private@0.1.7

## 0.2.5

### Patch Changes

- [`1412eed`](https://github.com/tmm/wagmi/commit/1412eed0d1494bb4f8c6845a0e890f79e4e68e03) Thanks [@tmm](https://github.com/tmm)! - add frame to injected

- Updated dependencies [[`1412eed`](https://github.com/tmm/wagmi/commit/1412eed0d1494bb4f8c6845a0e890f79e4e68e03)]:
  - wagmi-private@0.1.6

## 0.2.4

### Patch Changes

- [#122](https://github.com/tmm/wagmi/pull/122) [`94f599c`](https://github.com/tmm/wagmi/commit/94f599cc1de74a977956d4118d85ab0d36915471) Thanks [@tmm](https://github.com/tmm)! - add decimals to useBalance

## 0.2.3

### Patch Changes

- [`e338c3b`](https://github.com/tmm/wagmi/commit/e338c3b6cc255742be6a67593aa5da6c17e90fbd) Thanks [@tmm](https://github.com/tmm)! - checksum connector address on change events

  add shim to injected connector for simulating disconnect

- Updated dependencies [[`e338c3b`](https://github.com/tmm/wagmi/commit/e338c3b6cc255742be6a67593aa5da6c17e90fbd)]:
  - wagmi-private@0.1.5

## 0.2.2

### Patch Changes

- [`0176c4e`](https://github.com/tmm/wagmi/commit/0176c4e83fb0c5f159c3c802a1da3d6deb2184ae) Thanks [@tmm](https://github.com/tmm)! - added switchChain to WalletConnect and WalletLink connectors

- Updated dependencies [[`0176c4e`](https://github.com/tmm/wagmi/commit/0176c4e83fb0c5f159c3c802a1da3d6deb2184ae)]:
  - wagmi-private@0.1.4

## 0.2.1

### Patch Changes

- [`f12d9cc`](https://github.com/tmm/wagmi/commit/f12d9ccfdf87a2f75299b53a7dd6b1ad046a49d8) Thanks [@tmm](https://github.com/tmm)! - fixes overrides type

## 0.2.0

### Minor Changes

- [#98](https://github.com/tmm/wagmi/pull/98) [`b2ec758`](https://github.com/tmm/wagmi/commit/b2ec7580436f52fd35005c6dd3f4472650a14d02) Thanks [@oveddan](https://github.com/oveddan)! - Exported Context

## 0.1.7

### Patch Changes

- [`d965757`](https://github.com/tmm/wagmi/commit/d9657578bc17648716c4671b8cc35ad295bc71d2) Thanks [@tmm](https://github.com/tmm)! - use balance eth symbol

## 0.1.6

### Patch Changes

- [`071d7fb`](https://github.com/tmm/wagmi/commit/071d7fbca35ec4832700b5343661ceb2dae20598) Thanks [@tmm](https://github.com/tmm)! - add hardhat chain

- Updated dependencies [[`071d7fb`](https://github.com/tmm/wagmi/commit/071d7fbca35ec4832700b5343661ceb2dae20598)]:
  - wagmi-private@0.1.3

## 0.1.5

### Patch Changes

- [`db4d869`](https://github.com/tmm/wagmi/commit/db4d869fd9380b26a1f3f96ab34abd14ca73d068) Thanks [@tmm](https://github.com/tmm)! - - add global connecting property for `Provider` `autoConnect` (h/t @sammdec)
  - fix `useContractEvent` error (h/t @math-marcellino)

## 0.1.4

### Patch Changes

- [#73](https://github.com/tmm/wagmi/pull/73) [`0c78ccc`](https://github.com/tmm/wagmi/commit/0c78ccc4e7f311525d4ea712b79cf532899e2006) Thanks [@tmm](https://github.com/tmm)! - fix module exports

## 0.1.3

### Patch Changes

- [`78bade9`](https://github.com/tmm/wagmi/commit/78bade9d0da97ab38a7e6594c34e3841ec1c8fe6) Thanks [@tmm](https://github.com/tmm)! - add type definitions

- Updated dependencies [[`78bade9`](https://github.com/tmm/wagmi/commit/78bade9d0da97ab38a7e6594c34e3841ec1c8fe6)]:
  - wagmi-private@0.1.2

## 0.1.2

### Patch Changes

- [#56](https://github.com/tmm/wagmi/pull/56) [`2ebfd8e`](https://github.com/tmm/wagmi/commit/2ebfd8e85b560f25cd46cff04619c84643cab297) Thanks [@tmm](https://github.com/tmm)! - add chain support status

- Updated dependencies [[`2ebfd8e`](https://github.com/tmm/wagmi/commit/2ebfd8e85b560f25cd46cff04619c84643cab297)]:
  - wagmi-private@0.1.1

## 0.1.1

### Patch Changes

- [#54](https://github.com/tmm/wagmi/pull/54) [`25acd3d`](https://github.com/tmm/wagmi/commit/25acd3dfbb4498af5e1139ae9c892f5013404cbc) Thanks [@tmm](https://github.com/tmm)! - Stale contract object when useContract hook arguments change @zakangelle

## 0.1.0

### Minor Changes

- [#52](https://github.com/tmm/wagmi/pull/52) [`da7a3a6`](https://github.com/tmm/wagmi/commit/da7a3a615def2443f65c041999100ce35e9774cc) Thanks [@tmm](https://github.com/tmm)! - Moves connectors to their own entrypoints to reduce bundle size.

  ```ts
  // old - WalletLinkConnector unused, but still in final bundle
  import { InjectedConnector, WalletConnectConnector } from 'wagmi'

  // new - WalletLinkConnector not in final bundle
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
  ```

### Patch Changes

- Updated dependencies [[`da7a3a6`](https://github.com/tmm/wagmi/commit/da7a3a615def2443f65c041999100ce35e9774cc)]:
  - wagmi-private@0.1.0

## 0.0.17

### Patch Changes

- [#25](https://github.com/tmm/wagmi/pull/25) [`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175) Thanks [@tmm](https://github.com/tmm)! - update response types

- Updated dependencies [[`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175)]:
  - wagmi-private@0.0.17

## 0.0.16

### Patch Changes

- [`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba) Thanks [@tmm](https://github.com/tmm)! - add better type information for contract results

- Updated dependencies [[`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba)]:
  - wagmi-private@0.0.16

## 0.0.15

### Patch Changes

- [`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879) Thanks [@tmm](https://github.com/tmm)! - make contract read and write execute overrides param optional

- Updated dependencies [[`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879)]:
  - wagmi-private@0.0.15

## 0.0.14

### Patch Changes

- [`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408) Thanks [@tmm](https://github.com/tmm)! - add once to contract event

- Updated dependencies [[`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408)]:
  - wagmi-private@0.0.14

## 0.0.13

### Patch Changes

- [`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93) Thanks [@tmm](https://github.com/tmm)! - update readme

- Updated dependencies [[`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93)]:
  - wagmi-private@0.0.13

## 0.0.12

### Patch Changes

- [#19](https://github.com/tmm/wagmi/pull/19) [`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc) Thanks [@tmm](https://github.com/tmm)! - remove console log from walletlink connector

- Updated dependencies [[`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc)]:
  - wagmi-private@0.0.12

## 0.0.11

### Patch Changes

- [#17](https://github.com/tmm/wagmi/pull/17) [`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49) Thanks [@tmm](https://github.com/tmm)! - standardize connector provider

- Updated dependencies [[`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49)]:
  - wagmi-private@0.0.11

## 0.0.10

### Patch Changes

- [#15](https://github.com/tmm/wagmi/pull/15) [`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616) Thanks [@tmm](https://github.com/tmm)! - read and write contract functions

- Updated dependencies [[`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616)]:
  - wagmi-private@0.0.10

## 0.0.9

### Patch Changes

- [#13](https://github.com/tmm/wagmi/pull/13) [`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313) Thanks [@tmm](https://github.com/tmm)! - add testing package

- Updated dependencies [[`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313)]:
  - wagmi-private@0.0.9

## 0.0.8

### Patch Changes

- [`5332500`](https://github.com/tmm/wagmi/commit/5332500918ac240d29ffe4d2aed8566a8ac001e4) Thanks [@tmm](https://github.com/tmm)! - update signing

- Updated dependencies [[`5332500`](https://github.com/tmm/wagmi/commit/5332500918ac240d29ffe4d2aed8566a8ac001e4)]:
  - wagmi-private@0.0.8

## 0.0.7

### Patch Changes

- [`0bff89a`](https://github.com/tmm/wagmi/commit/0bff89ab2ad28b2cb9b346d1ac870e859d9278bc) Thanks [@tmm](https://github.com/tmm)! - update injected connector

- Updated dependencies [[`0bff89a`](https://github.com/tmm/wagmi/commit/0bff89ab2ad28b2cb9b346d1ac870e859d9278bc)]:
  - wagmi-private@0.0.7

## 0.0.6

### Patch Changes

- [`37d39d1`](https://github.com/tmm/wagmi/commit/37d39d174ddfa122462bbe2d02141cd61eb9db4a) Thanks [@tmm](https://github.com/tmm)! - add message signing

- Updated dependencies [[`37d39d1`](https://github.com/tmm/wagmi/commit/37d39d174ddfa122462bbe2d02141cd61eb9db4a)]:
  - wagmi-private@0.0.6

## 0.0.5

### Patch Changes

- [`d7d94f0`](https://github.com/tmm/wagmi/commit/d7d94f06f7d30468e5e39d64db63124c6315cf82) Thanks [@tmm](https://github.com/tmm)! - fix injected connector name

- Updated dependencies [[`d7d94f0`](https://github.com/tmm/wagmi/commit/d7d94f06f7d30468e5e39d64db63124c6315cf82)]:
  - wagmi-private@0.0.5

## 0.0.4

### Patch Changes

- [`29fbe29`](https://github.com/tmm/wagmi/commit/29fbe2920046b9e87a34faa04500ccf3c4f83748) Thanks [@tmm](https://github.com/tmm)! - fix external deps

- Updated dependencies [[`29fbe29`](https://github.com/tmm/wagmi/commit/29fbe2920046b9e87a34faa04500ccf3c4f83748)]:
  - wagmi-private@0.0.4

## 0.0.3

### Patch Changes

- [#6](https://github.com/tmm/wagmi/pull/6) [`8dc3a5d`](https://github.com/tmm/wagmi/commit/8dc3a5d5f418813b09663534fe585d9bcf94dbeb) Thanks [@tmm](https://github.com/tmm)! - clean up deps

- Updated dependencies [[`8dc3a5d`](https://github.com/tmm/wagmi/commit/8dc3a5d5f418813b09663534fe585d9bcf94dbeb)]:
  - wagmi-private@0.0.3

## 0.0.2

### Patch Changes

- [#4](https://github.com/tmm/wagmi/pull/4) [`2fbd821`](https://github.com/tmm/wagmi/commit/2fbd8216379bd03c9cc5c06b10b75637e75cb7d8) Thanks [@tmm](https://github.com/tmm)! - init changesets

- Updated dependencies [[`2fbd821`](https://github.com/tmm/wagmi/commit/2fbd8216379bd03c9cc5c06b10b75637e75cb7d8)]:
  - wagmi-private@0.0.2
