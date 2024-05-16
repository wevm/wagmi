<script setup>
import packageJson from '../../packages/react/package.json'
import Browsers from '../components/Browsers.vue'

const docsPath = 'react'
const packageDir = 'react'
const packageName = 'wagmi'
const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install Wagmi via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

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

## CDN

If you're not using a package manager, you can also use Wagmi via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html-vue
<script type="module">
  import React from 'https://esm.sh/react@18.2.0'
  import { QueryClient } from 'https://esm.sh/@tanstack/react-query'
  import { createClient } from 'https://esm.sh/viem@{{viemVersion}}'
  import { createConfig } from 'https://esm.sh/wagmi'
</script>
```

Check out the React docs for info on how to use [React without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

<!--@include: @shared/installation.md-->
