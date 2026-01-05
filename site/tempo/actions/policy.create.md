# `policy.create`

Creates a new transfer policy for token access control. [Learn more about transfer policies](https://docs.tempo.xyz/protocol/tip403/overview)

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

const { policyId, policyType, receipt } = await Actions.policy.createSync(config, {
  addresses: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ],
  type: 'whitelist',
})

console.log('Policy ID:', policyId)
// @log: Policy ID: 1n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.create` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.policy.create(config, {
  addresses: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ],
  type: 'whitelist',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { policyId } } 
  = viem_Actions.policy.create.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the created policy */
  policyId: bigint
  /** Type of the policy (0 = whitelist, 1 = blacklist) */
  policyType: number
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that created the policy */
  updater: Address
}
```

## Parameters

### type

- **Type:** `'whitelist' | 'blacklist'`

Type of policy to create. A `whitelist` policy only allows listed addresses, while a `blacklist` policy allows all except listed addresses.

### addresses (optional)

- **Type:** `Address[]`

Optional array of addresses to initialize the policy with.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`policy.create`](https://viem.sh/tempo/actions/policy.create)
