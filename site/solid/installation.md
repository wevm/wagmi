<script setup>
import packageJson from '../../packages/solid/package.json'

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

## Requirements

`@wagmi/solid` requires the following peer dependencies:

- `solid-js@1.x`
- `viem@2.x`
- `@tanstack/solid-query@>=5.0.0`

Make sure you have these installed in your project.
