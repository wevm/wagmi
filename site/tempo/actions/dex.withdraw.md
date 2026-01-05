# `dex.withdraw`

Withdraws tokens from the Stablecoin DEX to your wallet.  

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
import { parseUnits } from 'viem'
import { config } from './config'

const { receipt } = await Actions.dex.withdrawSync(config, {
  amount: parseUnits('100', 6),
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('Transaction hash:', receipt.transactionHash)
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.withdraw` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.dex.withdraw(config, {
  amount: parseUnits('100', 6),
  token: '0x20c0000000000000000000000000000000000001',
})
const receipt = await waitForTransactionReceipt(config, { hash })
```

## Return Type

```ts
type ReturnType = {
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to withdraw.

### token

- **Type:** `Address`

Address of the token to withdraw.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.withdraw`](https://viem.sh/tempo/actions/dex.withdraw)
