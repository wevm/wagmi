# getClient

Action for getting Viem [`Client`](https://viem.sh/docs/clients/custom.html) instance.

## Import

```ts
import { getClient } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getClient } from '@wagmi/core'
import { config } from './config'

const client = getClient(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetClientParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when getting Viem Client.

::: code-group
```ts [index.ts]
import { getClient } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const client = await getClient(config, {
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetClientReturnType } from '@wagmi/core'
```

`Client`

Viem [`Client`](https://viem.sh/docs/clients/custom.html) instance.
