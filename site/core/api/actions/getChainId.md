# getChainId

Action for getting current chain ID.

This method returns chain IDs only for chains configured in your Wagmi 
Config (via [createConfig#chains](/core/api/createConfig#chains)). If the connector 
uses an unsupported chain, `getChainId` will return the last configured 
chain ID. To retrieve the currently connected chain, including those not 
specified in the Wagmi Config, use [getAccount#chainId](/core/api/actions/getAccount#chainid) instead.

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
