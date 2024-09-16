---
title: Migrate from v1 to v2
titleTemplate: Wagmi Core
description: Guide for migrating from Wagmi Core v1 to v2.
---

<script setup>
import packageJson from '../../../packages/core/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Migrate from v1 to v2

Wagmi Core v2 redesigns the core APIs to mesh better with [Viem](https://viem.sh). This major version transforms Wagmi into a light wrapper around Viem, sprinkling in multichain support and account management. As such, there are some breaking changes and deprecations to be aware of outlined in this guide.

To get started, install the latest version of Wagmi and it's required peer dependencies.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/core viem@{{viemVersion}} @wagmi/connectors
```

```bash-vue [npm]
npm install @wagmi/core viem@{{viemVersion}} @wagmi/connectors
```

```bash-vue [yarn]
yarn add @wagmi/core viem@{{viemVersion}} @wagmi/connectors
```

```bash-vue [bun]
bun add @wagmi/core viem@{{viemVersion}} @wagmi/connectors
```
:::

::: info Wagmi Core v2 should be the last major version that will have this many actionable breaking changes. 
Moving forward, new functionality will be opt-in with old functionality being deprecated alongside the new features. This means upgrading to the latest major versions will not require immediate changes.
:::

::: info Not ready to migrate yet?
The Wagmi Core v1 docs are still available at [1.x.wagmi.sh/core](https://1.x.wagmi.sh/core).
:::

## Dependencies

### Dropped CommonJS support

Wagmi v2 no longer publishes a separate `cjs` tag since very few people use this tag and ESM is the future. See [Sindre Sorhus' guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info about switching to ESM.

## Actions

### Removed `config` singleton

Before v2, when you called [`createConfig`](/core/api/createConfig), it set a global `config` singleton that was used internally by actions. For v2, `config` is now a required first parameter for actions.

::: code-group
```ts [index.ts]
import { getAccount, readContract } from '@wagmi/core'
import { parseAbi } from 'viem'
import { config } from './config' // [!code ++]

const account = getAccount() // [!code --]
const account = getAccount(config) // [!code ++]

const balanceOf = readContract({ // [!code --]
const balanceOf = readContract(config, { // [!code ++]
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
  functionName: 'balanceOf',
  args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

The previous global `config` singleton made it so you couldn't use multiple `Config` objects in the same project. In addition, we think passing `config` is more explicit and makes it easier to understand what's going on. Finally, types can be inferred directly from the `config`, like [chain properties](/core/guides/chain-properties) and more.

### Removed `getContract`

Removed `getContract` export. Use Viem's [`getContract`](https://viem.sh/docs/contract/getContract.html) instead.

```ts
import { getContract } from '@wagmi/core' // [!code --]
import { getContract } from 'viem' // [!code ++]

const contract = getContract() // [!code --]
const contract = getContract() // [!code ++]
```

### Removed `getNetwork` and `watchNetwork`

The `getNetwork` and `watchNetwork` actions were removed since the connected chain is typically based on the connected account.

- Use [`config.chains`](/core/api/createConfig#chains-1) instead to get `chains`.

  ::: code-group
  ```ts [index.ts]
  import { getNetwork } from '@wagmi/core' // [!code --]

  const { chains } = getNetwork() // [!code --]
  const chains = config.chains // [!code ++]
  ```
  <<< @/snippets/core/config.ts[config.ts]
  :::

- Use [`getAccount`](/core/api/actions/getAccount) and `config.chains` instead to get `chain`.

  ::: code-group
  ```ts [index.ts]
  import { getNetwork } from '@wagmi/core' // [!code --]
  import { getAccount } from '@wagmi/core' // [!code ++]
  import { config } from './config' // [!code ++]

  const { chain } = getNetwork() // [!code --]
  const { chainId } = getAccount(config) // [!code ++]
  const chain = chains.find(chain => chain.id === chainId) // [!code ++]
  ```
  <<< @/snippets/core/config.ts[config.ts]
  :::

  Before v2, `getNetwork().chain` could result in an invalid chain if the active connector's `chainId` was not configured in the list of `config.chains`. Using `getAccount` and `config.chains` is more work, but ensures that chain is either valid or not defined. You can also use `getAccount(config).chain` if you don't care about the chain being `undefined` when not configured.

- Use `watchAccount` instead of `watchNetwork`.

  ::: code-group
  ```ts [index.ts]
  import { watchNetwork } from '@wagmi/core' // [!code --]
  import { watchAccount } from '@wagmi/core' // [!code ++]
  import { config } from './config' // [!code ++]

  const unwatch = watchNetwork((data) => console.log('Changed!', data)) // [!code --]
  const unwatch = watchAccount(config, { // [!code ++]
    onChange(data) { // [!code ++]
      const chains = config.chains // [!code ++]
      const chain = chains.find(chain => chain.id === data.chainId) // [!code ++]
    }, // [!code ++]
  }) // [!code ++]
  ```
  <<< @/snippets/core/config.ts[config.ts]
  :::

### Removed `getWebSocketPublicClient` and `watchWebSocketPublicClient`

Viem [Transports](https://viem.sh/docs/clients/intro.html#transports) now determine the type of client that is returned. You can use [`getPublicClient`](/core/api/actions/getPublicClient) and [`watchPublicClient`](/core/api/actions/watchPublicClient) to retrieve Viem [`PublicClient`](https://viem.sh/docs/clients/public.html) instances.

Alternatively, you can use [`getClient`](/core/api/actions/getClient) and [`watchClient`](/core/api/actions/watchClient) to retrieve plain Viem [`Client`](https://viem.sh/docs/clients/custom.html) instances. This is a better option for users that care about optimizing bundle size to be as small as possible.

### Removed `watchReadContract`, `watchReadContracts`, and `watchReadMulticall`

Use [`watchBlockNumber`](/core/api/actions/watchBlockNumber) along with [`readContract`](/core/api/actions/readContract), [`readContracts`](/core/api/actions/readContracts), and [`multicall`](/core/api/actions/multicall) actions instead. Before v2, `watchReadContract`, `watchReadContracts`, and `watchReadMulticall` were all wrappers around `watchBlockNumber` and this simplifies the API.

::: code-group
```ts [index.ts]
import { watchReadContract } from '@wagmi/core' // [!code --]
import { watchBlockNumber, readContract } from '@wagmi/core' // [!code ++]
import { config } from './config' // [!code ++]

const unwatch = watchReadContract( // [!code --]
  { // [!code --]
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // [!code --]
    abi: parseAbi(['function balanceOf(address) view returns (uint256)']), // [!code --]
    functionName: 'balanceOf', // [!code --]
    args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'], // [!code --]
  }, // [!code --]
  (result) => console.log('Changed!', result), // [!code --]
) // [!code --]
const unwatch = watchBlockNumber(config, { // [!code ++]
  onBlockNumber() { // [!code ++]
    const balanceOf = readContract(config, { // [!code ++]
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // [!code ++]
      abi: parseAbi(['function balanceOf(address) view returns (uint256)']), // [!code ++]
      functionName: 'balanceOf', // [!code ++]
      args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'], // [!code ++]
    }) // [!code ++]
    console.log('Changed!', balanceOf)// [!code ++]
  }, // [!code ++]
}) // [!code ++]
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Removed `fetchFeeData`

Removed `fetchFeeData`. Use [`estimateFeesPerGas`](/core/api/actions/estimateFeesPerGas) instead.

::: code-group
```ts [index.ts]
import { fetchFeeData } from '@wagmi/core' // [!code --]
import { estimateFeesPerGas } from '@wagmi/core' // [!code ++]
import { config } from './config' // [!code ++]

const result = await fetchFeeData() // [!code --]
const result = await estimateFeesPerGas(config) // [!code ++]
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Removed `prepareWriteContract`

Removed `prepareWriteContract`. Use [`simulateContract`](/core/api/actions/simulateContract) instead.

::: code-group
```ts [index.ts]
import { prepareWriteContract } from '@wagmi/core' // [!code --]
import { simulateContract } from '@wagmi/core' // [!code ++]
import { config } from './config' // [!code ++]

const result = await prepareWriteContract({ ... }) // [!code --]
const result = await simulateContract(config, { ... }) // [!code ++]
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Removed `prepareSendTransaction`

Removed `prepareSendTransaction`. Use [`estimateGas`](/core/api/actions/estimateGas) instead.

::: code-group
```ts [index.ts]
import { prepareSendTransaction } from '@wagmi/core' // [!code --]
import { estimateGas } from '@wagmi/core' // [!code ++]
import { config } from './config' // [!code ++]

const result = await prepareSendTransaction({ ... }) // [!code --]
const result = await estimateGas(config, { ... }) // [!code ++]
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Updated `sendTransaction` and `writeContract` return type

Updated [`sendTransaction`](/core/api/actions/sendTransaction) and [`writeContract`](/core/api/actions/writeContract) return type from `` { hash: `0x${string}` } `` to `` `0x${string}` ``.

```ts
const result = await sendTransaction({ hash: '0x...' })
result.hash // [!code --]
result // [!code ++]
```

### Updated `connect` return type

Updated [`connect`](/core/api/actions/connect) return type from `` { account: Address; chain: { id: number; unsupported?: boolean }; connector: Connector } `` to `` { accounts: readonly Address[]; chainId: number } ``. This better reflects the ability to have multiple accounts per connector.

### Renamed parameters and return types

All hook parameters and return types follow the naming pattern of `[PascalCaseActionName]Parameters` and `[PascalCaseActionName]ReturnType`. For example, `GetAccountParameters` and `GetAccountReturnType`.

```ts
import { GetAccountConfig, GetAccountResult } from '@wagmi/core' // [!code --]
import { GetAccountParameters, GetAccountReturnType } from '@wagmi/core' // [!code ++]
```

## Connectors

### Moved Wagmi Connectors to peer dependencies

Wagmi Core v2 no longer exports connectors via the `'@wagmi/core/connectors/*'` entrypoints. Instead, you should install the `@wagmi/connectors` package.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/connectors
```

```bash-vue [npm]
npm install @wagmi/connectors
```

```bash-vue [yarn]
yarn add @wagmi/connectors
```

```bash-vue [bun]
bun add @wagmi/connectors
```
:::

And import connectors from there.

```ts
import { injected } from '@wagmi/connectors'
```

See the [connectors documentation](/core/api/connectors) for more information.

### Updated connector API

In order to maximize type-safety and ease of creating connectors, the connector API changed. Follow the [Creating Connectors guide](/dev/creating-connectors) for more info on creating new connectors and converting Wagmi v1 connectors.

### Removed individual entrypoints

Previously, each connector had its own entrypoint to optimize tree-shaking. Since all connectors now have [`package.json#sideEffects`](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) enabled, this is no longer necessary and the entrypoint is unified. Use the `'@wagmi/connectors'` package instead.

```ts
import { InjectedConnector } from '@wagmi/core/connectors/injected' // [!code --]
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet' // [!code --]
import { coinbaseWallet, injected } from '@wagmi/connectors' // [!code ++]
```

### Removed `MetaMaskConnector`

The `MetaMaskConnector` was removed since it was nearly the same thing as the `InjectedConnector`. Use the [`injected`](/core/api/connectors/injected) connector instead, along with the [`target`](/core/api/connectors/injected#target) parameter set to `'metaMask'`, for the same behavior.

```ts
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask' // [!code --]
import { injected } from '@wagmi/connectors' // [!code ++]

const connector = new MetaMaskConnector() // [!code --]
const connector = injected({ target: 'metaMask' }) // [!code ++]
```

### Renamed connectors

In Wagmi v1, connectors were classes you needed to instantiate. In Wagmi v2, connectors are functions. As a result, the API has changed. Connectors have the following new names:

- `CoinbaseWalletConnector` is now [`coinbaseWallet`](/core/api/connectors/coinbaseWallet).
- `InjectedConnector` is now [`injected`](/core/api/connectors/injected).
- `SafeConnector` is now [`safe`](/core/api/connectors/safe).
- `WalletConnectConnector` is now [`walletConnect`](/core/api/connectors/walletConnect).

To create a connector, you now call the connector function with parameters.

```ts
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect' // [!code --]
import { walletConnect } from '@wagmi/connectors' // [!code ++]

const connector = new WalletConnectConnector({ // [!code --]
const connector = walletConnect({ // [!code ++]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

### Removed `WalletConnectLegacyConnector`

WalletConnect v1 was sunset June 28, 2023. Use the [`walletConnect`](/core/api/connectors/walletConnect) connector instead.

```ts
import { WalletConnectLegacyConnector } from '@wagmi/core/connectors/walletConnectLegacy' // [!code --]
import { walletConnect } from '@wagmi/connectors' // [!code ++]

const connector = new WalletConnectLegacyConnector({ // [!code --]
const connector = walletConnect({ // [!code ++]
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})
```

## Chains

### Updated `'@wagmi/core/chains'` entrypoint

Chains now live in the [Viem repository](https://github.com/wevm/viem). As a result, the `'@wagmi/core/chains'` entrypoint now proxies all chains from `'viem/chains'` directly.

### Removed `mainnet` and `sepolia` from main entrypoint

Since the `'@wagmi/core/chains'` entrypoint now proxies `'viem/chains'`, `mainnet` and `sepolia` were removed from the main entrypoint. Use the `'@wagmi/core/chains'` entrypoint instead.

```ts
import { mainnet, sepolia } from '@wagmi/core' // [!code --]
import { mainnet, sepolia } from '@wagmi/core/chains' // [!code ++]
```

## Errors

A number of errors were renamed to better reflect their functionality or replaced by Viem errors.

## Miscellaneous

### Removed internal ENS normalization

Before v2, Wagmi handled ENS name normalization internally for `getEnsAddress`, `getEnsAvatar`, and `getEnsResolver`, using Viem's [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function. This added extra bundle size as full normalization is quite heavy. For v2, you must normalize ENS names yourself before passing them to these actions. You can use Viem's `normalize` function or any other function that performs [UTS-46 normalization](https://unicode.org/reports/tr46).


::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem' // [!code ++]
import { config } from './config'

const result = await getEnsAddress(config, {
  name: 'wevm.eth', // [!code --]
  name: normalize('wevm.eth'), // [!code ++]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

By inverting control, Wagmi lets you choose how much normalization to do. For example, maybe your project only allows ENS names that are numeric so no normalization is not needed. Check out the [ENS documentation](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) for more information on normalizing names.

### Removed `configureChains`

The Wagmi v2 `Config` now has native multichain support using the [`chains`](/core/api/createConfig) parameter so the `configureChains` function is no longer required.

```ts
import { configureChains, createConfig } from '@wagmi/core' // [!code --]
import { http, createConfig } from '@wagmi/core' // [!code ++]
import { mainnet, sepolia } from '@wagmi/core/chains'

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
import { erc20ABI } from '@wagmi/core' // [!code --]
import { erc20Abi } from 'viem' // [!code ++]
```

### Removed `'@wagmi/core/providers/*` entrypoints

It never made sense that we would have provider URLs hardcoded in the Wagmi codebase. Use [Viem transports](https://viem.sh/docs/clients/intro.html#transports) along with RPC provider URLs instead.

```ts
import { alchemyProvider } from '@wagmi/core/providers/alchemy' // [!code --]
import { http } from 'viem' // [!code ++]

const transport = http('https://mainnet.example.com')
```

### Updated `createConfig` parameters

- Removed `autoConnect`. The reconnecting behavior must be managed manually and is not related to the Wagmi `Config`. Use the [`reconnect`](/core/api/actions/reconnect) action instead.
- Removed `publicClient` and `webSocketPublicClient`. Use [`transports`](/core/api/createConfig#transports) or [`client`](/core/api/createConfig#client) instead.
- Removed `logger`. Wagmi no longer logs debug information to console.

### Updated `Config` object

- Removed `config.connector`. Use `config.state.connections.get(config.state.current)?.connector` instead.
- Removed `config.data`. Use `config.state.connections.get(config.state.current)` instead.
- Removed `config.error`. Was unused and not needed.
- Removed `config.lastUsedChainId`. Use `config.state.connections.get(config.state.current)?.chainId` instead.
- Removed `config.publicClient`. Use [`config.getClient()`](/core/api/createConfig#getclient) or [`getPublicClient`](/core/api/actions/getPublicClient) instead.
- Removed `config.status`. Use [`config.state.status`](/core/api/createConfig#status) instead.
- Removed `config.webSocketClient`. Use [`config.getClient()`](/core/api/createConfig#getclient) or [`getPublicClient`](/core/api/actions/getPublicClient) instead.
- Removed `config.clearState`. Was unused and not needed.
- Removed `config.autoConnect()`. Use [`reconnect`](/core/api/actions/reconnect) action instead.
- Renamed `config.setConnectors`. Use `config._internal.setConnectors` instead.
- Removed `config.setLastUsedConnector`. Use `config.storage?.setItem('recentConnectorId', connectorId)` instead.
- Removed `getConfig`. `config` should be passed explicitly to actions instead of using global `config`.

## Deprecations

### Deprecated `getBalance` `token` parameter

Moving forward, `getBalance` will only work for native currencies, thus the `token` parameter is no longer supported. Use [`readContracts`](/core/api/actions/readContracts) instead.

```ts
import { getBalance } from '@wagmi/core' // [!code --]
import { readContracts } from '@wagmi/core' // [!code ++]
import { erc20Abi } from 'viem' // [!code ++]
import { config } from './config' // [!code ++]

const result = await getBalance(config, { // [!code --]
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code --]
  token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
}) // [!code --]
const result = await readContracts(config, { // [!code ++]
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

### Deprecated `getBalance` `unit` parameter and `formatted` return value

Moving forward, `getBalance` will not accept the `unit` parameter or return a `formatted` value. Instead you can call `formatUnits` from Viem directly or use another number formatting library, like [dnum](https://github.com/bpierre/dnum) instead.

```ts
import { formatUnits } from 'viem' // [!code ++]
import { getBalance } from '@wagmi/core'

const result = await getBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  unit: 'ether', // [!code --]
})
result.formatted // [!code --]
formatUnits(result.value, result.decimals) // [!code ++]
```

### Deprecated `getToken`

Moving forward, `getToken` is no longer supported. Use [`readContracts`](/core/api/actions/readContracts) instead.

```ts
import { getToken } from '@wagmi/core' // [!code --]
import { readContracts } from '@wagmi/core' // [!code ++]
import { erc20Abi } from 'viem' // [!code ++]
import { config } from './config' // [!code ++]

const result = await getToken(config, { // [!code --]
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
}) // [!code --]
const result = await readContracts(config, { // [!code ++]
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

The `formatUnits` parameter and related return values (e.g. `result.formatted`) are deprecated for the following actions:

- [`estimateFeesPerGas`](/core/api/actions/estimateFeesPerGas)
- [`getToken`](/core/api/actions/getToken)

Instead you can call `formatUnits` from Viem directly or use another number formatting library, like [dnum](https://github.com/bpierre/dnum) instead.

```ts
import { formatUnits } from 'viem' // [!code ++]
import { getToken } from '@wagmi/core'

const result = await getToken({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  formatUnits: 'ether',
})
result.totalSupply.formatted  // [!code --]
formatUnits(result.totalSupply.value, 18)  // [!code ++]
```

This allows us to invert control to users so they can handle number formatting however they want, taking into account precision, localization, and more.

### Renamed actions

The following actions were renamed to better reflect their functionality and underlying [Viem](https://viem.sh) actions:

- `fetchBalance` is now [`getBalance`](/core/api/actions/getBalance)
- `fetchBlockNumber` is now [`getBlockNumber`](/core/api/actions/getBlockNumber)
- `fetchEnsAddress` is now [`getEnsAddress`](/core/api/actions/getEnsAddress)
- `fetchEnsAvatar` is now [`getEnsAvatar`](/core/api/actions/getEnsAvatar)
- `fetchEnsName` is now [`getEnsName`](/core/api/actions/getEnsName)
- `fetchEnsResolver` is now [`getEnsResolver`](/core/api/actions/getEnsResolver)
- `fetchToken` is now [`getToken`](/core/api/actions/getToken)
- `fetchTransaction` is now [`getTransaction`](/core/api/actions/getTransaction)
- `switchNetwork` is now [`switchChain`](/core/api/actions/switchChain)
- `waitForTransaction` is now [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
