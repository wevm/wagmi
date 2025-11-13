# Viem

[Viem](https://viem.sh) is a low-level TypeScript Interface for Ethereum that enables developers to interact with the Ethereum blockchain, including: JSON-RPC API abstractions, Smart Contract interaction, wallet & signing implementations, coding/parsing utilities and more.

**Wagmi Core** is essentially a wrapper over **Viem** that provides multi-chain functionality via [Wagmi Config](/react/api/createConfig) and automatic account management via [Connectors](/react/api/connectors).

## Leveraging Viem Actions

All of the core [Wagmi Hooks](/react/api/actions) are friendly wrappers around [Viem Actions](https://viem.sh/docs/actions/public/introduction) that inject a multi-chain and connector aware [Wagmi Config](/react/api/createConfig).

There may be cases where you might want to dig deeper and utilize Viem Actions directly (maybe a Hook doesn't exist in Wagmi yet). In these cases, you can create your own custom Wagmi Hook by importing Viem Actions directly via `viem/actions` and plugging in a Viem Client returned by the [`useClient` Hook](/react/api/hooks/useClient).

The example below demonstrates two different ways to utilize Viem Actions:

1. **Tree-shakable Actions (recommended):** Uses `useClient` (for public actions) and `useConnectorClient` (for wallet actions).
2. **Client Actions:** Uses `usePublicClient` (for public actions) and  `useWalletClient` (for wallet actions).

::: tip

It is highly recommended to use the **tree-shakable** method to ensure that you are only pulling modules you use, and keep your bundle size low.

:::

::: code-group

```tsx [Tree-shakable Actions]
// 1. Import modules. 
import { useMutation, useQuery } from '@tanstack/react-query'
import { http, createConfig, useClient, useConnectorClient } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 
import { getLogs, watchAsset } from 'viem/actions'

// 2. Set up a Wagmi Config 
export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

function Example() {
  // 3. Extract a Viem Client for the current active chain. // [!code hl]
  const publicClient = useClient({ config }) // [!code hl]

  // 4. Create a "custom" Query Hook that utilizes the Client. // [!code hl]
  const { data: logs } = useQuery({ // [!code hl]
    queryKey: ['logs', publicClient.uid], // [!code hl]
    queryFn: () => getLogs(publicClient, /* ... */) // [!code hl]
  }) // [!code hl]
  
  // 5. Extract a Viem Client for the current active chain & account. // [!code hl]
  const { data: walletClient } = useConnectorClient({ config }) // [!code hl]

  // 6. Create a "custom" Mutation Hook that utilizes the Client. // [!code hl]
  const { mutate } = useMutation({ // [!code hl]
    mutationFn: (asset) => watchAsset(walletClient, asset) // [!code hl]
  }) // [!code hl]

  return (
    <div>
      {/* ... */}
    </div>
  )
}
```

```tsx [Client Actions]
// 1. Import modules. 
import { useMutation, useQuery } from '@tanstack/react-query'
import { http, createConfig, useClient, useConnectorClient } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 

// 2. Set up a Wagmi Config 
export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

function Example() {
  // 3. Extract a Viem Client for the current active chain. // [!code hl]
  const publicClient = useClient({ config }) // [!code hl]

  // 4. Create a "custom" Query Hook that utilizes the Client. // [!code hl]
  const { data: logs } = useQuery({ // [!code hl]
    queryKey: ['logs', publicClient.uid], // [!code hl]
    queryFn: () => publicClient.getLogs(/* ... */) // [!code hl]
  }) // [!code hl]
  
  // 5. Extract a Viem Client for the current active chain & account. // [!code hl]
  const { data: walletClient } = useConnectorClient({ config }) // [!code hl]

  // 6. Create a "custom" Mutation Hook that utilizes the Client. // [!code hl]
  const { mutate } = useMutation({ // [!code hl]
    mutationFn: (asset) => walletClient.watchAsset(asset) // [!code hl]
  }) // [!code hl]

  return (
    <div>
      {/* ... */}
    </div>
  )
}
```

:::

## Private Key & Mnemonic Accounts

It is possible to utilize Viem's [Private Key & Mnemonic Accounts](https://viem.sh/docs/accounts/local) with Wagmi by explicitly passing through the account via the `account` argument on Wagmi Actions.

```tsx
import { http, createConfig, useSendTransaction } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

const account = privateKeyToAccount('0x...') // [!code hl]

function Example() {
  const { data: hash } = useSendTransaction({
    account, // [!code hl]
    to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    value: parseEther('0.001')
  })
}
```

::: info

Wagmi currently does not support hoisting Private Key & Mnemonic Accounts to the top-level Wagmi Config – meaning you have to explicitly pass through the account to every Action. If you feel like this is a feature that should be added, please [open an discussion](https://github.com/wevm/wagmi/discussions/new?category=ideas).

:::
