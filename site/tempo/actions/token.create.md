# `token.create`

Creates a new TIP-20 token, and assigns the admin role to the calling account. [Learn more](https://docs.tempo.xyz/protocol/tip20/overview)

## Usage

Use the `token.create` action on the Wagmi `config` to create and deploy a new TIP-20 token.

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

const { admin, receipt, token, tokenId } = await Actions.token.createSync(config, {
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  currency: 'USD',
  name: 'My Company USD',
  symbol: 'CUSD',
})

console.log('Address:', token)
// @log: Address: 0x20c0000000000000000000000000000000000004
console.log('Admin:', admin)
// @log: Admin: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('ID:', tokenId)
// @log: ID: 4n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.create` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.create(config, {
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  currency: 'USD',
  name: 'My Company USD',
  symbol: 'CUSD',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { token, tokenId } } 
  = viem_Actions.token.create.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Address of the admin that was granted the admin role */
  admin: Address
  /** Currency code of the token */
  currency: string
  /** Name of the token */
  name: string
  /** Address of the quote token */
  quoteToken: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Symbol of the token */
  symbol: string
  /** Address of the deployed TIP-20 token */
  token: Address
  /** ID of the deployed TIP-20 token */
  tokenId: bigint
}
```

## Parameters

### admin

- **Type:** `Address`

Admin address for the token.

### currency

- **Type:** `string`

Currency code for the token.

### name

- **Type:** `string`

Name of the token.

### quoteToken (optional)

- **Type:** `Address | bigint`

Quote token address or ID.

### symbol

- **Type:** `string`

Symbol of the token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.create`](https://viem.sh/tempo/actions/token.create)
