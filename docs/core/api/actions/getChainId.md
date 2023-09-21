# getChainId

Action for getting current chain ID.

## Import

```ts
import { getChainId } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getChainId } from '@wagmi/core'
import { config } from './config'

const chainId = getChainId(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetChainIdReturnType } from '@wagmi/core'
```

`number`

Current chain ID from [`config.state.chainId`](/core/api/createConfig#chainid).
