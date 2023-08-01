# getAccount

Action for getting current account.

## Import

```ts
import { getAccount } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getAccount } from '@wagmi/core'
import { config } from './config'

const account = getAccount(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetAccountReturnType } from '@wagmi/core'
```

<!--@include: @shared/getAccount-return-type.md-->

## watchAccount

Subscribe to account changes.

### Import

```ts
import { watchAccount } from '@wagmi/core'
```

### Usage

::: code-group
```ts [index.ts]
import { watchAccount } from '@wagmi/core'
import { config } from './config'

const unwatch = watchAccount(config, {
  onChange(data) {
    console.log('Account changed!', data)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Parameters

```ts
import { type WatchAccountParameters } from '@wagmi/core'
```

#### onChange

`onChange: (data: GetAccountReturnType) => void`

Callback function called when account changes.

::: code-group
```ts [index.ts]
import { watchAccount } from '@wagmi/core'
import { config } from './config'

const unwatch = watchAccount(config, {
  onChange(data) { // [!code focus:3]
    console.log('Account changed!', data)
  },
})
unwatch()
```
<<< @/snippets/core/config.ts[config.ts]
:::

### Return Type

```ts
import { type WatchAccountReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.