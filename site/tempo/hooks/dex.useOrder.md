# `dex.useOrder`

Gets an order's details from the Stablecoin DEX orderbook.

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

const { data: order } = Hooks.dex.useOrder({
  orderId: 123n,
})

console.log('Order details:', order)
// @log: Order details: { amount: 100000000n, maker: '0x...', isBid: true, ... }
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `dex.getOrder` Return Type](/tempo/actions/dex.getOrder#return-type)

## Parameters

See [Wagmi Action `dex.getOrder` Parameters](/tempo/actions/dex.getOrder#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`dex.getOrder`](/tempo/actions/dex.getOrder)
