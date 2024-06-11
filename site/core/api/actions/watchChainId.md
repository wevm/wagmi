# watchChainId

Subscribe to chain ID changes.

## Import

```ts
import { watchChainId } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchChainId } from '@wagmi/core'
import { config } from './config'

const unwatch = watchChainId(config, {
  onChange(chainId) {
    console.log('Chain ID changed!', chainId)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchChainIdParameters } from '@wagmi/core'
```

### onChange

`onChange(chainId: GetChainIdReturnType, prevChainId: GetChainIdReturnType): void`

Callback function called when chain ID changes.

::: code-group
```ts [index.ts]
import { watchChainId } from '@wagmi/core'
import { config } from './config'

const unwatch = watchChainId(config, {
  onChange(chainId) { // [!code focus:3]
    console.log('Chain ID changed!', chainId)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchChainIdReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.