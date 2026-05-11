# `wallet.send`

Opens the wallet send flow with optional pre-filled send fields.

The connected wallet handles signing and submission. `wallet.send` returns the receipt of the submitted send.

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt } = await Actions.wallet.send(config, {
  to: '0x20c0000000000000000000000000000000000001',
  token: '0x20c0000000000000000000000000000000000002',
  value: '1.5',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Chain ID the send was submitted to. */
  chainId: number
  /** Receipt of the submitted send. */
  receipt: TransactionReceipt
}
```

## Parameters

All parameters are optional. Omitted fields are left for the user to fill in inside the wallet UI.

### feePayer (optional)

- **Type:** `boolean | string`

Fee payer override. `false` to disable the wallet's default fee payer, or a URL string to use a custom fee payer service.

### to (optional)

- **Type:** `Address`

Recipient address to pre-fill.

### token (optional)

- **Type:** `Address`

Token contract address to pre-fill. Omit to let the user choose.

### value (optional)

- **Type:** `string`

Human-readable amount to pre-fill (for example, `"1.5"`).

### account (optional)

- **Type:** `Account | Address | null`

Account to use for the connector client. Use `null` to let the wallet infer the account. Defaults to the connected Wagmi account.

### chainId (optional)

- **Type:** `config['chains'][number]['id']`

Chain ID to use. Defaults to the current chain.

### connector (optional)

- **Type:** `Connector`

Connector to use. Defaults to the active connector.

## Viem

- [`wallet.send`](https://viem.sh/tempo/actions/wallet.send)
