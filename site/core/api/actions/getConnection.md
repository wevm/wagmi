# getConnection

Action for getting current connection.

## Import

```ts
import { getConnection } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnection } from '@wagmi/core'
import { config } from './config'

const connection = getConnection(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetConnectionReturnType } from '@wagmi/core'
```

<!--@include: @shared/getConnection-return-type.md-->
