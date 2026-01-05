# `fee.setUserToken`

Sets the user's default fee token preference. [Learn more about fees](https://docs.tempo.xyz/protocol/fees)

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

const { receipt } = await Actions.fee.setUserTokenSync(config, {
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `fee.setUserToken` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.fee.setUserToken(config, {
  token: '0x20c0000000000000000000000000000000000001',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.fee.setUserToken.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Address of the user */
  user: Address
  /** Address of the token set */
  token: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token to use for fees.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`fee.setUserToken`](https://viem.sh/tempo/actions/fee.setUserToken)
