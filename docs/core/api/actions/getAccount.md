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
