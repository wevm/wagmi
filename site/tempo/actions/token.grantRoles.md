# `token.grantRoles`

Grants a role to an address. Requires the admin role for the role being granted. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// ---cut---
// @filename: example.ts
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

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
