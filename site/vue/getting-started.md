<script setup>
import packageJson from '../../packages/vue/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Getting Started

## Overview

Wagmi is a collection of Vue composition utilities for Ethereum. You can learn more about the rationale behind the project in the [Why Wagmi](/vue/why) section.

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
Select a framework: Vue / Vanilla
...
```

After the prompts, `create-wagmi` will create a directory with your project name and install the required dependencies. Check out the `README.md` for further instructions (if required).

## Manual Installation

To manually add Wagmi to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [npm]
npm install @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [yarn]
yarn add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```

```bash-vue [bun]
bun add @wagmi/vue viem@{{viemVersion}} @tanstack/vue-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/vue/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/vue/typescript).

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
<<< @/snippets/vue/config.ts[config.ts]
:::

In this example, Wagmi is configured to use the Mainnet and Sepolia chains, and `injected` connector. Check out the [`createConfig` docs](/vue/api/createConfig) for more configuration options.

::: details TypeScript Tip
If you are using TypeScript, you can "register" the Wagmi config or use the hook `config` property to get strong type-safety in places that wouldn't normally have type info.

::: code-group
```ts twoslash [register config]
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123 })

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}
```

```ts twoslash [hook config property]
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

declare const config: Config<readonly [typeof mainnet, typeof sepolia]>
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123, config })
```

By registering or using the hook `config` property, `useBlockNumber`'s `chainId` is strongly typed to only allow Mainnet and Sepolia IDs. Learn more by reading the [TypeScript docs](/vue/typescript#config-types).
:::

### Add Plugin to App

Add the `WagmiPlugin` to your app instance and pass the `config` you created earlier to the plugin options.

::: code-group
```tsx [main.ts]
import { WagmiPlugin } from '@wagmi/vue' // [!code focus]
import { createApp } from 'vue'
import { config } from './config' // [!code focus]
import App from './App.vue'

createApp(App)
  .use(WagmiPlugin, { config }) // [!code focus]
  .mount('#app')
```
```vue [App.vue]
<template>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

Check out the [`WagmiPlugin` docs](/vue/api/WagmiPlugin) to learn more about the plugin API.

### Setup TanStack Query

After the `WagmiPlugin`, attach the `VueQueryPlugin` to your app, and pass a new `QueryClient` instance to the `queryClient` property.

::: code-group
```tsx [main.ts]
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query' // [!code focus]
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'
import { config } from './config'
import App from './App.vue'

const queryClient = new QueryClient() // [!code focus]

createApp(App)
  .use(WagmiPlugin, { config })
  .use(VueQueryPlugin, { queryClient }) // [!code focus]
  .mount('#app')
```
```vue [App.vue]
<template>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/vue) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside your app can use Wagmi Vue Composables.

::: code-group
```vue [App.vue]
<script setup lang="ts">
import { useAccount, useEnsName } from '@wagmi/vue'

const { address } = useAccount()
const { data, error, status } = useEnsName({ address })
</script>

<template>
  <div v-if="status === 'pending'">Loading ENS name</div>
  <div v-else-if="status === 'error'">
    Error fetching ENS name: {{error.message}}
  </div>
  <div v-else>ENS name: {{data}}</div>
</template>
```
```tsx [main.ts]
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'
import { config } from './config'
import App from './App.vue'

const queryClient = new QueryClient()

createApp(App)
  .use(WagmiPlugin, { config })
  .use(VueQueryPlugin, { queryClient })
  .mount('#app')
```
<<< @/snippets/vue/config.ts[config.ts]
:::


## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/vue/typescript) Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
- [**Connect Wallet**](/vue/guides/connect-wallet) Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
- [**Vue Composables**](/vue/api/composables) Browse the collection of Vue Composables and learn how to use them.
- [**Viem**](/vue/guides/viem) Learn about Viem and how it works with Wagmi.

