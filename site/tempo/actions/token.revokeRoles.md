# `token.revokeRoles`

Revokes one or more roles from an address. Requires the admin role for each role being revoked. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { receipt, value } = await Actions.token.revokeRolesSync(config, {
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  roles: ['issuer'],
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Roles revoked:', value.length)
// @log: Roles revoked: 1
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
