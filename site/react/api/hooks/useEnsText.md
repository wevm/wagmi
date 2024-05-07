---
title: useEnsText
description: Hook for fetching a text record for a specified ENS name and key.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getEnsText'
const typeName = 'GetEnsText'
const TData = 'string | null'
const TError = 'GetEnsTextErrorType'
</script>

# useEnsText

Hook for fetching a text record for a specified ENS name and key.

## Import

```ts
import { useEnsText } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `useEnsText`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type UseEnsTextParameters } from 'wagmi'
```

---

### blockNumber

`bigint | undefined`

Block number to get the text at.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    blockNumber: 17829139n, // [!code focus]
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get the text at.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    blockTag: 'latest', // [!code focus]
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useEnsText } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    chainId: mainnet.id, // [!code focus]
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### key

`string | undefined`

ENS key to get Text for.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    name: normalize('wevm.eth'),
    key: 'com.twitter', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


### name

`string | undefined`

Name to get the text for. [`enabled`](#enabled) set to `false` if `name` is `undefined`.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    name: normalize('wevm.eth'), // [!code focus]
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'
import { config } from './config' // [!code focus]

function App() {
  const result = useEnsText({
    config, // [!code focus]
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    scopeKey: 'foo', // [!code focus]
    name: normalize('wevm.eth'),
    key: 'com.twitter',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### universalResolverAddress

`Address | undefined`

- Resolver of ENS Universal Resolver Contract.
- Defaults to current chain's Universal Resolver Contract address.

::: code-group
```ts [index.ts]
import { useEnsText } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsText({
    name: normalize('wevm.eth'),
    key: 'com.twitter',
    universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEnsTextReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getEnsText`](/core/api/actions/getEnsText)
