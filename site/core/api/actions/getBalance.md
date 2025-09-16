<script setup>
const packageName = '@wagmi/core'
const actionName = 'getBalance'
const typeName = 'GetBalance'
</script>

# getBalance

Action for fetching native currency or token balance.

## Import

```ts
import { getBalance } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type GetBalanceParameters } from '@wagmi/core'
```

### address

`Address`

Address to get balance for.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get balance at.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockNumber: 17829139n, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get balance at.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  blockTag: 'latest', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const balance = await getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  chainId: mainnet.id, // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### token

`Address | undefined`

ERC-20 token address to get balance for.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  token: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### unit

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { getBalance } from '@wagmi/core'
import { config } from './config'

const balance = getBalance(config, {
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  unit: 'ether', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type GetBalanceReturnType } from '@wagmi/core'
```

### decimals

`number`

Number of decimals for balance [`value`](#value).

### formatted

`string`

Formatted value of balance using [`unit`](#unit).

### symbol

`string`

Symbol of native currency or token.

### value

`bigint`

Raw value of balance.

## Error

```ts
import { type GetBalanceErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`getBalance`](https://viem.sh/docs/actions/public/getBalance) for native currency balances
- [`multicall`](https://viem.sh/docs/actions/public/multicall) for token balances
