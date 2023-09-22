<script setup>
const packageName = '@wagmi/core'
const actionName = 'watchContractEvent'
const typeName = 'WatchContractEvent'
</script>

# watchContractEvent

Action that watches and returns emitted contract event logs.

## Import

```ts
import { watchContractEvent } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { config } from './config'
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchContractEventParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type WatchContractEventReturnType } from '@wagmi/core'
```

## Error

```ts
import { type WatchContractEventError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`watchContractEvent`](https://viem.sh/docs/contract/watchContractEvent.html)
