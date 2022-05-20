# @wagmi/core

## 0.3.0

### Minor Changes

- [#408](https://github.com/tmm/wagmi/pull/408) [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** The `connectors` option on `createClient` no longer reacts to chain switching.

  **Passing a function to `connectors` has been deprecated.**

  If you previously derived an RPC URL from the `chainId` in `connectors`, you will need to migrate to use the [`configureChains` API](https://wagmi.sh/docs/providers/configuring-chains).

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
          options: { name: 'Injected' },
        }),
      ]
    },
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

  const { chains } = configureChains(defaultChains, [
    alchemyProvider({ alchemyId }),
    publicProvider(),
  ])

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
        options: { name: 'Injected' },
      }),
    ],
  })
  ```

* [#468](https://github.com/tmm/wagmi/pull/468) [`44a884b`](https://github.com/tmm/wagmi/commit/44a884b84171c418f57701e80ef8de972948ef0b) Thanks [@tmm](https://github.com/tmm)! - **Breaking:** Duplicate exports with different names and the same functionality were removed to simplify the public API. In addition, confusing exports were renamed to be more descriptive.

  - `createWagmiClient` alias was removed. Use `createClient` instead.
  - `useWagmiClient` alias was removed. Use `useClient` instead.
  - `WagmiClient` alias was removed. Use `Client` instead.
  - `createWagmiStorage` alias was removed. Use `createStorage` instead.
  - `Provider` was renamed and `WagmiProvider` alias was removed. Use `WagmiConfig` instead.

- [#408](https://github.com/tmm/wagmi/pull/408) [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a) Thanks [@jxom](https://github.com/jxom)! - Add `configureChains` API.

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
          options: { name: 'Injected' },
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
        options: { name: 'Injected' },
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

- [#473](https://github.com/tmm/wagmi/pull/473) [`a54f3e2`](https://github.com/tmm/wagmi/commit/a54f3e23ea385ed8aa4ad188128d7089ba20f83e) Thanks [@cesargdm](https://github.com/cesargdm)! - Add workaround for CoinbaseWalletSDK import on esbuild

* [#447](https://github.com/tmm/wagmi/pull/447) [`b9ebf78`](https://github.com/tmm/wagmi/commit/b9ebf782e0900725bcb76483686b30f09d357ebd) Thanks [@tmm](https://github.com/tmm)! - Fix case where connector disconnected while app was closed and stale data was returned when autoconnecting. For example, [MetaMask was locked](https://github.com/tmm/wagmi/issues/444) when page was closed.

## 0.2.5

### Patch Changes

- [`4e03666`](https://github.com/tmm/wagmi/commit/4e03666428d42fc9186c617001b5eb356229677e) Thanks [@tmm](https://github.com/tmm)! - bump dependencies #429
  add imToken support for WC switch chains #432
  fix MetaMask and Brave Wallet collision #436

## 0.2.4

### Patch Changes

- [#421](https://github.com/tmm/wagmi/pull/421) [`a232b3f`](https://github.com/tmm/wagmi/commit/a232b3ff5cc41e882c4d2a34c599a8cb670edd2b) Thanks [@tmm](https://github.com/tmm)! - fix erc721 abi

## 0.2.3

### Patch Changes

- [#412](https://github.com/tmm/wagmi/pull/412) [`80bef4f`](https://github.com/tmm/wagmi/commit/80bef4ff3f714b0b8f896f1b4b658acc7266299b) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Import providers from `ethers` peer dependency rather than `@ethersproject/providers` to avoid multiple conflicting versions being installed

## 0.2.2

### Patch Changes

- [`018c2a1`](https://github.com/tmm/wagmi/commit/018c2a11b22ee513571cc7f83fd63f7eb169ee70) Thanks [@tmm](https://github.com/tmm)! - - warn and fallback to default client #380

  - remove signerOrProvider option from read contract #390

  - MetaMaskConnector #391

## 0.2.1

### Patch Changes

- [`afc4607`](https://github.com/tmm/wagmi/commit/afc46071e91601ab8a2b465524da796cd60b6ad4) Thanks [@tmm](https://github.com/tmm)! - - Fix time scaling e9593df
  - Use fully-specified path for use-sync-external-store import 7b235c1
  - Update serialize 236fc17

## 0.2.0

### Minor Changes

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - don't persist account data when `autoConnect` is falsy

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - fix(@wagmi/core): persist connector chains to local storage

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Initial 0.3.0 release

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Add `cacheOnBlock` config for `useContractRead`
  Update `react-query` to v4
  Fix `watchBlockNumber` listener leak

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - add `connecting` event to connectors

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Fix issue where `getProvider` was not being awaited in `getSigner`

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - remove storage persistence of `connector`
  - add `chains` to client state

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

## 0.2.0-next.18

### Patch Changes

- showtime

## 0.2.0-next.17

### Patch Changes

- update block explorers and rpc urls structure

## 0.2.0-next.16

### Patch Changes

- last beta

## 0.2.0-next.15

### Patch Changes

- update zustand

## 0.2.0-next.14

### Minor Changes

- Add `cacheOnBlock` config for `useContractRead`
- Update `react-query` to v4
- Fix `watchBlockNumber` listener leak

## 0.2.0-next.13

### Patch Changes

- keep previous data when watching

## 0.2.0-next.12

### Patch Changes

- add chainId to actions and hooks

## 0.2.0-next.11

### Patch Changes

- fix stale connectors when switching chains

## 0.2.0-next.10

### Patch Changes

- republish

## 0.2.0-next.9

### Patch Changes

- improve type support for ethers providers

## 0.2.0-next.8

### Patch Changes

- update babel target

## 0.2.0-next.7

### Minor Changes

- - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

## 0.2.0-next.6

### Minor Changes

- add `connecting` event to connectors

## 0.2.0-next.5

### Minor Changes

- don't persist account data when `autoConnect` is falsy

## 0.2.0-next.4

### Minor Changes

- remove storage persistence of `connector`
- add `chains` to client state

## 0.2.0-next.3

### Minor Changes

- Fix issue where `getProvider` was not being awaited in `getSigner`

## 0.2.0-next.2

### Minor Changes

- fix: persist connector chains to local storage

## 0.2.0-next.1

### Minor Changes

- Initial 0.3.0 release

## 0.1.22

### Patch Changes

- [`747d895`](https://github.com/tmm/wagmi/commit/747d895a54b562958afde34b1d34e81ab5039e2c) Thanks [@tmm](https://github.com/tmm)! - add warning to WalletLinkConnector

## 0.1.21

### Patch Changes

- [`c858c51`](https://github.com/tmm/wagmi/commit/c858c51b44d9039f1d0db5bcf016639f47d1931f) Thanks [@tmm](https://github.com/tmm)! - update coinbase connector

## 0.1.20

### Patch Changes

- [#326](https://github.com/tmm/wagmi/pull/326) [`36e6989`](https://github.com/tmm/wagmi/commit/36e69894f4c27aaad7fb6d678476c8bb870244bb) Thanks [@0xGabi](https://github.com/0xGabi)! - Add Gnosis Chain

## 0.1.19

### Patch Changes

- [`d467df6`](https://github.com/tmm/wagmi/commit/d467df6374210dbc4b016788b4beb4fded54cb4d) Thanks [@tmm](https://github.com/tmm)! - fix global type leaking

## 0.1.18

### Patch Changes

- [#294](https://github.com/tmm/wagmi/pull/294) [`1d253f3`](https://github.com/tmm/wagmi/commit/1d253f3a59b61d24c88d25c99decd84a6c734e5d) Thanks [@tmm](https://github.com/tmm)! - change babel target

## 0.1.17

### Patch Changes

- [#292](https://github.com/tmm/wagmi/pull/292) [`53c9be1`](https://github.com/tmm/wagmi/commit/53c9be17ee0c2ae6b8f34f2351b8858257b3f5f2) Thanks [@tmm](https://github.com/tmm)! - fix private fields

## 0.1.16

### Patch Changes

- [`79a2499`](https://github.com/tmm/wagmi/commit/79a249989029f818c32c0e84c0dd2c75e8aa990a) Thanks [@tmm](https://github.com/tmm)! - update build target to es2021

## 0.1.15

### Patch Changes

- [`f9790b5`](https://github.com/tmm/wagmi/commit/f9790b55600df09c77bb8ca349c5a3457df1b07c) Thanks [@tmm](https://github.com/tmm)! - fix WalletConnect issue

## 0.1.14

### Patch Changes

- [#236](https://github.com/tmm/wagmi/pull/236) [`53bad61`](https://github.com/tmm/wagmi/commit/53bad615788764e31121678083c382c1bd042fe8) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Updated `@walletconnect/ethereum-provider` to [v1.7.4](https://github.com/WalletConnect/walletconnect-monorepo/releases/tag/1.7.4)

## 0.1.13

### Patch Changes

- [`8e9412a`](https://github.com/tmm/wagmi/commit/8e9412af71958301ae2f9748febb936e79900aa0) Thanks [@tmm](https://github.com/tmm)! - bump walletlink

## 0.1.12

### Patch Changes

- [#210](https://github.com/tmm/wagmi/pull/210) [`684468a`](https://github.com/tmm/wagmi/commit/684468aee3e42a1ce2b4b599f3f17d1819213de8) Thanks [@tmm](https://github.com/tmm)! - update chains to match chainslist.org

## 0.1.11

### Patch Changes

- [#195](https://github.com/tmm/wagmi/pull/195) [`25b6083`](https://github.com/tmm/wagmi/commit/25b6083a662a0236794d1765343467691421c14b) Thanks [@tmm](https://github.com/tmm)! - rename wagmi-private to wagmi-core

## 0.1.10

### Patch Changes

- [#192](https://github.com/tmm/wagmi/pull/192) [`428cedb`](https://github.com/tmm/wagmi/commit/428cedb3dec4e3e4b9f4559c8e65932e05f94e05) Thanks [@tmm](https://github.com/tmm)! - rename core and testing packages

## 0.1.9

### Patch Changes

- [#190](https://github.com/tmm/wagmi/pull/190) [`7034bb8`](https://github.com/tmm/wagmi/commit/7034bb868412b9f481b206371280e84c2d52706d) Thanks [@tmm](https://github.com/tmm)! - add shim for metamask chain changed to prevent disconnect

## 0.1.8

### Patch Changes

- [#137](https://github.com/tmm/wagmi/pull/137) [`dceeb43`](https://github.com/tmm/wagmi/commit/dceeb430d9021fbf98366859cb1cd0149e80c55c) Thanks [@tmm](https://github.com/tmm)! - add siwe guide

## 0.1.7

### Patch Changes

- [#127](https://github.com/tmm/wagmi/pull/127) [`f05b031`](https://github.com/tmm/wagmi/commit/f05b0310f7f7e6447e9b6c81cedbb27dcf2f3649) Thanks [@tmm](https://github.com/tmm)! - update switch chain return type

## 0.1.6

### Patch Changes

- [`1412eed`](https://github.com/tmm/wagmi/commit/1412eed0d1494bb4f8c6845a0e890f79e4e68e03) Thanks [@tmm](https://github.com/tmm)! - add frame to injected

## 0.1.5

### Patch Changes

- [`e338c3b`](https://github.com/tmm/wagmi/commit/e338c3b6cc255742be6a67593aa5da6c17e90fbd) Thanks [@tmm](https://github.com/tmm)! - checksum connector address on change events

  add shim to injected connector for simulating disconnect

## 0.1.4

### Patch Changes

- [`0176c4e`](https://github.com/tmm/wagmi/commit/0176c4e83fb0c5f159c3c802a1da3d6deb2184ae) Thanks [@tmm](https://github.com/tmm)! - added switchChain to WalletConnect and WalletLink connectors

## 0.1.3

### Patch Changes

- [`071d7fb`](https://github.com/tmm/wagmi/commit/071d7fbca35ec4832700b5343661ceb2dae20598) Thanks [@tmm](https://github.com/tmm)! - add hardhat chain

## 0.1.2

### Patch Changes

- [`78bade9`](https://github.com/tmm/wagmi/commit/78bade9d0da97ab38a7e6594c34e3841ec1c8fe6) Thanks [@tmm](https://github.com/tmm)! - add type definitions

## 0.1.1

### Patch Changes

- [#56](https://github.com/tmm/wagmi/pull/56) [`2ebfd8e`](https://github.com/tmm/wagmi/commit/2ebfd8e85b560f25cd46cff04619c84643cab297) Thanks [@tmm](https://github.com/tmm)! - add chain support status

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

## 0.0.17

### Patch Changes

- [#25](https://github.com/tmm/wagmi/pull/25) [`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175) Thanks [@tmm](https://github.com/tmm)! - update response types

## 0.0.16

### Patch Changes

- [`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba) Thanks [@tmm](https://github.com/tmm)! - add better type information for contract results

## 0.0.15

### Patch Changes

- [`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879) Thanks [@tmm](https://github.com/tmm)! - make contract read and write execute overrides param optional

## 0.0.14

### Patch Changes

- [`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408) Thanks [@tmm](https://github.com/tmm)! - add once to contract event

## 0.0.13

### Patch Changes

- [`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93) Thanks [@tmm](https://github.com/tmm)! - update readme

## 0.0.12

### Patch Changes

- [#19](https://github.com/tmm/wagmi/pull/19) [`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc) Thanks [@tmm](https://github.com/tmm)! - remove console log from walletlink connector

## 0.0.11

### Patch Changes

- [#17](https://github.com/tmm/wagmi/pull/17) [`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49) Thanks [@tmm](https://github.com/tmm)! - standardize connector provider

## 0.0.10

### Patch Changes

- [#15](https://github.com/tmm/wagmi/pull/15) [`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616) Thanks [@tmm](https://github.com/tmm)! - read and write contract functions

## 0.0.9

### Patch Changes

- [#13](https://github.com/tmm/wagmi/pull/13) [`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313) Thanks [@tmm](https://github.com/tmm)! - add testing package

## 0.0.8

### Patch Changes

- [`5332500`](https://github.com/tmm/wagmi/commit/5332500918ac240d29ffe4d2aed8566a8ac001e4) Thanks [@tmm](https://github.com/tmm)! - update signing

## 0.0.7

### Patch Changes

- [`0bff89a`](https://github.com/tmm/wagmi/commit/0bff89ab2ad28b2cb9b346d1ac870e859d9278bc) Thanks [@tmm](https://github.com/tmm)! - update injected connector

## 0.0.6

### Patch Changes

- [`37d39d1`](https://github.com/tmm/wagmi/commit/37d39d174ddfa122462bbe2d02141cd61eb9db4a) Thanks [@tmm](https://github.com/tmm)! - add message signing

## 0.0.5

### Patch Changes

- [`d7d94f0`](https://github.com/tmm/wagmi/commit/d7d94f06f7d30468e5e39d64db63124c6315cf82) Thanks [@tmm](https://github.com/tmm)! - fix injected connector name

## 0.0.4

### Patch Changes

- [`29fbe29`](https://github.com/tmm/wagmi/commit/29fbe2920046b9e87a34faa04500ccf3c4f83748) Thanks [@tmm](https://github.com/tmm)! - fix external deps

## 0.0.3

### Patch Changes

- [#6](https://github.com/tmm/wagmi/pull/6) [`8dc3a5d`](https://github.com/tmm/wagmi/commit/8dc3a5d5f418813b09663534fe585d9bcf94dbeb) Thanks [@tmm](https://github.com/tmm)! - clean up deps

## 0.0.2

### Patch Changes

- [#4](https://github.com/tmm/wagmi/pull/4) [`2fbd821`](https://github.com/tmm/wagmi/commit/2fbd8216379bd03c9cc5c06b10b75637e75cb7d8) Thanks [@tmm](https://github.com/tmm)! - init changesets
