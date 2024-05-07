---
title: Migrate from v1 to v2
description: Guide for migrating from Wagmi v1 to v2.
---

<script setup>
import packageJson from '../../../packages/react/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Migrate from v1 to v2

## Overview

Wagmi v2 redesigns the core APIs to mesh better with [Viem](https://viem.sh) and [TanStack Query](https://tanstack.com/query/v5/docs/react). This major version transforms Wagmi into a light wrapper around these libraries, sprinkling in multichain support and account management. As such, there are some breaking changes and deprecations to be aware of outlined in this guide.

To get started, install the latest version of Wagmi and it's required peer dependencies.

::: code-group
```bash-vue [pnpm]
pnpm add wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [npm]
npm install wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [yarn]
yarn add wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [bun]
bun add wagmi viem@{{viemVersion}} @tanstack/react-query
```
:::

::: info Wagmi v2 should be the last major version that will have this many actionable breaking changes. 
Moving forward after Wagmi v2, new functionality will be opt-in with old functionality being deprecated alongside the new features. This means upgrading to the latest major versions will not require immediate changes.
:::

::: info Not ready to migrate yet?
The Wagmi v1 docs are still available at [1.x.wagmi.sh/react](https://1.x.wagmi.sh/react).
:::

## Dependencies

### Moved TanStack Query to peer dependencies

Wagmi uses [TanStack Query](https://tanstack.com/query/v5/docs/react) to manage async state, handling requests, caching, and more. With Wagmi v1, TanStack Query was an internal implementation detail. With Wagmi v2, TanStack Query is a peer dependency. A lot of Wagmi users also use TanStack Query in their apps so making it a peer dependency gives them more control and removes some custom Wagmi code internally.

If you don't normally use TanStack Query, all you need to do is set it up and mostly forget about it (we'll provide guidance around version updates).

::: code-group
```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // [!code ++]
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient() // [!code ++]

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> // [!code ++]
        {/** ... */}
      </QueryClientProvider> // [!code ++]
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

For more information on setting up TanStack Query for Wagmi, follow the [Getting Started docs](/react/getting-started#setup-tanstack-query). If you want to set up persistence for your query cache (default behavior before Wagmi v2), check out the [TanStack Query docs](https://tanstack.com/query/v5/docs/react/plugins/persistQueryClient#usage-with-react).

### Dropped CommonJS support

Wagmi v2 no longer publishes a separate `cjs` tag since very few people use this tag and ESM is the future. See [Sindre Sorhus' guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info about switching to ESM.

## Hooks

### Removed mutation setup arguments

Mutation hooks are hooks that change network or application state, sign data, or perform write operations through mutation functions. With Wagmi v1, you could pass arguments directly to these hooks instead of using them with their mutation functions. For example:

```ts{3}
// Wagmi v1
const { signMessage } = useSignMessage({
  message: 'foo bar baz',
})
```

With Wagmi v2, you must pass arguments to the mutation function instead. This follows the same behavior as [TanStack Query](https://tanstack.com/query/v5/docs/react/guides/mutations) mutations and improves type-safety.

```tsx
import { useSignMessage } from 'wagmi'

const { signMessage } = useSignMessage({ message: 'foo bar baz' }) // [!code --]
const { signMessage } = useSignMessage() // [!code ++]

<button
  onClick={() => signMessage()} // [!code --]
  onClick={() => signMessage({ message: 'foo bar baz' })} // [!code ++]
>
  Sign message
</button>
```

### Moved TanStack Query parameters to `query` property

Previously, you could pass TanStack Query parameters, like `enabled` and `staleTime`, directly to hooks. In Wagmi v2, TanStack Query parameters are now moved to the `query` property. This allows Wagmi to better support TanStack Query type inference, control for future breaking changes since [TanStack Query is now a peer dependency](#moved-tanstack-query-to-peer-dependencies), and expose Wagmi-related hook property at the top-level of editor features, like autocomplete.

```tsx
useReadContract({
  enabled: false, // [!code --]
  staleTime: 1_000, // [!code --]
  query: { // [!code ++]
    enabled: false, // [!code ++]
    staleTime: 1_000, // [!code ++]
  }, // [!code ++]
})
```

### Removed watch property

The `watch` property was removed from all hooks besides [`useBlock`](/react/api/hooks/useBlock) and [`useBlockNumber`](/react/api/hooks/useBlockNumber). This property allowed hooks to internally listen for block changes and automatically refresh their data. In Wagmi v2, you can compose `useBlock` or `useBlockNumber` along with [`React.useEffect`](https://react.dev/reference/react/useEffect) to achieve the same behavior. Two different approaches are outlined for `useBalance` below.

::: code-group
```ts [invalidateQueries]
import { useQueryClient } from '@tanstack/react-query' // [!code ++]
import { useEffect } from 'react' // [!code ++]
import { useBlockNumber, useBalance } from 'wagmi' // [!code ++]

const queryClient = useQueryClient() // [!code ++]
const { data: blockNumber } = useBlockNumber({ watch: true }) // [!code ++]
const { data: balance, queryKey } = useBalance({ // [!code ++]
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  watch: true, // [!code --]
})

useEffect(() => { // [!code ++]
  queryClient.invalidateQueries({ queryKey }) // [!code ++]
}, [blockNumber, queryClient]) // [!code ++]
```
```ts [refetch]
import { useEffect } from 'react' // [!code ++]
import { useBlockNumber, useBalance } from 'wagmi' // [!code ++]

const { data: blockNumber } = useBlockNumber({ watch: true }) // [!code ++]
const { data: balance, refetch } = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  watch: true, // [!code --]
})

