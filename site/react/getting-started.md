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
// @twoslash-cache: {"v":1,"hash":"1e950b442ed7db157508f31fce13aca96913b67241b30d5521468ad652cad085","data":"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="}
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
// @twoslash-cache: {"v":1,"hash":"849a5652cb34072baf13797118507e525565a80b04851946389914c2dc341926","data":"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"}
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

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi React Hooks.

::: code-group
```tsx [profile.tsx]
import { useConnection, useEnsName } from 'wagmi'

export function Profile() {
  const { address } = useConnection()
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
