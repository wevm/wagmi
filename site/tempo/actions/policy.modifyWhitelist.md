# `policy.modifyWhitelist`

Modifies the whitelist for a whitelist-type transfer policy. Requires policy admin role.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"952192056f8028f108ce757f5c41d5167a39f17553d4a449338c09baaef8c103","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt } = await Actions.policy.modifyWhitelistSync(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  allowed: true,
  policyId: 1n,
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.modifyWhitelist` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.policy.modifyWhitelist(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  allowed: true,
  policyId: 1n,
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.policy.modifyWhitelist.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Address that was added/removed from whitelist */
  account: Address
  /** Whether the address is allowed */
  allowed: boolean
  /** ID of the policy */
  policyId: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that modified the whitelist */
  updater: Address
}
```

## Parameters

### address

- **Type:** `Address`

Target account address to add or remove from the whitelist.

### allowed

- **Type:** `boolean`

Whether the address should be allowed (`true`) or disallowed (`false`).

### policyId

- **Type:** `bigint`

ID of the whitelist policy to modify.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`policy.modifyWhitelist`](https://viem.sh/tempo/actions/policy.modifyWhitelist)
