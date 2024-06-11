<script setup>
import packageJson from '../../packages/vue/package.json'
import Browsers from '../components/Browsers.vue'

const docsPath = 'vue'
const packageDir = 'vue'
const packageName = '@wagmi/vue'
const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install Wagmi via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

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

<!--@include: @shared/installation.md-->
