# getBlockNumber

Action for fetching block number.

## Import

```ts
import { getBlockNumber } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBlockNumber } from '@wagmi/core'
import { config } from './config'
```
<<< snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBlockNumberParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type GetBlockNumberReturnType } from '@wagmi/core'
```

## Error

```ts
import { type GetBlockNumberError } from '@wagmi/core'
```

## Watcher

### Import

```ts
import { watchBlockNumber } from '@wagmi/core'
```

### Usage

::: code-group
```ts [index.ts]
import { watchBlockNumber } from '@wagmi/core'
import { config } from './config'
```
<<< snippets/core/config.ts[config.ts]
:::

### Parameters

```ts
import { type WatchBlockNumberParameters } from '@wagmi/core'
```

### Return Type

```ts
import { type WatchBlockNumberReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## TanStack Query

```ts
import {
  type GetBlockNumberQueryParameters,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryFnData,
  getBlockNumberQueryOptions,
} from '@wagmi/core'
```