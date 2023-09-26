# Migrate from v1 to v2

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

Use Viem's [`getContract`](https://viem.sh/docs/contract/getContract.html) instead.

```ts
import { getContract } from '@wagmi/core' // [!code --]
import { getContract } from 'viem' // [!code ++]

const contract = getContract() // [!code --]
const contract = getContract() // [!code ++]
```

### Removed `getNetwork` and `watchNetwork`

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

  Before v2, `getNetwork().chain` could result in an invalid chain if the active connector's `chainId` was not configured in the list of `config.chains`. Using `getAccount` and `config.chains` is more work, but ensures that chain is either valid or not defined.

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

Use [`estimateFeesPerGas`](/core/api/actions/estimateFeesPerGas) instead.

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

Use [`simulateContract`](/core/api/actions/simulateContract) instead.

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

Use [`estimateGas`](/core/api/actions/estimateGas) instead.

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

Before v2, ENS name normalization was handled internally for `getEnsAddress`, `getEnsAvatar`, and `getEnsResolver`, using Viem's [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function. For v2, you must normalize ENS names yourself before passing them to these actions. You can use Viem's `normalize` function or any other function that performs [UTS-46 normalization](https://unicode.org/reports/tr46).

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

Normalization functions typically add a decent amount of bundle size to your project. By inverting control, you can choose how much normalization to do. For example, maybe your project only allows ENS names that are alphanumeric so no normalization is not needed.

---

### Config objects updates

- Removed `config.connector` (use `config.state.connections[config.state.current].connector` instead)
- Removed `config.data` (use `config.state.connections[config.state.current]` instead)
- Removed `config.error`
- Removed `config.lastUsedChainId` (use `config.state.connections[config.state.current].chainId` instead)
- Removed `config.publicClient` (use `config.getPublicClient()` instead)
- Removed `config.status` (use `config.state.status` instead)
- Removed `config.webSocketClient` (use `config.getWebSocketClient()` instead) (TODO: not implemented yet)
- Removed `config.clearState` (use `config.reset()` instead)
- Removed `config.autoConnect()` (use `reconnect` action instead)
- Renamed `config.setConnectors` (TODO: Was someone using this? Dynamic? Might want to figure out a better name/API)
- Removed `config.setLastUsedConnector` (use `config.storage?.setItem('recentConnectorId', connectorId)` instead)
- Removed `getConfig` (`config` should be passed explicitly to actions instead of using global `config`)

### createConfig

- Removed `logger`
- Removed `publicClient` and `webSocketPublicClient` (use `transports` or `client` instead)

### Connectors

- Import all connectors from `wagmi/connectors` entrypoint
- Renamed `CoinbaseWalletConnector` to `coinbaseWallet` (function instead of class)
- Renamed `InjectedConnector` to `injected` (function instead of class)
- Renamed `LedgerConnector` to `ledger` (function instead of class)
- Removed `MetaMaskConnector` (use `injected({ wallet: 'metaMask' })` instead)
- Removed `MockConnector` (TODO: Should we replace with something? `@wagmi/test.testConnector`?)
- Renamed `SafeConnector` to `safe` (function instead of class)
- Renamed `WalletConnectConnector` to `walletConnect` (function instead of class)
- Renamed `injected.getProvider` to `target`

### Providers

- Removed `configureChains` (use `createConfig.transports`)
- Removed `alchemy`, `infura`, `public`, `jsonRpc` providers (use `createConfig.transports`)

### Chains

- Removed `mainnet` and `sepolia` from main export (use `viem/chains` entrypoint instead)
- Removed `wagmi/chains` entrypoint (use `viem/chains` instead)

### Error changes

- New `BaseError` 
- List of old and new errors

### Removed ABI exports

Import from Viem instead.

```ts
import { erc20ABI, erc20ABI_bytes32, erc721ABI, erc4626ABI } from '@wagmi/core' // [!code --] 
import { erc20Abi, erc20Abi_bytes32, erc721Abi, erc4626Abi } from 'viem' // [!code ++]
```

## Deprecations

### Renamed actions

Renamed the following actions to better fit with [Viem](https://viem.sh)'s naming terminology.

| v1 name              | v2 name                     |
| -------------------- | --------------------------- |
| `fetchBalance`       | `getBalance`                |
| `fetchBlockNumber`   | `getBlockNumber`            |
| `fetchEnsAddress`    | `getEnsAddress`             |
| `fetchEnsAvatar`     | `getEnsAvatar`              |
| `fetchEnsName`       | `getEnsName`                |
| `fetchEnsResolver`   | `getEnsResolver`            |
| `fetchToken`         | `getToken`                  |
| `fetchTransaction`   | `getTransaction`            |
| `switchNetwork`      | `switchChain`               |
| `waitForTransaction` | `waitForTransactionReceipt` |

### `getBalance` `token`

Use `readContract` instead.