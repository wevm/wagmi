# useWatchBlocks

Hook that watches for block changes.

## Import

```ts
import { useWatchBlocks } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) {
      console.log('Block changed!', blockNumber)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchBlocksParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseWatchBlocksReturnType } from 'wagmi'
```

## Action

- [`watchBlocks`](/core/api/actions/watchBlocks)
