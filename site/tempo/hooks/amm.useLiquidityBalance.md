# `amm.useLiquidityBalance`

Gets the liquidity balance for an address in a specific pool.

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

const { data: balance } = Hooks.amm.useLiquidityBalance({
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Liquidity balance:', balance)
// @log: Liquidity balance: 10500000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `amm.getLiquidityBalance` Return Type](/tempo/actions/amm.getLiquidityBalance#return-type)

## Parameters

See [Wagmi Action `amm.getLiquidityBalance` Parameters](/tempo/actions/amm.getLiquidityBalance#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`amm.getLiquidityBalance`](/tempo/actions/amm.getLiquidityBalance)
