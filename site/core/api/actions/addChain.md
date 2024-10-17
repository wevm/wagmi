<script setup>
const packageName = '@wagmi/core'
const actionName = 'addChain'
const typeName = 'AddChain'
</script>

# addChain

Action for adding an EVM chain to the wallet.

## Import

```ts
import { addChain } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { avalanche } from 'viem/chains'
import { addChain } from '@wagmi/core'
import { config } from './config'

await addChain(config, { chain: avalanche })
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type AddChainParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to add chain with.

::: code-group
```ts [index.ts]
import { avalanche } from 'viem/chains'
import { getAccount, addChain } from '@wagmi/core'
import { config } from './config'

const { connector } = getAccount(config)
const result = await addChain(config, {
  connector, // [!code focus]
  chain: avalanche
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Error

```ts
import { type AddChainErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`addChain`](https://viem.sh/docs/actions/wallet/addChain.html)

