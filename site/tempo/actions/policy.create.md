# `policy.create`

Creates a new transfer policy for token access control. [Learn more about transfer policies](https://docs.tempo.xyz/protocol/tip403/overview)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"e0c93d427169d0944a1d8b51a79fe35242cf5f9a3229dd7529118fcdd9ec4d11","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
