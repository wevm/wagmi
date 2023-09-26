# Migrate from v1 to v2

Wagmi v2 redesigns the core APIs to mesh better with [Viem](https://viem.sh) and [TanStack Query](https://tanstack.com/query/v5/docs/react). Wagmi v2 is a light wrapper around these libraries, sprinkling in multichain support and account management. As such, there are some [breaking changes](#breaking-changes) and [deprecations](#deprecations) to be aware of.

To get started, install the latest version of Wagmi and it's required peer dependencies.

::: code-group
```bash [pnpm]
pnpm add wagmi@alpha viem@alpha @tanstack/react-query@beta
```

```bash [npm]
npm install wagmi@alpha viem@alpha @tanstack/react-query@beta
```

```bash [yarn]
yarn add wagmi@alpha viem@alpha @tanstack/react-query@beta
```

```bash [bun]
bun add wagmi@alpha viem@alpha @tanstack/react-query@beta
```
:::

::: info Wagmi v2 is currently in alpha.
We recommend trying it out in your projects, but there may be breaking changes before the final release. If you find bugs or have feedback, please [open an issue](https://github.com/wagmi-dev/wagmi/issues/new/choose) or [create a new discussion](https://github.com/wagmi-dev/wagmi/discussions/new/choose).
:::

## Breaking changes

### Added TanStack Query as peer dependency

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

For more information on setting up TanStack Query for Wagmi, follow the [Getting Started docs](/react/getting-started#setup-tanstack-query). If you want to set up persistance for your query cache (default behavior before Wagmi v2), check out the [TanStack Query docs](https://tanstack.com/query/v5/docs/react/plugins/persistQueryClient).

### Removed arguments from mutation hooks

Mutation hooks are hooks that change network or application state, sign data, or perform write operations through mutation functions. With Wagmi v1, you could pass arguments directly to these hooks instead of using them with their mutation functions. For example:

```ts{3}
// Wagmi v1
const { signMessage } = useSignMessage({
  message: 'foo bar baz',
})
```

With Wagmi v2, you must pass arguments to the mutation function instead. This uses the same behavior as [TanStack Query](https://tanstack.com/query/v5/docs/react/guides/mutations) mutations.

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

### Removed internal ENS name normalization

Before v2, Wagmi handled ENS name normalization internally for `useEnsAddress`, `useEnsAvatar`, and `useEnsResolver`, using Viem's [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function. This added extra bundle size as full normalization is quite heavy. For v2, you must normalize ENS names yourself before passing them to these actions. You can use Viem's `normalize` function or any other function that performs [UTS-46 normalization](https://unicode.org/reports/tr46).

```ts
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem' // [!code ++]

const result = useEnsAddress({
  name: 'wagmi-dev.eth', // [!code --]
  name: normalize('wagmi-dev.eth'), // [!code ++]
})
```

By inverting control, Wagmi let's you choose how much normalization to do. For example, maybe your project only allows ENS names that are alphanumeric so no normalization is not needed. Check out the [ENS documentation](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) for more information on normalizing names.

### Removed prepare hooks

`usePrepareContractWrite` and `usePrepareSendTransaction` were removed and replaced with idiomatic Viem alternatives. For `usePrepareContractWrite`, use [`useContractSimulate`](/react/api/hooks/useContractSimulate). Similar to `usePrepareContractWrite`, `useContractSimulate` composes well with `useContractWrite`

```tsx
import { usePrepareContractWrite, useContractWrite } from 'wagmi' // [!code --]
import { useContractSimulate, useContractWrite } from 'wagmi' // [!code ++]

const { config } = usePrepareContractWrite({ // [!code --]
const { data } = useContractSimulate({ // [!code ++]
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
const { write } = useContractWrite(config) // [!code --]
const { writeContract } = useContractWrite() // [!code ++]

<button
  disabled={!Boolean(write)} // [!code --]
  onClick={() => write()} // [!code --]
  disabled={!Boolean(data?.request)} // [!code ++]
  onClick={() => writeContract(data?.request)} // [!code ++]
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
    gas: data?.gas, // [!code ++]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code ++]
    value: parseEther('0.01'), // [!code ++]
  })} // [!code ++]
>
  Send transaction
</button>
```

This might seem like more work, but it gives you more control and is more accurate representation of what is happening under the hood.

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

### Updated connector API

In Wagmi v1, connectors were classes you needed to instantiate. In Wagmi v2, connectors are functions. As a result, the API has changed. To learn more about all the connector API changes, check out the [Wagmi Core v1 to v2 guide](/core/guides/migrate-from-v1-to-v2). Connectors have the following new names:

- `CoinbaseWalletConnector` is now [`coinbaseWallet`](/react/api/connectors/coinbaseWallet).
- `InjectedConnector` is now [`injected`](/react/api/connectors/injected).
- `LedgerConnector` is now [`ledger`](/react/api/connectors/ledger).
- `SafeConnector` is now [`safe`](/react/api/connectors/safe).
- `WalletConnectConnector` is now [`walletConnect`](/react/api/connectors/walletConnect).

### Removed exports

- Removed `mainnet` and `sepolia` from main entrypoint. Use the `wagmi/chains` entrypoint instead.
  ```ts
  import { mainnet } from 'wagmi' // [!code --]
  import { mainnet } from 'wagmi/chains' // [!code ++]
  ```
- Removed individual exports for connectors. Use the `wagmi/connectors` entrypoint instead.
  ```ts
  import { InjectedConnector } from 'wagmi/connectors/injected' // [!code --]
  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet' // [!code --]
  import { coinbaseWallet, injected } from 'wagmi/connectors' // [!code ++]
  ```
- Removed ABIs from main entrypoint. Import from Viem instead.
  ```ts
  import { erc20ABI } from 'wagmi' // [!code --]
  import { erc20Abi } from 'viem' // [!code ++]
  ```
- Removed providers entrypoint. Use Viem transports instead.
  ```ts
  import { alchemyProvider, infuraProvider } from 'wagmi/providers' // [!code --]
  import { http } from 'viem' // [!code ++]

  const transport = http('https://mainnet.example.com')
  ```

### Miscellaneous

- WalletConnect v1 support dropped. WalletConnect v2 is now the only supported version.
- Removed `autoConnect` parameter from `createConfig`. Use `WagmiProvider` [`reconnectOnMount`](/react/api/WagmiProvider#reconnectonmount) instead.
- Errors 🚧
- Removed `useContractReads` `paginatedIndexesConfig`. Use `initialPageParam` and `getNextPageParam` along with `fetchNextPage`/`fetchPreviousPage` instead.
- Removed `useWebSocketPublicClient`. The Wagmi `Config` does not separate transport types anymore.
- Dropped CommonJS module support. Use ES Modules instead. See [Sindre Sorhus' guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info.

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
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### Renamed hooks

The following hooks were renamed to better reflect their functionality and underlying [Viem](https://viem.sh) actions:

- `useContractEvent` is now [`useWatchContractEvent`](/react/api/hooks/useWatchContractEvent)
- `useContractInfiniteReads` is now [`useInfiniteContractReads`](/react/api/hooks/useInfiniteContractReads)
- `useFeeData` is now [`useEstimateFeesPerGas`](/react/api/hooks/useEstimateFeesPerGas)
- `useSwitchNetwork` is now [`useSwitchChain`](/react/api/hooks/useSwitchChain)
- `useWaitForTransaction` is now [`useWaitForTransactionReceipt`](/react/api/hooks/useWaitForTransactionReceipt)

### Miscellaneous

- `WagmiConfigProps` renamed to [`WagmiProviderProps`](/react/api/WagmiProvider#parameters).
- `Context` renamed to [`WagmiContext`](/react/api/WagmiProvider#context).
- `useBalance` `token` parameter no longer supported. Use `useContractReads` instead.
  ```ts
  import { useBalance } from 'wagmi' // [!code --]
  import { useContractReads } from 'wagmi' // [!code ++]
  import { erc20Abi } from 'viem' // [!code ++]

  const result = useBalance({ // [!code --]
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code --]
    token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code --]
  }) // [!code --]
  const result = useContractReads({ // [!code ++]
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