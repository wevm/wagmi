# `token.setRoleAdmin`

Sets the admin role for another role. Requires the current admin role for the target role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"d9c54665ca890ceb4e883643fe63cb29f5ad11e7649208e7a46fe48ce88991c9","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
