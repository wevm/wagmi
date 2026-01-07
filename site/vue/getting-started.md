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
// @twoslash-cache: {"v":1,"hash":"a23946e4e600232f2356272aa1638ad6dfa3cb14a3230c917234b4d331429652","data":"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"}
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
// @twoslash-cache: {"v":1,"hash":"b0daf106bbcd51604a04f61b444559e5b4612f840caeff27571cf1d2939b54a2","data":"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"}
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

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/vue/overview) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside your app can use Wagmi Vue Composables.

::: code-group
```vue [App.vue]
<script setup lang="ts">
import { useConnection, useEnsName } from '@wagmi/vue'

const { address } = useConnection()
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

