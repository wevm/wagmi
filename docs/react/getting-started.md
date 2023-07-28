# Getting Started

## Automatic Installation

For new projects, it is recommended to set up your Wagmi app using the `create-wagmi` command line interface (CLI). This will create a new Wagmi project using TypeScript and install the required dependencies.

::: code-group
```bash [pnpm]
pnpm create wagmi
```

```bash [npm]
npm init wagmi
```

```bash [yarn]
yarn create wagmi
```
:::

Once the command runs, you'll see the following prompts.

```
What is your project named? my-app
What framework would you like to use? Next.js / Vite (React)
```

After the prompts, `create-wagmi` will create a directory with your project name and install the required dependencies. Check out the `README.md` for further instructions.

## Manual Installation

To manually add Wagmi to your project, install the required packages.

::: code-group
```bash [pnpm]
pnpm add wagmi viem @tanstack/react-query
```

```bash [npm]
npm install wagmi viem @tanstack/react-query
```

```bash [yarn]
yarn add wagmi viem @tanstack/react-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/latest) is an async state manager that handles requests, caching, and more.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
<<< @/snippets/react/config.ts[config.ts]
:::

In this example, Wagmi is configured to use the Mainnet and Sepolia chains, and `injected` connector. Check out the [`createConfig` docs](/react/createConfig) for more configuration options.

---

If you are using [TypeScript](/react/typescript), you can "register" the Wagmi `config` to get strong type-safety across React Context in places that wouldn't normally have type info.

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

By registering the `config`, `useBlockNumber`'s `chainId` is strongly typed to only allow Mainnet and Sepolia IDs.

### Wrap App in Context Provider

Wrap your app in the `WagmiProvider` React Context Provider and pass the `config` you created earlier to the `value` property.

::: code-group
```tsx [app.tsx]
import { WagmiProvider } from 'wagmi' // [!code focus]
import { config } from './config' // [!code focus]

function App() {
  return (
    <WagmiProvider value={config}> // [!code focus]
      {/** Your App */} // [!code focus]
    </WagmiProvider> // [!code focus]
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [`WagmiProvider` docs](/react/WagmiProvider) to learn more about React Context in Wagmi.

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
    <WagmiProvider value={config}>
      <QueryClientProvider client={queryClient}> // [!code focus]
        {/** Your App */} // [!code focus]
      </QueryClientProvider> // [!code focus]
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [TanStack Query docs](https://tanstack.com/query/v5/docs/react) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi React Hooks.

::: code-group
```tsx [profile.tsx]
import { useAccount, useEnsName } from 'wagmi'

function Profile() {
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

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider value={config}>
      <QueryClientProvider client={queryClient}>
        {/** Your App */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wagmi-dev/wagmi/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add wagmi@canary
```

```bash [npm]
npm install wagmi@canary
```

```bash [yarn]
yarn add wagmi@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wagmi-dev/wagmi) to your local machine, build, and link it yourself.

```bash
git clone https://github.com/wagmi-dev/wagmi.git
cd wagmi
pnpm install
pnpm build
cd packages/react
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global wagmi` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](#manual-installation) and their versions are correct.

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/react/typescript) Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
- [**Connect Wallet**](/react/) Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
- [**React Hooks**](/react/) Browse the collection of React Hooks and learn how to use them.