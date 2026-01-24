---
title: Migrate from v2 to v3
description: Guide for migrating from Wagmi v2 to v3.
---

<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'
const docsPath = 'react'
</script>

# Migrate from v2 to v3

## Overview

Wagmi v3 gives you total control over connector dependencies. Since Wagmi's initial release, Wagmi included required connector dependencies as part of its package to eliminate the need to manage multiple third-party dependencies.

This worked worked well in the early years as a "batteries-included" approach, but didn't allow for more fine-grained control over your dependency tree. By giving you control over connector dependencies, you can decide to only install what you need, manage version bumps at your own pace, and have total control over what third-party code and licenses you bring into your project

To get started, install the latest version of Wagmi.

::: code-group
```bash [pnpm]
pnpm add wagmi@3
```

```bash [npm]
npm install wagmi@3
```

```bash [yarn]
yarn add wagmi@3
```

```bash [bun]
bun add wagmi@3
```
:::

::: info Not ready to migrate yet?
The Wagmi v2 docs are still available at [2.x.wagmi.sh/react](https://2.x.wagmi.sh/react).
:::

<!-- @include: @shared/migrate-from-v2-to-v3.md -->

## Deprecations

### Renamed Account Hooks

At the core of Wagmi are connections between apps and Ethereum providers (e.g. EIP-1193), `useAccount`, `useAccountEffect`, and `useSwitchAccount` are renamed to `useConnection`, `useConnectionEffect`, and `useSwitchConnection` to more accurately represent to how Wagmi works.

```ts
import {
  useAccount, // [!code --]
  useConnection, // [!code ++]
  useAccountEffect, // [!code --]
  useConnectionEffect, // [!code ++]
  useSwitchAccount, // [!code --]
  useSwitchConnection, // [!code ++]
} from 'wagmi'
```

### Renamed mutateFn

Renamed custom mutate function names to `mutate`/`mutateAsync` to reduce destructure key renaming fatigue and align with TanStack Query terminology.

##### Before

Had to destructure hook result and often rename keys when using multiple of the same hook. Could decide not to destructure, but syntax becomes awkward for mutate functions (e.g. `connect.connect` or `connect.connectAsync`).

```ts
const { connect, isPending: connectIsPending } = useConnect()
const { writeContract: transfer, error: transferError, isPending: transferIsPending } = useWriteContract()
const { writeContract: approve, error: approveError } = useWriteContract()
```

##### After

Allows you to name the hook result whatever you want and not worry about also renaming properties.

```ts
const connect = useConnect() // connect.mutate, connect.isPending
const transfer = useWriteContract() // transfer.mutate, transfer.error, transfer.isPending
const approve = useWriteContract() // approve.mutate, approve.error
```

### Removed `useConnect().connectors` & `useReconnect().connectors`

Moving forward, `useConnect().connectors` and `useReconnect().connectors` are no longer supported. Use [`useConnectors`](/react/api/hooks/useConnectors) instead.

```ts
import { useConnect, useReconnect } from 'wagmi' // [!code --]
import { useConnectors } from 'wagmi' // [!code ++]

const { connectors } = useConnect() // [!code --]
const { connectors } = useReconnect() // [!code --]
const connectors = useConnectors() // [!code ++]
```

### Removed `useDisconnect().connectors` & `useSwitchConnection().connectors`

Moving forward, `useDisconnect().connectors` and `useSwitchConnection().connectors` are no longer supported. Use [`useConnections`](/react/api/hooks/useConnections) instead.

```ts
import { useDisconnect, useSwitchConnection } from 'wagmi' // [!code --]
import { useConnections } from 'wagmi' // [!code ++]

const { connectors } = useDisconnect() // [!code --]
const { connectors } = useSwitchConnection() // [!code --]
const connections = useConnections() // [!code ++]
const connectors = connections.map((connection) => connection.connector) // [!code ++]
```

### Removed `useSwitchChain().chains`

Moving forward, `useSwitchChain().chains` is no longer supported. Use [`useChains`](/react/api/hooks/useChains) instead.

```ts
import { useSwitchChain } from 'wagmi' // [!code --]
import { useChains } from 'wagmi' // [!code ++]

const { chains } = useSwitchChain() // [!code --]
const chains = useChains() // [!code ++]
```

