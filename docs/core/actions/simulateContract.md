<script setup>
const packageName = '@wagmi/core'
const actionName = 'simulateContract'
const typeName = 'SimulateContract'
</script>

# simulateContract

Action for simulating/validating a contract interaction.

## Import

```ts
import { simulateContract } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { simulateContract } from '@wagmi/core'
import { config } from './config'
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SimulateContractParameters } from '@wagmi/core'
```

## Return Type

```ts
import { type SimulateContractReturnType } from '@wagmi/core'
```

## Type Inference

## Error

```ts
import { type SimulateContractError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

[`simulateContract`](https://viem.sh/docs/contract/simulateContract.html)
