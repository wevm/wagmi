<script setup>
import packageJson from '../../packages/solid/package.json'

const docsPath = 'solid'
const packageDir = 'solid'
const packageName = '@wagmi/solid'
const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install `@wagmi/solid` via your package manager.

## Package Manager

Install the required packages.

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

<!--@include: @shared/installation.md-->
