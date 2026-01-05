# `policy.modifyWhitelist`

Modifies the whitelist for a whitelist-type transfer policy. Requires policy admin role.

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

const { receipt } = await Actions.policy.modifyWhitelistSync(config, {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  allowed: true,
  policyId: 1n,
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
