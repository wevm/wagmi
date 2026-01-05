# `amm.getLiquidityBalance`

Gets the liquidity balance for an address in a specific pool.

## Usage

::: code-group
```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// ---cut---
// @filename: example.ts
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const balance = await Actions.amm.getLiquidityBalance(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Liquidity balance:', balance)
// @log: Liquidity balance: 10500000000000000000n
```
<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

`bigint`

Liquidity balance.

## Parameters

### address

- **Type:** `Address`

Address to check balance for.

### poolId (optional)

- **Type:** `Hex`

Pool ID.

### userToken (optional)

- **Type:** `Address | bigint`

User token.

### validatorToken (optional)

- **Type:** `Address | bigint`

Validator token.

## Viem

- [`amm.getLiquidityBalance`](https://viem.sh/tempo/actions/amm.getLiquidityBalance)
