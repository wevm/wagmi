<script setup>
const packageName = '@wagmi/core'
const actionName = 'watchAsset'
const typeName = 'WatchAsset'
</script>

# watchAsset

Action for requesting user tracks the token in their wallet. Returns a boolean indicating if the token was successfully added.

## Import

```ts
import { watchAsset } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchAsset } from '@wagmi/core'
import { config } from './config'

await watchAsset(config, {
  type: 'ERC20',
  options: {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'WAGMI',
    decimals: 18,
  },
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchAssetParameters } from '@wagmi/core'
```

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to sign message with.

::: code-group
```ts [index.ts]
import { getConnection, watchAsset } from '@wagmi/core'
import { config } from './config'

const { connector } = getConnection(config)
const result = await watchAsset(config, {
  connector, // [!code focus]
  options: {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'WAGMI',
    decimals: 18,
  },
  type: 'ERC20',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### options

`{ address: string; symbol: string; decimals: number; image?: string | undefined; }`

Asset options.

::: code-group
```ts [index.ts]
import { watchAsset } from '@wagmi/core'
import { config } from './config'

const result = await watchAsset(config, {
  options: { // [!code focus]
    address: '0x0000000000000000000000000000000000000000', // [!code focus]
    symbol: 'WAGMI', // [!code focus]
    decimals: 18, // [!code focus]
  }, // [!code focus]
  type: 'ERC20',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### type

`'ERC20'`

Type of asset.

::: code-group
```ts [index.ts]
import { watchAsset } from '@wagmi/core'
import { config } from './config'

const result = await watchAsset(config, {
  options: {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'WAGMI',
    decimals: 18,
  },
  type: 'ERC20', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchAssetReturnType } from '@wagmi/core'
```

`boolean`

Returns a boolean indicating if the token was successfully added.

## Error

```ts
import { type WatchAssetErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`watchAsset`](https://viem.sh/docs/actions/wallet/watchAsset)

