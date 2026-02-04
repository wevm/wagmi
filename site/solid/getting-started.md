<script setup>
import packageJson from '../../packages/solid/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Getting Started

## Overview

`@wagmi/solid` is a collection of Solid primitives for Ethereum. You can learn more about the rationale behind the project in the [Why Wagmi](/solid/why) section.

## Manual Installation

To manually add `@wagmi/solid` to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/solid viem@{{viemVersion}} @tanstack/solid-query
```

```bash-vue [npm]
npm install @wagmi/solid viem@{{viemVersion}} @tanstack/solid-query
```

```bash-vue [yarn]
yarn add @wagmi/solid viem@{{viemVersion}} @tanstack/solid-query
```

```bash-vue [bun]
bun add @wagmi/solid viem@{{viemVersion}} @tanstack/solid-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/solid/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/solid/typescript).

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

In this example, Wagmi is configured to use the Mainnet and Sepolia chains, and `injected` connector. Check out the [`createConfig` docs](/solid/api/createConfig) for more configuration options.

::: details TypeScript Tip
If you are using TypeScript, you can "register" the Wagmi config or use the primitive `config` property to get strong type-safety across Solid Context in places that wouldn't normally have type info.

::: code-group
```ts [register config]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

declare module '@wagmi/solid' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

### Wrap App in Context Provider

Wrap your app in the `WagmiProvider` Solid Context Provider and pass the `config` you created earlier to the `config` property.

::: code-group
```tsx [App.tsx]
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

function App() {
  return (
    <WagmiProvider config={config}>
      {/** ... */}
    </WagmiProvider>
  )
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

Check out the [`WagmiProvider` docs](/solid/api/WagmiProvider) to learn more about Solid Context in Wagmi.

### Setup TanStack Query

Inside the `WagmiProvider`, wrap your app in a TanStack Query Solid Context Provider, e.g. `QueryClientProvider`, and pass a new `QueryClient` instance to the `client` property.

::: code-group
```tsx [App.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/solid/overview) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi Solid Primitives.

::: code-group
```tsx [Profile.tsx]
import { useConnection } from '@wagmi/solid'

export function Profile() {
  const connection = useConnection()

  return (
    <div>
      <p>Address: {connection.address}</p>
      <p>Status: {connection.status}</p>
    </div>
  )
}
```

```tsx [App.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'
import { Profile } from './Profile'

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
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/solid/typescript) Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
- [**Connect Wallet**](/solid/guides/connect-wallet) Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
- [**Solid Primitives**](/solid/api/primitives) Browse the collection of Solid Primitives and learn how to use them.
- [**Viem**](/solid/guides/viem) Learn about Viem and how it works with Wagmi.
