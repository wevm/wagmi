# `amm.usePool`

Gets the reserves for a liquidity pool.

## Usage

::: code-group
```ts twoslash [example.ts]
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof tempoTestnet]>
  }
}
// ---cut---
import { Hooks } from 'wagmi/tempo'

const { data: pool } = Hooks.amm.usePool({
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('User token reserve:', pool?.reserveUserToken)
// @log: User token reserve: 1000000000000000000000n
console.log('Validator token reserve:', pool?.reserveValidatorToken)
// @log: Validator token reserve: 1000000000000000000000n
console.log('Total supply:', pool?.totalSupply)
// @log: Total supply: 1000000000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `amm.getPool` Return Type](/tempo/actions/amm.getPool#return-type)

## Parameters

See [Wagmi Action `amm.getPool` Parameters](/tempo/actions/amm.getPool#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`amm.getPool`](/tempo/actions/amm.getPool)

