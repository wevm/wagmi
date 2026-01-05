# `dex.createPair`

Creates a new trading pair on the Stablecoin DEX.  

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

const { key, base, quote, receipt } = await Actions.dex.createPairSync(config, {
  base: '0x20c0000000000000000000000000000000000001',
})

console.log('Pair key:', key)
console.log('Base token:', base)
console.log('Quote token:', quote)
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.createPair` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.dex.createPair(config, {
  base: '0x20c0000000000000000000000000000000000001',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { base, quote } } 
  = viem_Actions.dex.createPair.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Key of the trading pair */
  key: Hex
  /** Address of the base token */
  base: Address
  /** Address of the quote token */
  quote: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### base

- **Type:** `Address`

Address of the base token for the pair. The quote token is determined by the base token's quote token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.createPair`](https://viem.sh/tempo/actions/dex.createPair)
