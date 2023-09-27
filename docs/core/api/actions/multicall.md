# multicall

Action for batching up multiple functions on a contract in a single RPC call via the [Multicall3 contract](https://github.com/mds1/multicall).

## Import

```ts
import { multicall } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { multicall } from '@wagmi/core'
import { config } from './config'
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type MulticallParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type MulticallReturnType } from '@wagmi/core'
```

## Type Inference

## Error

```ts
import { type MulticallError } from '@wagmi/core'
```

## Viem

- [`multicall`](https://viem.sh/docs/actions/public/multicall.html)