useEffect(() => { // [!code ++]
  refetch() // [!code ++]
}, [blockNumber]) // [!code ++]
```
:::

This is a bit more code, but removes a lot of internal code from hooks that can slow down your app when not used and gives you more control. For example, you can easily refresh data every five blocks instead of every block.

```ts
const { data: blockNumber } = useBlockNumber({ watch: true })
const { data: balance, queryKey } = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})

useEffect(() => {
  if (blockNumber % 5 === 0) // [!code focus]
    queryClient.invalidateQueries({ queryKey }) // [!code focus]
}, [blockNumber, queryClient])
```

### Removed suspense property

Wagmi used to support an experimental `suspense` property via TanStack Query. Since TanStack Query [removed `suspense`](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5#new-hooks-for-suspense) from its `useQuery` hook, it is no longer supported by Wagmi Hooks.

Instead, you can use `useSuspenseQuery` along with TanStack Query-related exports from the `'wagmi/query'` entrypoint.

```ts
import { useSuspenseQuery } from '@tanstack/react-query' // [!code ++]
import { useConfig } from 'wagmi' // [!code ++]
import { getBalanceQueryOptions } from 'wagmi/query' // [!code ++]
import { useBalance } from 'wagmi' // [!code --]

const config = useConfig() // [!code ++]
const options = getBalanceQueryOptions(config, { address: '0x…' }) // [!code ++]
const result = useSuspenseQuery(options) // [!code ++]
const result = useBalance({ // [!code --]
  address: '0x…', // [!code --]
  suspense: true, // [!code --]
}) // [!code --]
```

### Removed prepare hooks

`usePrepareContractWrite` and `usePrepareSendTransaction` were removed and replaced with idiomatic Viem alternatives. For `usePrepareContractWrite`, use [`useSimulateContract`](/react/api/hooks/useSimulateContract). Similar to `usePrepareContractWrite`, `useSimulateContract` composes well with `useWriteContract`

```tsx
import { usePrepareContractWrite, useWriteContract } from 'wagmi' // [!code --]
import { useSimulateContract, useWriteContract } from 'wagmi' // [!code ++]

