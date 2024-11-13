<script setup>
import packageJson from '../../packages/svelte/package.json'

const viemVersion = packageJson.peerDependencies.viem
const tanstackQuery = packageJson.devDependencies["@tanstack/svelte-query"] // TODO: when this gets merged, remove this
</script>

# Getting Started

## Overview

Wagmi is a Svelte library for Ethereum.

## Manual Installation

To manually add Wagmi to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @wagmi/svelte viem@{{viemVersion}} {{tanstackQuery}}
```

```bash-vue [npm]
npm install @wagmi/svelte viem@{{viemVersion}} {{tanstackQuery}}
```

```bash-vue [yarn]
yarn add @wagmi/svelte viem@{{viemVersion}} {{tanstackQuery}}
```

```bash-vue [bun]
bun add @wagmi/svelte viem@{{viemVersion}} {{tanstackQuery}}
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
<<< @/snippets/svelte/config.ts[config.ts]
:::

### Wrap App in Context Provider

Wrap your app in the `WagmiProvider` component and pass the `config` you created earlier to the `config` property. You may do this in the `+layout.svelte` file, or in another component for more fine-grained control.

::: code-group
```svelte [+layout.svelte]
<script lang="ts">
  import { WagmiProvider } from '@wagmi/svelte' // [!code focus]
  import { config } from './config' // [!code focus]

  const { children } = $props();
</script>

<WagmiProvider config={config}> // [!code focus]
  {@render children()} // [!code focus]
</WagmiProvider> // [!code focus]
```
<<< @/snippets/svelte/config.ts[config.ts]
:::

### Setup TanStack Query

Inside the `WagmiProvider`, wrap your app in a TanStack Query Context Provider, e.g. `QueryClientProvider`, and pass a new `QueryClient` instance to the `client` property.

::: code-group
```svelte [+layout.svelte]
<script lang="ts">
  import { WagmiProvider } from '@wagmi/svelte'
  import { config } from './config'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query' // [!code focus]

  const { children } = $props();

  const queryClient = new QueryClient(); // [!code focus]
</script>

<WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}> // [!code focus]
    {@render children()} // [!code focus]
  </QueryClientProvider> // [!code focus]
</WagmiProvider>
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/svelte) to learn about the library, APIs, and more.

### Use Wagmi

Now that everything is set up, every component inside the Wagmi and TanStack Query Providers can use Wagmi React Hooks.

::: code-group
```svelte [+page.svelte]
<script lang="ts">
  import { useAccount, useEnsName } from '@wagmi/svelte';

  const account = $derived.by(useAccount());
  const ensName = $derived.by(useEnsName(() => ({ address: account.address })));
</script>

{#if ensName.status === 'loading'}
  <div>Loading ENS name</div>
{:else if ensName.status === 'error'}
  <div>Error fetching ENS name: {ensName.error.message}</div>
{:else}
  <div>ENS name: {ensName.data}</div>
{/if}
```

```svelte [+layout.svelte]
<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { WagmiProvider } from '@wagmi/svelte';
  import { config } from './config';
  import Profile from './Profile.svelte';

  const queryClient = new QueryClient();

  const { children } = $props();
</script>

<WagmiProvider {config}>
  <QueryClientProvider client={queryClient}>
    {@render children()}
  </QueryClientProvider>
</WagmiProvider>
```
<<< @/snippets/svelte/config.ts[config.ts]
:::

::: danger
Reactivity in Svelte is different than other frameworks! I would highly suggest you read the page on [Reactivity](./reactivity.md)
:::
