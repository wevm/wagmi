# `token.getMetadata`

Gets the metadata for a TIP-20 token, including name, symbol, decimals, currency, and total supply.

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

const metadata = await Actions.token.getMetadata(config, {
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Currency:', metadata.currency)
// @log: Currency: USD
console.log('Decimals:', metadata.decimals)
// @log: Decimals: 18
console.log('Name:', metadata.name)
// @log: Name: United States Dollar
console.log('Symbol:', metadata.symbol)
// @log: Symbol: USD
console.log('Total Supply:', metadata.totalSupply)
// @log: Total Supply: 1000000000000000000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  currency: string
  decimals: number
  name: string
  paused?: boolean
  quoteToken?: Address
  supplyCap?: bigint
  symbol: string
  totalSupply: bigint
  transferPolicyId?: bigint
}
```

## Parameters

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

## Viem

- [`token.getMetadata`](https://viem.sh/tempo/actions/token.getMetadata)
