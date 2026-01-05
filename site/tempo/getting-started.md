# Getting Started

## Overview

[Tempo](https://tempo.xyz) is a purpose-built Layer 1 blockchain optimized for payments.

It enshrines features like [token management](https://docs.tempo.xyz/protocol/tip20/overview), [Fee AMM](https://docs.tempo.xyz/protocol/fees), and a [stablecoin DEX](https://docs.tempo.xyz/protocol/exchange) directly into the protocol, as well as a [Tempo transaction type](https://docs.tempo.xyz/protocol/transactions) with support for batch calls, fee sponsorship, configurable fee tokens, concurrent transactions, access keys, and scheduled execution.

## Setup

### Install

### Create Config

Create and export a new Wagmi config using `createConfig`.

```tsx
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

In this example, Wagmi is configured to use the Tempo chain and `webAuthn` connector to enable Passkeys. Check out the [`createConfig` docs](https://wagmi.sh/react/api/createConfig) for more configuration options.

::: tip

It is highly recommended to set a `feeToken` on the `tempo` chain, which will be used as the
default fee token for all transactions. If you do not wish to use a default fee token, you can set
it to `null` to opt in to Tempo's [default fee token preferences](https://docs.tempo.xyz/protocol/fees/spec-fee#fee-token-preferences).

:::

## Wrap App in Context Provider

Wrap your app in the `WagmiProvider` React Context Provider and pass the `config` you created earlier to the `config` property.

::: code-group

```tsx [app.tsx]
import { WagmiProvider } from 'wagmi' // [!code focus]
import { config } from './config' // [!code focus]

function App() {
  return (
    <WagmiProvider config={config}> {/* [!code focus] */}
      {/** ... */}
    </WagmiProvider> // [!code focus] 
  )
}
```

```tsx [config.ts]
// @noErrors
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

:::

Check out the [`WagmiProvider` docs](https://wagmi.sh/react/api/WagmiProvider) to learn more about React Context in Wagmi.

## Setup TanStack Query

Inside the `WagmiProvider`, wrap your app in a TanStack Query React Context Provider, e.g. `QueryClientProvider`, and pass a new `QueryClient` instance to the `client` property.

::: code-group

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // [!code focus]
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient() // [!code focus]

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> {/* [!code focus] */}
        {/** ... */} 
      </QueryClientProvider> {/* [!code focus] */}
    </WagmiProvider>
  )
}
```

```tsx [config.ts]
// @noErrors
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

:::

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) to learn about the library, APIs, and more.

## Use Wagmi Hooks

Now that everything is set up, we can now use regular Wagmi Hooks (e.g. `useSendTransactionSync`) 
that are decorated with [Tempo properties](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction) 
like `calls` (batch transactions), `feePayer` (fee sponsorship), `nonceKey` (concurrent transactions) and more!

::: code-group

```tsx [balance.tsx]
import { useAccount, useSendTransactionSync } from 'wagmi'

export function TokenMetadata() {
  const { sendTransactionSync } = useSendTransactionSync()

  return (
    <button
      onClick={() =>
        sendTransactionSync({
          calls: [
            {
              data: '0xcafebabe00000000000000000000000000000001',
              to: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
            },
            {
              data: '0xdeadbeef00000000000000000000000000000002',
              to: '0xfeedfacefeedfacefeedfacefeedfacefeedface'
            },
            {
              data: '0xfeedface00000000000000000000000000000003',
              to: '0xfeedfacefeedfacefeedfacefeedfacefeedface'
            },
          ],
          feePayer: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          nonceKey: 1337n,
        })
      }
    >
      Send transaction
    </button>
  )
}
```

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { Profile } from './profile'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

```tsx [config.ts]
// @noErrors
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

:::

## Use Tempo Hooks

You can also use [Tempo-specific Hooks](/tempo/hooks):

::: code-group

```tsx [balance.tsx]
import { useAccount } from 'wagmi'
import { Hooks } from 'wagmi/tempo'

const alphaUsd = '0x20c0000000000000000000000000000000000001'

export function TokenMetadata() {
  const { data: metadata, ...metadataQuery } = Hooks.token.useGetMetadata({ 
    token: alphaUsd 
  })

  if (metadataQuery.isError)
    return <div>Error fetching metadata: {metadataQuery.error.message}</div>
  if (metadataQuery.isLoading) return <div>Loading metadata...</div>
  return <div>{metadata.name} ({metadata.symbol})</div>
}
```

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { Profile } from './profile'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

```tsx [config.ts]
// @noErrors
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

:::

## Next Steps

After you have set up your Tempo with Wagmi, you can now:

- Follow a guide on how to [use accounts](https://docs.tempo.xyz/guide/use-accounts), [make payments](https://docs.tempo.xyz/guide/payments), [issue stablecoins](https://docs.tempo.xyz/guide/issuance), [exchange stablecoins](https://docs.tempo.xyz/guide/stablecoin-exchange), and [more(https://docs.tempo.xyz/).
- Use the [suite of Tempo Hooks](/tempo/hooks)
