# `wallet.swap`

Opens the wallet swap flow with optional pre-filled swap fields.

The connected wallet handles signing and submission. `wallet.swap` returns the receipt of the submitted swap.

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt } = await Actions.wallet.swap(config, {
  amount: '1.5',
  pairToken: '0x20c0000000000000000000000000000000000001',
  slippage: 0.05,
  token: '0x20c0000000000000000000000000000000000002',
  type: 'sell',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Receipt of the submitted swap. */
  receipt: TransactionReceipt
}
```

## Parameters

All parameters are optional. Omitted fields are left for the user to fill in inside the wallet UI.

### amount (optional)

- **Type:** `string`

Human-readable amount to pre-fill (for example, `"1.5"`).

### pairToken (optional)

- **Type:** `Address`

Other side of the swap pair. For buys, this is the token to sell. For sells, this is the token to buy.

### slippage (optional)

- **Type:** `number`

Maximum allowed slippage as a decimal fraction, for example `0.05` (= 5%).

### token (optional)

- **Type:** `Address`

Token to buy or sell. Omit to let the user choose.

### type (optional)

- **Type:** `'buy' | 'sell'`

Whether the amount represents an exact buy or an exact sell amount.

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

- [`wallet.swap`](https://viem.sh/tempo/actions/wallet.swap)
