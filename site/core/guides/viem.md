# Viem

[Viem](https://viem.sh) is a low-level TypeScript Interface for Ethereum that enables developers to interact with the Ethereum blockchain, including: JSON-RPC API abstractions, Smart Contract interaction, wallet & signing implementations, coding/parsing utilities and more.

**Wagmi Core** is essentially a wrapper over **Viem** that provides multi-chain functionality via [Wagmi Config](/core/api/createConfig) and automatic account management via [Connectors](/core/api/connectors).

## Leveraging Viem Actions

All of the core [Wagmi Actions](/core/api/actions) are friendly wrappers around [Viem Actions](https://viem.sh/docs/actions/public/introduction.html) that inject a multi-chain and connector aware [Wagmi Config](/core/api/createConfig).

There may be cases where you might want to dig deeper and utilize Viem Actions directly (maybe an Action doesn't exist in Wagmi yet). In these cases, you can import Viem Actions directly via `viem/actions` and plug in a Viem Client returned by the [`getClient` Action](/core/api/actions/getClient).

The example below demonstrates two different ways to utilize Viem Actions:

1. **Tree-shakable Actions (recommended):** Uses `getClient` (for public actions) and `getConnectorClient` (for wallet actions).
2. **Client Actions:** Uses `getPublicClient` (for public actions) and  `getWalletClient` (for wallet actions).

::: tip

It is highly recommended to use the **tree-shakable** method to ensure that you are only pulling modules you use, and keep your bundle size low.

:::

::: code-group

```tsx [Tree-shakable Actions]
// 1. Import modules. 
import { http, createConfig, getClient, getConnectorClient } from '@wagmi/core' 
import { base, mainnet, optimism, zora } from '@wagmi/core/chains' 
import { getLogs, watchAsset } from 'viem/actions' // [!code hl]

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

// 3. Extract a Viem Client for the current active chain.
const publicClient = getClient(config)
const logs = await getLogs(publicClient, /* ... */) // [!code hl]

// 4. Extract a Viem Client for the current active chain & account.
const walletClient = getConnectorClient(config)
const success = await watchAsset(walletClient, /* ... */) // [!code hl]
```

```tsx [Client Actions]
// 1. Import modules. 
import { http, createConfig, getPublicClient, getWalletClient } from '@wagmi/core' 
import { base, mainnet, optimism, zora } from '@wagmi/core/chains' 

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

// 3. Extract a Viem Public Client for the current active chain.
const publicClient = getPublicClient(config)
const logs = await publicClient.getLogs(publicClient, /* ... */) // [!code hl]

// 4. Extract a Viem Wallet Client for the current active chain & account.
const walletClient = getWalletClient(config)
const success = await walletClient.watchAsset(walletClient, /* ... */) // [!code hl]
```

:::

## Multi-chain Viem Client

The [Viem Client](https://viem.sh/docs/client) provides an interface to interact with an JSON-RPC Provider. By nature, JSON-RPC Providers are single-chain, so the Viem Client is designed to be instantiated with a single `chain`. As a result, setting up Viem to be multi-chain aware can get a bit verbose.

The good news is that you can create a **"multi-chain Viem Client"** with **Wagmi** by utilizing [`createConfig`](/core/api/createConfig) and [`getClient`](/core/api/actions/getClient).

::: code-group

```tsx [Wagmi Usage]
// 1. Import modules. 
import { http, createConfig, getClient, getConnectorClient } from '@wagmi/core' 
import { base, mainnet, optimism, zora } from '@wagmi/core/chains' 
import { getBlockNumber, sendTransaction } from 'viem/actions' // [!code hl]

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

// 3. Extract a Viem Client for the current active chain.
const publicClient = getClient(config)
const blockNumber = await getBlockNumber(publicClient) // [!code hl]

// 4. Extract a Viem Client for the current active chain & account.
const walletClient = getConnectorClient(config)
const hash = await sendTransaction(walletClient, /* ... */) // [!code hl]
```

```tsx [Viem Usage]
// Manually set up Viem Clients without wagmi. Don't do this, it's only here 
// to demonstrate the amount of boilerplate required.

import { createPublicClient, createWalletClient, http } from 'viem'
import { base, mainnet, optimism, zora } from 'viem/chains'

const publicClient = {
  base: createPublicClient({
    chain: base,
    transport: http()
  }),
  mainnet: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  optimism: createPublicClient({
    chain: optimism,
    transport: http()
  }),
  zora: createPublicClient({
    chain: zora,
    transport: http()
  })
} as const

const walletClient = {
  base: createWalletClient({
    chain: base,
    transport: custom(window.ethereum)
  }),
  mainnet: createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
  }),
  optimism: createWalletClient({
    chain: optimism,
    transport: custom(window.ethereum)
  }),
  zora: createWalletClient({
    chain: zora,
    transport: custom(window.ethereum)
  })
} as const

const blockNumber = await publicClient.mainnet.getBlockNumber()
const hash = await walletClient.mainnet.sendTransaction(/* ... */)
```

:::

## Private Key & Mnemonic Accounts

It is possible to utilize Viem's [Private Key & Mnemonic Accounts](https://viem.sh/docs/accounts/local.html) with Wagmi by explicitly passing through the account via the `account` argument on Wagmi Actions.

```tsx
import { http, createConfig, sendTransaction } from '@wagmi/core' 
import { base, mainnet, optimism, zora } from '@wagmi/core/chains' 
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

const hash = await sendTransaction({ 
  account, // [!code hl]
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

::: info

Wagmi currently does not support hoisting Private Key & Mnemonic Accounts to the top-level Wagmi Config – meaning you have to explicitly pass through the account to every Action. If you feel like this is a feature that should be added, please [open a discussion](https://github.com/wevm/wagmi/discussions/new?category=ideas).

:::
