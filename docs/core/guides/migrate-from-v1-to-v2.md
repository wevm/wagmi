# Migrate from v1 to v2

Wagmi Core v2 redesigns the core APIs to mesh better with [Viem](https://viem.sh). Wagmi Core v2 is a light wrapper around Viem, sprinkling in multichain support and account management. As such, there are some [breaking changes](#breaking-changes) and [deprecations](#deprecations) to be aware of.

To get started, install the latest version of Wagmi and it's required peer dependencies.

::: code-group
```bash [pnpm]
pnpm add @wagmi/core@alpha viem@alpha @wagmi/connectors@alpha
```

```bash [npm]
npm install @wagmi/core@alpha viem@alpha @wagmi/connectors@alpha
```

```bash [yarn]
yarn add @wagmi/core@alpha viem@alpha @wagmi/connectors@alpha
```

```bash [bun]
bun add @wagmi/core@alpha viem@alpha @wagmi/connectors@alpha
```
:::

::: info Wagmi Core v2 is currently in alpha.
We recommend trying it out in your projects, but there may be breaking changes before the final release. If you find bugs or have feedback, please [open an issue](https://github.com/wagmi-dev/wagmi/issues/new/choose) or [create a new discussion](https://github.com/wagmi-dev/wagmi/discussions/new/choose).
:::

## Breaking changes

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

The `useNetwork` and `watchNetwork` hooks were removed since the connected chain is typically based on the connected account.

- Use [`config.chains`](/core/api/createConfig#chains-1) instead to get `chains`.

  ::: code-group
  ```ts [index.ts]
  import { getNetwork } from '@wagmi/core' // [!code --]

  const { chains } = getNetwork() // [!code --]
  const chains = config.chains // [!code ++]
  ```
  <<< @/snippets/core/config.ts[config.ts]
  :::

- Use [`getAccount`](/core/api/getAccount) and `config.chains` instead to get `chain`.

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

### Removed internal ENS normalization for `getEnsAddress`, `getEnsAvatar`, and `getEnsResolver`

Before v2, Wagmi handled ENS name normalization internally for `getEnsAddress`, `getEnsAvatar`, and `getEnsResolver`, using Viem's [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function. This added extra bundle size as full normalization is quite heavy. For v2, you must normalize ENS names yourself before passing them to these actions. You can use Viem's `normalize` function or any other function that performs [UTS-46 normalization](https://unicode.org/reports/tr46).


::: code-group
```ts [index.ts]
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem' // [!code ++]
import { config } from './config'

const result = await getEnsAddress(config, {
  name: 'wagmi-dev.eth', // [!code --]
  name: normalize('wagmi-dev.eth'), // [!code ++]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

By inverting control, Wagmi let's you choose how much normalization to do. For example, maybe your project only allows ENS names that are alphanumeric so no normalization is not needed. Check out the [ENS documentation](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) for more information on normalizing names.

---

### Config objects updates 🚧

- Removed `config.connector` (use `config.state.connections.get(config.state.current)?.connector` instead)
- Removed `config.data` (use `config.state.connections.get(config.state.current)` instead)
- Removed `config.error`
- Removed `config.lastUsedChainId` (use `config.state.connections.get(config.state.current)?.chainId` instead)
- Removed `config.publicClient` (use `config.getClient()` or `getPublicClient` instead)
- Removed `config.status` (use `config.state.status` instead)
- Removed `config.webSocketClient` (use `config.getClient()` or `getPublicClient` instead)
- Removed `config.clearState`
- Removed `config.autoConnect()` (use `reconnect` action instead)
- Renamed `config.setConnectors` (use `config._internal.setConnectors` instead)
- Removed `config.setLastUsedConnector` (use `config.storage?.setItem('recentConnectorId', connectorId)` instead)
- Removed `getConfig` (`config` should be passed explicitly to actions instead of using global `config`)

### createConfig 🚧

- Removed `logger`
- Removed `publicClient` and `webSocketPublicClient` (use `transports` or `client` instead)
- Removed `autoConnect`

### Removed `configureChains`

The Wagmi v2 `Config` now has native multichain support using the [`chains`](/react/api/createConfig) parameter so the `configureChains` function is no longer required.

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

### Updated connector API

In Wagmi v1, connectors were classes you needed to instantiate. In Wagmi v2, connectors are functions. As a result, the API has changed. Connectors have the following new names:

- `CoinbaseWalletConnector` is now [`coinbaseWallet`](/react/api/connectors/coinbaseWallet).
- `InjectedConnector` is now [`injected`](/react/api/connectors/injected).
- `LedgerConnector` is now [`ledger`](/react/api/connectors/ledger).
- `SafeConnector` is now [`safe`](/react/api/connectors/safe).
- `WalletConnectConnector` is now [`walletConnect`](/react/api/connectors/walletConnect).

::: details `InjectedConnector` `getProvider` parameter is now called `target` and the type has changed.

```ts
import { InjectedConnector } from '@wagmi/core/connectors/injected' // [!code --]
import { injected } from '@wagmi/connectors' // [!code ++]

const connector = new InjectedConnector({ // [!code --]
  getProvider() { // [!code --]
    if (typeof window !== 'undefined') return window.myInjectedProvider // [!code --]
    return undefined // [!code --]
  }, // [!code --]
}) // [!code --]
const connector = injected({ // [!code ++]
  target() { // [!code ++]
    return { // [!code ++]
      id: 'myInjectedProvider', // [!code ++]
      name: 'MyInjectedProvider', // [!code ++]
      provider(window) { // [!code ++]
        if (typeof window !== 'undefined') return window.myInjectedProvider // [!code ++]
        return undefined // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  } // [!code ++]
}) // [!code ++]
```
:::

### Removed exports

- Removed `mainnet` and `sepolia` from main entrypoint. Use the `@wagmi/core/chains` entrypoint instead.
  ```ts
  import { mainnet } from '@wagmi/core' // [!code --]
  import { mainnet } from '@wagmi/core/chains' // [!code ++]
  ```
- Removed individual exports for connectors. Use the `@wagmi/connectors` package instead.
  ```ts
  import { InjectedConnector } from '@wagmi/core/connectors/injected' // [!code --]
  import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet' // [!code --]
  import { coinbaseWallet, injected } from '@wagmi/connectors' // [!code ++]
  ```
- Removed ABIs from main entrypoint. Import from Viem instead.
  ```ts
  import { erc20ABI } from '@wagmi/core' // [!code --]
  import { erc20Abi } from 'viem' // [!code ++]
  ```
- Removed providers entrypoint. Use Viem transports instead.
  ```ts
  import { alchemyProvider, infuraProvider } from '@wagmi/core/providers' // [!code --]
  import { http } from 'viem' // [!code ++]

  const transport = http('https://mainnet.example.com')
  ```

### Miscellaneous

- WalletConnect v1 support dropped. WalletConnect v2 is now the only supported version.
- Removed `autoConnect` parameter from `createConfig`. Use [`reconnect`](/core/api/actions/reconnect) instead.
- Errors 🚧
- Changed `sendTransaction` and `writeContract` return type from `` { hash: `0x${string}` } `` to `` `0x${string}` ``.
  ```ts
  const result = await sendTransaction({ hash: '0x...' })
  result.hash // [!code --]
  result // [!code ++]
  ```
- Dropped CommonJS module support. Use ES Modules instead. See [Sindre Sorhus' guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info.

## Deprecations

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

### Miscellaneous

- `getBalance` `token` parameter no longer supported. Use `readContracts` instead.
  ```ts
  import { getBalance } from '@wagmi/core' // [!code --]
  import { readContracts } from '@wagmi/core' // [!code ++]
  import { erc20Abi } from 'viem' // [!code ++]

  const result = await getBalance({ // [!code --]
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code --]
    token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
  }) // [!code --]
  const result = await readContracts({ // [!code ++]
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