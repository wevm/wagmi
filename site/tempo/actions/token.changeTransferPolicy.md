# `token.changeTransferPolicy`

Changes the transfer policy for a TIP-20 token. Requires the default admin role. [Learn more about transfer policies](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { receipt } = await Actions.token.changeTransferPolicySync(config, {
  policyId: 1n,
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.changeTransferPolicy` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.changeTransferPolicy(config, {
  policyId: 1n,
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.changeTransferPolicy.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the new transfer policy */
  newPolicyId: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that updated the policy */
  updater: Address
}
```

## Parameters

### policyId

- **Type:** `bigint`

New transfer policy ID.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.changeTransferPolicy`](https://viem.sh/tempo/actions/token.changeTransferPolicy)
