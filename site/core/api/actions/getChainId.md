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

::: info
Only returns chain IDs for chains configured via `createConfig`'s [`chains`](/core/api/createConfig#chains) parameter.

If the active [connection](/core/api/createConfig#connection) [`chainId`](/core/api/createConfig#chainid-1) is not from a chain included in your Wagmi `Config`, `getChainId` will return the last configured chain ID.
:::
