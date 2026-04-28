# `zone.requestVerifiableWithdrawal`

Requests a verifiable withdrawal from a zone to the parent Tempo chain.

This variant includes a `revealTo` public key so the sequencer can encrypt the withdrawal details for the recipient.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group

```ts [example.ts]
import { createConfig } from 'wagmi'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const config = createConfig({
  chains: [zoneChain],
  transports: {
    [zoneChain.id]: zoneHttp(),
  },
})

import { Actions } from 'wagmi/tempo'

const result = await Actions.zone.requestVerifiableWithdrawalSync(config, {
  amount: 1_000_000n,
  chainId: zoneChain.id,
  revealTo:
    '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('Transaction hash:', result.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `zone.requestVerifiableWithdrawal` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.zone.requestVerifiableWithdrawal(config, {
  amount: 1_000_000n,
  chainId: zoneChain.id,
  revealTo:
    '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
  token: '0x20c0000000000000000000000000000000000001',
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

Returns the transaction receipt from `zone.requestVerifiableWithdrawalSync`.

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to withdraw.

### revealTo

- **Type:** `Hex`

33-byte compressed secp256k1 public key used for the encrypted reveal payload.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token to withdraw.

### to (optional)

- **Type:** `Address`

Recipient address on the parent Tempo chain. Defaults to the connected account address.

### data (optional)

- **Type:** `Hex`

Optional callback data for the parent-chain recipient.

### fallbackRecipient (optional)

- **Type:** `Address`

Fallback recipient if the callback fails. Defaults to `to`.

### gas (optional)

- **Type:** `bigint`

Gas limit reserved for the withdrawal callback on the parent chain.

### memo (optional)

- **Type:** `Hex`

Optional withdrawal memo.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`zone.requestVerifiableWithdrawal`](https://viem.sh/tempo/actions/zone.requestVerifiableWithdrawal)
