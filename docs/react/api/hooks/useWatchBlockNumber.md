# useWatchBlockNumber

Hook that watches for block number changes.

## Import

```ts
import { useWatchBlockNumber } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) {
      console.log('Block number changed!', blockNumber)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchBlockNumberParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseWatchBlockNumberReturnType } from 'wagmi'
```

## Action

- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
