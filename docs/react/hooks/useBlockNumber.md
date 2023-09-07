<script setup>
const packageName = 'wagmi'
const actionName = 'getBlockNumber'
const typeName = 'GetBlockNumber'
const TData = 'bigint'
const TError = 'GetBlockNumberError'
</script>

# useBlockNumber

Hook for fetching the number of the most recent block seen.

## Import

```ts
import { useBlockNumber } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBlockNumberParameters } from 'wagmi'
```

### cacheTime

`number | undefined`

Time in milliseconds that cached block number will remain in memory.

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber({
    cacheTime: 4_000, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useBlockNumber({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlockNumber({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### watch

`boolean | UseWatchBlockNumberParameters | undefined`

- Enables/disables listening for block number changes.
- Can pass a subset of [`UseWatchBlockNumberParameters`](/react/hooks/useWatchBlockNumber#parameters)directly to [`useWatchBlockNumber`](/react/hooks/useWatchBlockNumber).

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber({
    watch: true, // [!code focus]
  })
}
```
```tsx [index-2.tsx]
import { useBlockNumber } from 'wagmi'

function App() {
  const result = useBlockNumber({
    watch: { // [!code focus]
      pollingInterval: 4_000, // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBlockNumberReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [getBlockNumber](/core/actions/getBlockNumber)
- [watchBlockNumber](/core/actions/getBlockNumber#watchblocknumber)