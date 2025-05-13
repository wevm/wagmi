<script setup>
import packageJson from '../../packages/react/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Getting Started

## Overview

Wagmi is a React Hooks library for Ethereum. You can learn more about the rationale behind the project in the [Why Wagmi](/react/why) section.

## Automatic Installation

For new projects, it is recommended to set up your Wagmi app using the [`create-wagmi`](/cli/create-wagmi) command line interface (CLI). This will create a new Wagmi project using TypeScript and install the required dependencies.

::: code-group
```bash [pnpm]
pnpm create wagmi
```

```bash [npm]
npm create wagmi@latest
```

```bash [yarn]
yarn create wagmi
```

```bash [bun]
bun create wagmi
```
:::

Once the command runs, you'll see some prompts to complete.

```ansi
Project name: wagmi-project
Select a framework: React / Vanilla
...
```

After the prompts, `create-wagmi` will create a directory with your project name and install the required dependencies. Check out the `README.md` for further instructions (if required).

## Manual Installation

To manually add Wagmi to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [npm]
npm install wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [yarn]
yarn add wagmi viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [bun]
bun add wagmi viem@{{viemVersion}} @tanstack/react-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
<<< @/snippets/react/config.ts[config.ts]
:::

In this example, Wagmi is configured to use the Mainnet and Sepolia chains, and `injected` connector. Check out the [`createConfig` docs](/react/api/createConfig) for more configuration options.


::: details TypeScript Tip
If you are using TypeScript, you can "register" the Wagmi config or use the hook `config` property to get strong type-safety across React Context in places that wouldn't normally have type info.

::: code-group
```ts twoslash [register config]
// @errors: 2322
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from 'wagmi'

useBlockNumber({ chainId: 123 })

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
```

```ts twoslash [hook config property]
// @errors: 2322
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from 'wagmi'

useBlockNumber({ chainId: 123, config })
```

By registering or using the hook `config` property, `useBlockNumber`'s `chainId` is strongly typed to only allow Mainnet and Sepolia IDs. Learn more by reading the [TypeScript docs](/react/typescript#config-types).
:::

### Wrap App in Context Provider

Wrap your app in the `WagmiProvider` React Context Provider and pass the `config` you created earlier to the `config` property.

::: code-group
```tsx [app.tsx]
import { WagmiProvider } from 'wagmi' // [!code focus]
import { config } from './config' // [!code focus]

function App() {
  return (
    <WagmiProvider config={config}> // [!code focus]
      {/** ... */} // [!code focus]
    </WagmiProvider> // [!code focus]
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [`WagmiProvider` docs](/react/api/WagmiProvider) to learn more about React Context in Wagmi.

### Setup TanStack Query

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
      <QueryClientProvider client={queryClient}> // [!code focus]
        {/** ... */} // [!code focus]
      </QueryClientProvider> // [!code focus]
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi React Hooks.

::: code-group
```tsx [profile.tsx]
import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
  const { address } = useAccount()
  const { data, error, status } = useEnsName({ address })
  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
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
<<< @/snippets/react/config.ts[config.ts]
:::

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/react/typescript) Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
- [**Connect Wallet**](/react/guides/connect-wallet) Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
- [**React Hooks**](/react/api/hooks) Browse the collection of React Hooks and learn how to use them.
- [**Viem**](/react/guides/viem) Learn about Viem and how it works with Wagmi.
