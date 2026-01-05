# `policy.modifyBlacklist`

Modifies the blacklist for a blacklist-type transfer policy. Requires policy admin role.

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

const { receipt } = await Actions.policy.modifyBlacklistSync(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
  restricted: true,
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
