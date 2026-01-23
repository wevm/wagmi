# watchConnection

Subscribe to connection changes.

## Import

```ts
import { watchConnection } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchConnection } from '@wagmi/core'
import { config } from './config'

const unwatch = watchConnection(config, {
  onChange(data) {
    console.log('Connection changed!', data)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchConnectionParameters } from '@wagmi/core'
```

### onChange

`onChange(connection: GetConnectionReturnType, prevConnection: GetConnectionReturnType): void`

Callback function called when connection changes.

::: code-group
```ts [index.ts]
import { watchConnection } from '@wagmi/core'
import { config } from './config'

const unwatch = watchConnection(config, {
  onChange(connection) { // [!code focus:3]
    console.log('Connection changed!', connection)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchConnectionReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.
