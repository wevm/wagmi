# watchConnectors

Subscribe to connectors changes.

## Import

```ts
import { watchConnectors } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchConnectors } from '@wagmi/core'
import { config } from './config'

const unwatch = watchConnectors(config, {
  onChange(connectors) {
    console.log('Connectors changed!', connectors)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchConnectorsParameters } from '@wagmi/core'
```

### onChange

`onChange(connectors: GetConnectorsReturnType, prevConnectors: GetConnectorsReturnType): void`

Callback function called when connectors changes.

::: code-group
```ts [index.ts]
import { watchConnectors } from '@wagmi/core'
import { config } from './config'

const unwatch = watchConnectors(config, {
  onChange(connectors) { // [!code focus:3]
    console.log('Connectors changed!', connectors)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchConnectorsReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.