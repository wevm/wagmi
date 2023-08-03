# getConnectorClient

Action for getting a Viem `Client` object for the current connector.

## Import

```ts
import { getConnectorClient } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getConnectorClient } from '@wagmi/core'
import { config } from './config'

const client = getConnectorClient(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetConnectorClientParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use with client.

::: code-group
```ts [index.ts]
import { getConnectorClient } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const client = getConnectorClient(config, {
  chainId: mainnet.id,
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetChainIdReturnType } from '@wagmi/core'
```

[`Client`](https://viem.sh/docs/clients/custom.html)

Viem `Client` object for the current connector.