const { config } = usePrepareContractWrite({ // [!code --]
const { data } = useSimulateContract({ // [!code ++]
  address: '0x',
  abi: [{
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  }],
  functionName: 'transferFrom',
  args: ['0x', '0x', 123n],
})
const { write } = useWriteContract(config) // [!code --]
const { writeContract } = useWriteContract() // [!code ++]

<button
  disabled={!Boolean(write)} // [!code --]
  onClick={() => write()} // [!code --]
  disabled={!Boolean(data?.request)} // [!code ++]
  onClick={() => writeContract(data!.request)} // [!code ++]
>
  Write contract
</button>
```

Instead of `usePrepareSendTransaction`, use [`useEstimateGas`](/react/api/hooks/useEstimateGas). You can pass `useEstimateGas` `data` to `useSendTransaction` to compose the two hooks.

```tsx
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi' // [!code --]
import { useEstimateGas, useSendTransaction } from 'wagmi' // [!code ++]
import { parseEther } from 'viem'

const { config } = usePrepareSendTransaction({ // [!code --]
const { data } = useEstimateGas({ // [!code ++]
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.01'),
})
const { sendTransaction } = useSendTransaction(config) // [!code --]
const { sendTransaction } = useSendTransaction() // [!code ++]

<button
  disabled={!Boolean(sendTransaction)} // [!code --]
  onClick={() => sendTransaction()} // [!code --]
  disabled={!Boolean(data)} // [!code ++]
  onClick={() => sendTransaction({ // [!code ++]
    gas: data, // [!code ++]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code ++]
    value: parseEther('0.01'), // [!code ++]
  })} // [!code ++]
>
  Send transaction
</button>
```

This might seem like more work, but it gives you more control and is more accurate representation of what is happening under the hood.

### Removed `useNetwork` hook

The `useNetwork` hook was removed since the connected chain is typically based on the connected account. Use [`useAccount`](/react/api/hooks/useAccount) to get the connected `chain`.

```ts
import { useNetwork } from 'wagmi' // [!code --]
import { useAccount } from 'wagmi' // [!code ++]

const { chain } = useNetwork() // [!code --]
const { chain } = useAccount() // [!code ++]
```

Use `useConfig` for the list of `chains` set up with the Wagmi [`Config`](/react/api/createConfig#chains).

```ts
import { useNetwork } from 'wagmi' // [!code --]
import { useConfig } from 'wagmi' // [!code ++]

const { chains } = useNetwork() // [!code --]
const { chains } = useConfig() // [!code ++]
```

### Removed `onConnect` and `onDisconnect` callbacks from `useAccount`

The `onConnect` and `onDisconnect` callbacks were removed from the `useAccount` hook since it is frequently used without these callbacks so it made sense to extract these into a new API, [`useAccountEffect`](/react/api/hooks/useAccountEffect), rather than clutter the `useAccount` hook.

```ts
import { useAccount } from 'wagmi' // [!code --]
import { useAccountEffect } from 'wagmi' // [!code ++]

useAccount({ // [!code --]
useAccountEffect({ // [!code ++]
  onConnect(data) {
    console.log('connected', data)
  },
  onDisconnect() {
    console.log('disconnected')
  },
}) 
```

### Removed `useWebSocketPublicClient`

The Wagmi [`Config`](/react/api/createConfig) does not separate transport types anymore. Simply use Viem's [`webSocket`](https://viem.sh/docs/clients/transports/websocket.html) transport instead when setting up your Wagmi `Config`. You can get Viem `Client` instance with this transport attached by using [`useClient`](/react/api/hooks/useClient) or [`usePublicClient`](/react/api/hooks/usePublicClient).

### Removed `useInfiniteReadContracts` `paginatedIndexesConfig`

In the spirit of removing unnecessary abstractions, `paginatedIndexesConfig` was removed. Use `useInfiniteReadContracts`'s `initialPageParam` and `getNextPageParam` parameters along with `fetchNextPage`/`fetchPreviousPage` from the result instead or copy `paginatedIndexesConfig`'s implementation to your codebase.

See the [TanStack Query docs](https://tanstack.com/query/v5/docs/react/guides/infinite-queries) for more information on infinite queries.

### Updated `useSendTransaction` and `useWriteContract` return type

Updated [`useSendTransaction`](/react/api/hooks/useSendTransaction) and [`useWriteContract`](/react/api/hooks/useWriteContract) return type from `` { hash: `0x${string}` } `` to `` `0x${string}` ``.

```ts
const result = useSendTransaction()
result.data?.hash // [!code --]
result.data // [!code ++]
```

### Updated `useConnect` return type

Updated [`useConnect`](/react/api/hooks/useConnect) return type from `` { account: Address; chain: { id: number; unsupported?: boolean }; connector: Connector } `` to `` { accounts: readonly Address[]; chainId: number } ``. This better reflects the ability to have multiple accounts per connector.

### Renamed parameters and return types

All hook parameters and return types follow the naming pattern of `[PascalCaseHookName]Parameters` and `[PascalCaseHookName]ReturnType`. For example, `UseAccountParameters` and `UseAccountReturnType`.

```ts
import { UseAccountConfig, UseAccountResult } from 'wagmi' // [!code --]
import { UseAccountParameters, UseAccountReturnType } from 'wagmi' // [!code ++]
```

## Connectors

### Updated connector API

In order to maximize type-safety and ease of creating connectors, the connector API changed. Follow the [Creating Connectors guide](/dev/creating-connectors) for more info on creating new connectors and converting Wagmi v1 connectors.

### Removed individual entrypoints

Previously, each connector had it's own entrypoint to optimize tree-shaking. Since all connectors now have [`package.json#sideEffects`](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) enabled, this is no longer necessary and the entrypoint is unified. Use the `'wagmi/connectors'` entrypoint instead.

```ts
import { InjectedConnector } from 'wagmi/connectors/injected' // [!code --]
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet' // [!code --]
import { coinbaseWallet, injected } from 'wagmi/connectors' // [!code ++]
```

### Removed `MetaMaskConnector`

The `MetaMaskConnector` was removed since it was nearly the same thing as the `InjectedConnector`. Use the [`injected`](/react/api/connectors/injected) connector instead, along with the [`target`](/react/api/connectors/injected#target) parameter set to `'metaMask'`, for the same behavior.

```ts
import { MetaMaskConnector } from 'wagmi/connectors/metaMask' // [!code --]
import { injected } from 'wagmi/connectors' // [!code ++]

const connector = new MetaMaskConnector() // [!code --]
const connector = injected({ target: 'metaMask' }) // [!code ++]
```
### Renamed connectors

In Wagmi v1, connectors were classes you needed to instantiate. In Wagmi v2, connectors are functions. As a result, the API has changed. Connectors have the following new names:

- `CoinbaseWalletConnector` is now [`coinbaseWallet`](/react/api/connectors/coinbaseWallet).
- `InjectedConnector` is now [`injected`](/react/api/connectors/injected).
- `SafeConnector` is now [`safe`](/react/api/connectors/safe).
- `WalletConnectConnector` is now [`walletConnect`](/react/api/connectors/walletConnect).

To create a connector, you now call the connector function with parameters.

```ts
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect' // [!code --]
import { walletConnect } from 'wagmi/connectors' // [!code ++]

const connector = new WalletConnectConnector({ // [!code --]
const connector = walletConnect({ // [!code ++]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

### Removed `WalletConnectLegacyConnector`

WalletConnect v1 was sunset June 28, 2023. Use the [`walletConnect`](/react/api/connectors/walletConnect) connector instead.

```ts
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy' // [!code --]
import { walletConnect } from 'wagmi/connectors' // [!code ++]

const connector = new WalletConnectLegacyConnector({ // [!code --]
const connector = walletConnect({ // [!code ++]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

## Chains

### Updated `'wagmi/chains'` entrypoint

Chains now live in the [Viem repository](https://github.com/wevm/viem). As a result, the `'wagmi/chains'` entrypoint now proxies all chains from `'viem/chains'` directly.

### Removed `mainnet` and `sepolia` from main entrypoint

Since the `'wagmi/chains'` entrypoint now proxies `'viem/chains'`, `mainnet` and `sepolia` were removed from the main entrypoint. Use the `'wagmi/chains'` entrypoint instead.

```ts
import { mainnet, sepolia } from 'wagmi' // [!code --]
import { mainnet, sepolia } from 'wagmi/chains' // [!code ++]
```

## Errors

A number of errors were renamed to better reflect their functionality or replaced by Viem errors.

## Miscellaneous

### Removed internal ENS name normalization

Before v2, Wagmi handled ENS name normalization internally for `useEnsAddress`, `useEnsAvatar`, and `useEnsResolver`, using Viem's [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function. This added extra bundle size as full normalization is quite heavy. For v2, you must normalize ENS names yourself before passing them to these hooks. You can use Viem's `normalize` function or any other function that performs [UTS-46 normalization](https://unicode.org/reports/tr46).

```ts
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens' // [!code ++]

const result = useEnsAddress({
  name: 'wevm.eth', // [!code --]
  name: normalize('wevm.eth'), // [!code ++]
})
```

By inverting control, Wagmi let's you choose how much normalization to do. For example, maybe your project only allows ENS names that are rcnumeric so no normalization is not needed. Check out the [ENS documentation](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) for more information on normalizing names.

### Removed `configureChains`

The Wagmi v2 `Config` now has native multichain support using the [`chains`](/react/api/createConfig) parameter so the `configureChains` function is no longer required.

```ts
import { configureChains, createConfig } from 'wagmi' // [!code --]
import { http, createConfig } from 'wagmi' // [!code ++]
import { mainnet, sepolia } from 'wagmi/chains'

const { chains, publicClient } = configureChains( // [!code --]
  [mainnet, sepolia], // [!code --]
  [publicProvider(), publicProvider()], // [!code --]
) // [!code --]

export const config = createConfig({
  publicClient, // [!code --]
  chains: [mainnet, sepolia], // [!code ++]
  transports: { // [!code ++]
    [mainnet.id]: http(), // [!code ++]
    [sepolia.id]: http(), // [!code ++]
  }, // [!code ++]
})
```

### Removed ABI exports

Import from Viem instead.

```ts
import { erc20ABI } from 'wagmi' // [!code --]
import { erc20Abi } from 'viem' // [!code ++]
```

### Removed `'wagmi/providers/*` entrypoints

It never made sense that we would have provider URLs hardcoded in the Wagmi codebase. Use [Viem transports](https://viem.sh/docs/clients/intro.html#transports) along with RPC provider URLs instead.

```ts
import { alchemyProvider } from 'wagmi/providers/alchemy' // [!code --]
import { http } from 'viem' // [!code ++]

const transport = http('https://mainnet.example.com')
```

### Updated `createConfig` parameters

- Removed `autoConnect`. The reconnecting behavior is now managed by React and not related to the Wagmi `Config`. Use `WagmiProvider` [`reconnectOnMount`](/react/api/WagmiProvider#reconnectonmount) or [`useReconnect`](/react/api/hooks/useReconnect) hook instead.
- Removed `publicClient` and `webSocketPublicClient`. Use [`transports`](/react/api/createConfig#transports) or [`client`](/react/api/createConfig#client) instead.
- Removed `logger`. Wagmi no longer logs debug information to console.

### Updated `Config` object

- Removed `config.connector`. Use `config.state.connections.get(config.state.current)?.connector` instead.
- Removed `config.data`. Use `config.state.connections.get(config.state.current)` instead.
- Removed `config.error`. Was unused and not needed.
- Removed `config.lastUsedChainId`. Use `config.state.connections.get(config.state.current)?.chainId` instead.
- Removed `config.publicClient`. Use [`config.getClient()`](/react/api/createConfig#getclient) or [`getPublicClient`](/core/api/actions/getPublicClient) instead.
- Removed `config.status`. Use [`config.state.status`](/react/api/createConfig#status) instead.
- Removed `config.webSocketClient`. Use [`config.getClient()`](/react/api/createConfig#getclient) or [`getPublicClient`](/core/api/actions/getPublicClient) instead.
- Removed `config.clearState`. Was unused and not needed.
- Removed `config.autoConnect()`. Use [`reconnect`](/core/api/actions/reconnect) action instead.
- Renamed `config.setConnectors`. Use `config._internal.setConnectors` instead.
- Removed `config.setLastUsedConnector`. Use `config.storage?.setItem('recentConnectorId', connectorId)` instead.
- Removed `getConfig`. `config` should be passed explicitly to actions instead of using global `config`.

## Deprecations

### Renamed `WagmiConfig`

`WagmiConfig` was renamed to [`WagmiProvider`](/react/api/WagmiProvider) to reduce confusion with the Wagmi [`Config`](/react/api/createConfig) type. React Context Providers usually follow the naming schema `*Provider` so this is a more idiomatic name. Now that Wagmi no longer uses Ethers.js (since Wagmi v1), the term "Provider" is less overloaded.

::: code-group
```tsx [app.tsx]
import { WagmiConfig } from 'wagmi' // [!code --]
import { WagmiProvider } from 'wagmi' // [!code ++]
import { config } from './config'

function App() {
  return (
    <WagmiConfig config={config}> // [!code --]
    <WagmiProvider config={config}> // [!code ++]
      {/** ... */}
    </WagmiProvider> // [!code ++]
    </WagmiConfig> // [!code --]
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### Deprecated `useBalance` `token` parameter

Moving forward, `useBalance` will only work for native currencies, thus the `token` parameter is no longer supported. Use [`useReadContracts`](/react/api/hooks/useReadContracts) instead.

```ts
import { useBalance } from 'wagmi' // [!code --]
import { useReadContracts } from 'wagmi' // [!code ++]
import { erc20Abi } from 'viem' // [!code ++]

const result = useBalance({ // [!code --]
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code --]
  token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
}) // [!code --]
const result = useReadContracts({ // [!code ++]
  allowFailure: false, // [!code ++]
  contracts: [ // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'balanceOf', // [!code ++]
      args: ['0x4557B18E779944BFE9d78A672452331C186a9f48'], // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'decimals', // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'symbol', // [!code ++]
    }, // [!code ++]
  ] // [!code ++]
}) // [!code ++]
```

### Deprecated `useBalance` `unit` parameter and `formatted` return value

Moving forward, `useBalance` will not accept the `unit` parameter or return a `formatted` value. Instead you can call `formatUnits` from Viem directly or use another number formatting library, like [dnum](https://github.com/bpierre/dnum) instead.

```ts
import { formatUnits } from 'viem' // [!code ++]
import { useBalance } from 'wagmi'

const result = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  unit: 'ether', // [!code --]
})
result.data!.formatted // [!code --]
formatUnits(result.data!.value, result.data!.decimals) // [!code ++]
```

### Deprecated `useToken`

Moving forward, `useToken` is no longer supported. Use [`useReadContracts`](/react/api/hooks/useReadContracts) instead.

```ts
import { useToken } from 'wagmi' // [!code --]
import { useReadContracts } from 'wagmi' // [!code ++]
import { erc20Abi } from 'viem' // [!code ++]

const result = useToken({ // [!code --]
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
}) // [!code --]
const result = useReadContracts({ // [!code ++]
  allowFailure: false, // [!code ++]
  contracts: [ // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'decimals', // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'name', // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'symbol', // [!code ++]
    }, // [!code ++]
    { // [!code ++]
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code ++]
      abi: erc20Abi, // [!code ++]
      functionName: 'totalSupply', // [!code ++]
    }, // [!code ++]
  ] // [!code ++]
}) // [!code ++]
```

### Deprecated `formatUnits` parameters and return values

The `formatUnits` parameter and related return values (e.g. `result.formatted`) are deprecated for the following hooks:

- [`useEstimateFeesPerGas`](/react/api/hooks/useEstimateFeesPerGas)
- [`useToken`](/react/api/hooks/useToken)

Instead you can call `formatUnits` from Viem directly or use another number formatting library, like [dnum](https://github.com/bpierre/dnum) instead.

```ts
import { formatUnits } from 'viem' // [!code ++]

const result = useToken({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  formatUnits: 'ether',
})
result.data!.totalSupply.formatted  // [!code --]
formatUnits(result.data!.totalSupply.value, 18)  // [!code ++]
```

This allows us to invert control to users so they can handle number formatting however they want, taking into account precision, localization, and more.

### Renamed hooks

The following hooks were renamed to better reflect their functionality and underlying [Viem](https://viem.sh) actions:

- `useContractRead` is now [`useReadContract`](/react/api/hooks/useReadContract)
- `useContractReads` is now [`useReadContracts`](/react/api/hooks/useReadContracts)
- `useContractWrite` is now [`useWriteContract`](/react/api/hooks/useWriteContract)
- `useContractEvent` is now [`useWatchContractEvent`](/react/api/hooks/useWatchContractEvent)
- `useContractInfiniteReads` is now [`useInfiniteReadContracts`](/react/api/hooks/useInfiniteReadContracts)
- `useFeeData` is now [`useEstimateFeesPerGas`](/react/api/hooks/useEstimateFeesPerGas)
- `useSwitchNetwork` is now [`useSwitchChain`](/react/api/hooks/useSwitchChain)
- `useWaitForTransaction` is now [`useWaitForTransactionReceipt`](/react/api/hooks/useWaitForTransactionReceipt)

### Miscellaneous

- `WagmiConfigProps` renamed to [`WagmiProviderProps`](/react/api/WagmiProvider#parameters).
- `Context` renamed to [`WagmiContext`](/react/api/WagmiProvider#context).
