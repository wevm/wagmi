# `token.revokeRoles`

Revokes one or more roles from an address. Requires the admin role for each role being revoked. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"4331bbb216753b0e0d034449438e7597cb718b5c0bcc79635d29f21308e5a7b9","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt, value } = await Actions.token.revokeRolesSync(config, {
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Roles revoked:', value.length)
// @log: Roles revoked: 1
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.revokeRoles` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.revokeRoles(config, {
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const events = viem_Actions.token.revokeRoles.extractEvents(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Array of role membership update events */
  value: readonly {
    /** Role identifier */
    role: Hex
    /** Address that had role revoked */
    account: Address
    /** Address that revoked the role */
    sender: Address
    /** Whether the role was granted (true) or revoked (false) */
    hasRole: boolean
  }[]
}
```

## Parameters

### from

- **Type:** `Address`

Address to revoke the role from.

### roles

- **Type:** `("defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked")[]`

Roles to revoke.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.revokeRoles`](https://viem.sh/tempo/actions/token.revokeRoles)
