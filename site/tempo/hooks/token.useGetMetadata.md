# `token.useGetMetadata`

Gets the metadata for a TIP-20 token, including name, symbol, decimals, currency, and total supply.

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

const { data: metadata } = Hooks.token.useGetMetadata({
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Currency:', metadata?.currency)
// @log: Currency: USD
console.log('Name:', metadata?.name)
// @log: Name: United States Dollar
console.log('Symbol:', metadata?.symbol)
// @log: Symbol: USD
console.log('Decimals:', metadata?.decimals)
// @log: Decimals: 18
console.log('Total Supply:', metadata?.totalSupply)
// @log: Total Supply: 1000000000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `token.getMetadata` Return Type](/tempo/actions/token.getMetadata#return-type)

## Parameters

See [Wagmi Action `token.getMetadata` Parameters](/tempo/actions/token.getMetadata#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`token.getMetadata`](/tempo/actions/token.getMetadata)
