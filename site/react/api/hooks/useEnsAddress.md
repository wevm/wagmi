---
title: useEnsAddress
description: Hook for fetching ENS address for name.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getEnsAddress'
const typeName = 'GetEnsAddress'
const TData = 'string'
const TError = 'GetEnsAddressErrorType'
</script>

# useEnsAddress

Hook for fetching ENS address for name.

## Import

```ts
import { useEnsAddress } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    name: normalize('wevm.eth'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

::: warning
Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `useEnsAddress`. You can use Viem's built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
:::

## Parameters

```ts
import { type UseEnsAddressParameters } from 'wagmi'
```

---

### blockNumber

`bigint | undefined`

Block number to get ENS address at.

::: code-group
```ts [index.ts]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    blockNumber: 17829139n, // [!code focus]
    name: normalize('wevm.eth'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get ENS address at.

::: code-group
```ts [index.ts]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    name: normalize('wevm.eth'),
    blockTag: 'latest', // [!code focus]
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
import { useEnsAddress } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    chainId: mainnet.id, // [!code focus]
    name: normalize('wevm.eth'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### coinType

`number | undefined`

The [ENSIP-9](https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution) coin type to fetch the address for.

::: code-group
```ts [index.ts]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    coinType: 60, // [!code focus]
    name: normalize('wevm.eth'),
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
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'
import { config } from './config' // [!code focus]

function App() {
  const result = useEnsAddress({
    config, // [!code focus]
    name: normalize('wevm.eth'),
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### name

`string | undefined`

Name to get the address for. [`enabled`](#enabled) set to `false` if `name` is `undefined`.

::: code-group
```ts [index.ts]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    name: normalize('wevm.eth'), // [!code focus]
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
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    name: normalize('wevm.eth'),
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### universalResolverAddress

`Address | undefined`

- Address of ENS Universal Resolver Contract.
- Defaults to current chain's Universal Resolver Contract address.

::: code-group
```ts [index.ts]
import { useEnsAddress } from 'wagmi'
import { normalize } from 'viem/ens'

function App() {
  const result = useEnsAddress({
    name: normalize('wevm.eth'),
    universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEnsAddressReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getEnsAddress`](/core/api/actions/getEnsAddress)
