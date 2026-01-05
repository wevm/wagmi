# `token.setRoleAdmin`

Sets the admin role for another role. Requires the current admin role for the target role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { receipt } = await Actions.token.setRoleAdminSync(config, {
  adminRole: 'defaultAdmin',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.setRoleAdmin` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.setRoleAdmin(config, {
  adminRole: 'defaultAdmin',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.setRoleAdmin.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** New admin role identifier */
  newAdminRole: Hex
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Role identifier that had its admin updated */
  role: Hex
  /** Address that updated the role admin */
  sender: Address
}
```

## Parameters

### adminRole

- **Type:** `"defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked"`

New admin role.

### role

- **Type:** `"defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked"`

Role to set admin for.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.setRoleAdmin`](https://viem.sh/tempo/actions/token.setRoleAdmin)
