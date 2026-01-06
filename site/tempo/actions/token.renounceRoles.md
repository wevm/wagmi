# `token.renounceRoles`

Renounces one or more roles from the caller's address. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"30d2bdf2635250f6359f0da611ced8b75cdd1e915d48aa5fa8de4385cdfaa662","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt, value } = await Actions.token.renounceRolesSync(config, {
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Roles renounced:', value.length)
// @log: Roles renounced: 1
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.renounceRoles` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.renounceRoles(config, {
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const events = viem_Actions.token.renounceRoles.extractEvents(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Array of role membership update events */
  value: readonly {
    /** Address that renounced the role */
    account: Address
    /** Whether the role was granted (true) or revoked (false) */
    hasRole: boolean
    /** Role identifier */
    role: Hex
    /** Address that initiated the change */
    sender: Address
  }[]
}
```

## Parameters

### roles

- **Type:** `("defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked")[]`

Roles to renounce.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.renounceRoles`](https://viem.sh/tempo/actions/token.renounceRoles)
