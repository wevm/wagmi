# getBalance

Action for fetching balance.

## Import

```ts
import { getBalance } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'
```
<<< snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBalanceParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type GetBalanceReturnType } from '@wagmi/core'
```

## Error

```ts
import { type GetBalanceError } from '@wagmi/core'
```

## Watcher

### Import

```ts
import { watchBalance } from '@wagmi/core'
```

### Usage

::: code-group
```ts [index.ts]
import { watchBalance } from '@wagmi/core'
import { config } from './config'
```
<<< snippets/core/config.ts[config.ts]
:::

### Parameters

```ts
import { type WatchBalanceParameters } from '@wagmi/core'
```

### Return Type

```ts
import { type WatchBalanceReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## TanStack Query

```ts
import {
  type GetBalanceQueryParameters,
  type GetBalanceQueryKey,
  type GetBalanceQueryFnData,
  getBalanceQueryOptions,
} from '@wagmi/core'
```