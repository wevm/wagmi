# `token.grantRoles`

Grants a role to an address. Requires the admin role for the role being granted. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"5e8451097f9633d21d3a3cdfc8f44501a3bb693043aa17e5311b84bfc53aca06","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt, value } = await Actions.token.grantRolesSync(config, {
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})

console.log('Role granted:', value[0].hasRole)
// @log: Role granted: true
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.grantRoles` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.grantRoles(config, {
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const events = viem_Actions.token.grantRoles.extractEvents(receipt.logs)
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
    /** Address that received the role */
    account: Address
    /** Address that granted the role */
    sender: Address
    /** Whether the role was granted (true) or revoked (false) */
    hasRole: boolean
  }[]
}
```

## Parameters

### roles

- **Type:** `("defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked")[]`

Roles to grant.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

### to

- **Type:** `Address`

Address to grant the role to.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.grantRoles`](https://viem.sh/tempo/actions/token.grantRoles)
