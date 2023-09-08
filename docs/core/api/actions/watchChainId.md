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
  onChange(data) {
    console.log('Chain ID changed!', data)
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

`onChange: (data: GetChainIdReturnType) => void`

Callback function called when chain ID changes.

::: code-group
```ts [index.ts]
import { watchChainId } from '@wagmi/core'
import { config } from './config'

const unwatch = watchChainId(config, {
  onChange(data) { // [!code focus:3]
    console.log('Chain ID changed!', data)
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