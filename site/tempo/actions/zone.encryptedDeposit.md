# `zone.encryptedDeposit`

Deposits tokens into a zone with an encrypted recipient and memo.

Use the `*Sync` variant when you want the receipt before continuing. The non-sync `zone.encryptedDeposit` action returns the transaction hash immediately.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { config } from './config'

const result = await Actions.zone.encryptedDepositSync(config, {
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})

console.log('Transaction hash:', result.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `zone.encryptedDeposit` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.zone.encryptedDeposit(config, {
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})
const receipt = await waitForTransactionReceipt(config, { hash })

console.log(receipt.status)
```

## Return Type

```ts
type ReturnType = {
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

Returns the transaction receipt from `zone.encryptedDepositSync`.

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to deposit.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token to deposit.

### zoneId

- **Type:** `number`

Zone ID to deposit into.

### memo (optional)

- **Type:** `Hex`

Optional memo that will be encrypted together with the recipient.

### recipient (optional)

- **Type:** `Address`

Recipient address in the destination zone. Defaults to the connected account address before encryption.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`zone.encryptedDeposit`](https://viem.sh/tempo/actions/zone.encryptedDeposit)
