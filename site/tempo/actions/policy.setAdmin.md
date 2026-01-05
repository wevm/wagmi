# `policy.setAdmin`

Sets the admin for a transfer policy. Requires current policy admin role.

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

const { receipt } = await Actions.policy.setAdminSync(config, {
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.setAdmin` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.policy.setAdmin(config, {
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.policy.setAdmin.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Address of the new admin */
  admin: Address
  /** ID of the policy */
  policyId: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that updated the admin */
  updater: Address
}
```

## Parameters

### admin

- **Type:** `Address`

Address to set as the new policy admin.

### policyId

- **Type:** `bigint`

ID of the policy to update.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`policy.setAdmin`](https://viem.sh/tempo/actions/policy.setAdmin)
