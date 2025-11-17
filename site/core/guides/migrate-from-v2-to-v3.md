---
title: Migrate from v2 to v3
description: Guide for migrating from Wagmi v2 to v3.
---

<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'
const docsPath = 'core'
</script>

# Migrate from v2 to v3

## Overview

Wagmi v3 gives you total control over connector dependencies. Since Wagmi's initial release, Wagmi included required connector dependencies as part of its package to eliminate the need to manage multiple third-party dependencies.

This worked worked well in the early years as a "batteries-included" approach, but didn't allow for more fine-grained control over your dependency tree. By giving you control over connector dependencies, you can decide to only install what you need, manage version bumps at your own pace, and have total control over what third-party code and licenses you bring into your project

To get started, install the latest version of Wagmi.

::: code-group
```bash [pnpm]
pnpm add @wagmi/core@3
```

```bash [npm]
npm install @wagmi/core@3
```

```bash [yarn]
yarn add @wagmi/core@3
```

```bash [bun]
bun add @wagmi/core@3
```
:::

::: info Not ready to migrate yet?
The Wagmi v2 docs are still available at [2.x.wagmi.sh/core](https://2.x.wagmi.sh/core).
:::

<!-- @include: @shared/migrate-from-v2-to-v3.md -->

## Deprecations

### Renamed Account Actions

At the core of Wagmi are connections between apps and Ethereum providers (e.g. EIP-1193), `getAccount`, `switchAccount`, and `watchAccount` are renamed to `getConnection`, `switchConnection`, and `watchConnection` to more accurately represent to how Wagmi works.

```ts
import {
  getAccount, // [!code --]
  getConnection, // [!code ++]
  switchAccount, // [!code --]
  switchConnection, // [!code ++]
  watchAccount, // [!code --]
  watchConnection, // [!code ++]
} from '@wagmi/core'
```

`switchAccountMutationOptions` is also updated to `switchConnectionMutationOptions`.

```ts
import {
  switchAccountMutationOptions, // [!code --]
  switchConnectionMutationOptions, // [!code ++]
} from '@wagmi/core/query'

```
