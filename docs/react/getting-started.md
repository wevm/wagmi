# Getting Started

## Automatic Installation

It is recommended to set up your wagmi app using the `create-wagmi` command line interface (CLI). This will set up a new wagmi app using TypeScript and install the required dependencies:

::: code-group
```sh [pnpm]
pnpm create wagmi
```

```sh [npm]
npm init wagmi
```

```sh [yarn]
yarn create wagmi
```
:::

On installation, you'll see the following prompts:

```
What is your project named? my-app
What framework would you like to use? Next.js / Vite (React)
```

After the prompts, `create-wagmi` will create a folder with your project name and install the required dependencies.

## Manual Installation

To manually add wagmi to your project, install the required packages:

::: code-group
```sh [pnpm]
pnpm add wagmi viem @tanstack/react-query
```

```sh [npm]
npm install wagmi viem @tanstack/react-query
```

```sh [yarn]
yarn add wagmi viem @tanstack/react-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [Tanstack Query](https://tanstack.com/query/latest) is an async state manager that handles requests, caching, and more.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript Support](/react/typescript).

### Create Config

Create and export a new wagmi config using [`createConfig`](/react/createConfig).

::: code-group
```ts [wagmi.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

TBD - explain above

If you are using [TypeScript](/react/typescript), you can "register" the wagmi `config` to get strong type-safety and inference across React Context in places that wouldn't normally have type info.

```ts
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
```

```ts twoslash
// @errors: 2322
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useBlockNumber } from 'wagmi'

useBlockNumber({ chainId: 123 })
```

### Wrap App in Context Provider

Wrap your app in the `WagmiConfig` context provider and pass the `config`:

::: code-group
```tsx [app.tsx]
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

function App() {
  return (
    <WagmiConfig value={config}>
      {/** Your App */}
    </WagmiConfig>
  )
}
```
```ts [wagmi.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

TBD

### Setup Tanstack Query

https://tanstack.com/query/v5/docs/react/quick-start

::: code-group
```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiConfig value={config}>
      <QueryClientProvider client={queryClient}>
        {/** Your App */}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
```
```ts [wagmi.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

### Use Wagmi

TBD

::: code-group
```tsx [profile.tsx]
import { useAccount, useEnsName } from 'wagmi'

function Profile() {
  const { address } = useAccount()
  const { data } = useEnsName({ address })
}
```
```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiConfig value={config}>
      <QueryClientProvider client={queryClient}>
        {/** Your App */}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
```
```ts [wagmi.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

TBD

## Next Steps