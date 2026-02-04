<script setup>
import packageJson from '../../packages/core/package.json'

const viemVersion = '>=2.43.3'
</script>

# Getting Started

## Overview

[Tempo](https://tempo.xyz) is a purpose-built Layer 1 blockchain optimized for payments.

It enshrines features like [token management](https://docs.tempo.xyz/protocol/tip20/overview), [Fee AMM](https://docs.tempo.xyz/protocol/fees), and a [stablecoin DEX](https://docs.tempo.xyz/protocol/exchange) directly into the protocol, as well as a [Tempo transaction type](https://docs.tempo.xyz/protocol/transactions) with support for batch calls, fee sponsorship, configurable fee tokens, concurrent transactions, access keys, and scheduled execution.

## Setup

Wagmi React and Core both have first-class support for Tempo with [Hooks](/tempo/hooks/) and [Actions](/tempo/actions/). To get started, first follow the [Getting Started guide for React](/react/getting-started) or [Core](/core/getting-started) and make sure your [Viem](https://viem.sh) version is `{{viemVersion}}`.

::: code-group
```bash-vue [pnpm]
pnpm add viem@{{viemVersion}}
```
```bash-vue [npm]
npm install viem@{{viemVersion}}
```
```bash-vue [yarn]
yarn add viem@{{viemVersion}}

```bash-vue [bun]
bun add viem@{{viemVersion}}
```
:::

To dive a layer deeper, check out the [Viem Tempo docs](https://viem.sh/tempo).

## Use Wagmi Hooks

Now that everything is set up, we can use regular Wagmi Hooks (e.g. `useSendTransactionSync`) 
that are decorated with [Tempo properties](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction) 
like `calls` (batch transactions), `feePayer` (fee sponsorship), `nonceKey` (concurrent transactions) and more!

::: code-group

```tsx [tokenMetadata.tsx]
import { useSendTransactionSync } from 'wagmi'

export function TokenMetadata() {
  const sendTransactionSync = useSendTransactionSync()

  return (
    <button
      onClick={() =>
        sendTransactionSync.mutate({
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
import { TokenMetadata } from './tokenMetadata'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TokenMetadata />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```
```tsx [config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```
:::

## Use Tempo Hooks

You can also use [Tempo-specific Hooks](/tempo/hooks/):

::: code-group

```tsx [tokenMetadata.tsx]
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
import { TokenMetadata } from './tokenMetadata'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TokenMetadata />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

```tsx [config.ts]
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

- [**Guides & Examples**](https://docs.tempo.xyz/guide/tempo-transaction) Follow guides on how to [use accounts](https://docs.tempo.xyz/guide/use-accounts), [make payments](https://docs.tempo.xyz/guide/payments), [issue stablecoins](https://docs.tempo.xyz/guide/issuance), [exchange stablecoins](https://docs.tempo.xyz/guide/stablecoin-exchange), and more!
- [**Tempo React Hooks**](/tempo/hooks/) Browse the collection of React Hooks and learn how to use them.
- [**Tempo Core Actions**](/tempo/actions/) Browse the collection of Core Actions and learn how to use them.
