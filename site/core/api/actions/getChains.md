# getChains

Action for getting configured chains.

## Import

```ts
import { getChains } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getChains } from '@wagmi/core'
import { config } from './config'

const chains = getChains(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetChainsReturnType } from '@wagmi/core'
```

`readonly [Chain, ...Chain[]]`

Chains from [`config.chains`](/core/api/createConfig#chains).
