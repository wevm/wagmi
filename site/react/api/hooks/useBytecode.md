---
title: useBytecode
description: Hook for retrieving the bytecode at an address.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getBytecode'
const typeName = 'GetBytecode'
const TData = 'GetBytecodeData'
const TError = 'GetBytecodeErrorType'
</script>

# useBytecode

Hook for retrieving the bytecode at an address.

## Import

```ts
import { useBytecode } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBytecodeParameters } from 'wagmi'
```

### address

`Address | undefined`

The contract address.

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

The block number to check the bytecode at.

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockNumber: 16280770n, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to check the bytecode at.

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'

function App() {
  const result = useBytecode({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockTag: 'safe', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The chain ID to check the bytecode at.

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useBytecode({
    chainId: mainnet.id, // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBytecode({
    config, // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useBytecode } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBytecode({
    scopeKey: 'foo' // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBytecodeReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBytecode`](/core/api/actions/getBytecode)
