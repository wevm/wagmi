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
If you are using TypeScript, you can "register" the Wagmi config or use the hook `config` property to get strong type-safety across Solid Context in places that wouldn't normally have type info.

::: code-group
```ts twoslash [register config]
// @twoslash-cache: {"v":1,"hash":"5a265a7585bba6cc64f83e9dd43093d209786bd39bd0106c74836c3c3bff74f8","data":"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"}
// @errors: 2345
import { type Config } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from '@wagmi/solid'

useBlockNumber(() => ({ chainId: 123 }))

declare module '@wagmi/solid' {
  interface Register {
    config: typeof config
  }
}
```

```ts twoslash [hook config property]
// @twoslash-cache: {"v":1,"hash":"f81e0bbbae23a2914d38755afa1fcae7b27d59df3ac778f5d55a5f0a3952daf7","data":"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="}
// @errors: 2345
import { type Config } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from '@wagmi/solid'

useBlockNumber(() => ({ chainId: 123, config }))
```

By registering or using the hook `config` property, `useBlockNumber`'s `chainId` is strongly typed to only allow Mainnet and Sepolia IDs. Learn more by reading the [TypeScript docs](/solid/typescript#config-types).
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
