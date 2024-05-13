<script setup>
const packageName = '@wagmi/core'
const actionName = 'getToken'
const typeName = 'GetToken'
</script>

# getToken

Action for fetching token info.

## Import

```ts
import { getToken } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getToken } from '@wagmi/core'
import { config } from './config'

const token = getToken(config, {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetTokenParameters } from '@wagmi/core'
```

### address

`Address`

Address to get token for.

::: code-group
```ts [index.ts]
import { getToken } from '@wagmi/core'
import { config } from './config'

const token = getToken(config, {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getToken } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const token = await getToken(config, {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### formatUnits

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { getToken } from '@wagmi/core'
import { config } from './config'

const token = getToken(config, {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  formatUnits: 'ether', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetTokenReturnType } from '@wagmi/core'
```

### address 

`Address`

Address of token.

### decimals 

`number`

Number of decimals for token.

### name 

`string | undefined`

Name of token.

### symbol 

`string | undefined`

Symbol of token.

### totalSupply 

`{ formatted: string; value: bigint; }`

Total supply of token. `formatted` is formatted using [`formatUnits`](#formatunits).

## Error

```ts
import { type GetTokenErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`multicall`](https://viem.sh/docs/contract/multicall)
