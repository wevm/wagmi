# `amm.getPool`

Gets the reserves for a liquidity pool.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const pool = await Actions.amm.getPool(config, {
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('User token reserve:', pool.reserveUserToken)
// @log: User token reserve: 1000000000000000000000n
console.log('Validator token reserve:', pool.reserveValidatorToken)
// @log: Validator token reserve: 1000000000000000000000n
console.log('Total supply:', pool.totalSupply)
// @log: Total supply: 1000000000000000000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Reserve of user token */
  reserveUserToken: bigint
  /** Reserve of validator token */
  reserveValidatorToken: bigint
  /** Total supply of LP tokens */
  totalSupply: bigint
}
```

## Parameters

### userToken

- **Type:** `Address | bigint`

Address or ID of the user token.

### validatorToken

- **Type:** `Address | bigint`

Address or ID of the validator token.

## Viem

- [`amm.getPool`](https://viem.sh/tempo/actions/amm.getPool)
