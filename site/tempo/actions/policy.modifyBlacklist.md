# `policy.modifyBlacklist`

Modifies the blacklist for a blacklist-type transfer policy. Requires policy admin role.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"6c776f607178f89d5334ea2398757c8b3ee4db029caff53ec164954928f7b409","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt } = await Actions.policy.modifyBlacklistSync(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
  restricted: true,
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.modifyBlacklist` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.policy.modifyBlacklist(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
  restricted: true,
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.policy.modifyBlacklist.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Address that was added/removed from blacklist */
  account: Address
  /** ID of the policy */
  policyId: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Whether the address is restricted */
  restricted: boolean
  /** Address that modified the blacklist */
  updater: Address
}
```

## Parameters

### address

- **Type:** `Address`

Target account address to add or remove from the blacklist.

### policyId

- **Type:** `bigint`

ID of the blacklist policy to modify.

### restricted

- **Type:** `boolean`

Whether the address should be restricted (`true`) or unrestricted (`false`).

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`policy.modifyBlacklist`](https://viem.sh/tempo/actions/policy.modifyBlacklist)
