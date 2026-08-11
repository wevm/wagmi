# `wallet.deposit`

Opens the wallet deposit flow with optional pre-filled deposit fields.

The connected wallet handles signing and submission. `wallet.deposit` returns receipts for any onchain deposit operations performed during the flow.

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const result = await Actions.wallet.deposit(config, {
  address: '0x20c0000000000000000000000000000000000001',
  chainId: 1,
  displayName: 'My Account',
  token: '0x20c0000000000000000000000000000000000002',
  value: '1.5',
})

console.log('Receipts:', result?.receipts)
// @log: Receipts: [...]
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

```ts
type ReturnType =
  | {
      /** Receipts of any onchain operations performed during the deposit. */
      receipts?: readonly TransactionReceipt[] | undefined
    }
  | undefined
```

## Parameters

All parameters are optional. Omitted fields are left for the user to fill in inside the wallet UI.

### address (optional)

- **Type:** `Address`

Deposit address to pre-fill.

### chainId (optional)

- **Type:** `number`

Source chain ID to pre-fill.

### displayName (optional)

- **Type:** `string`

Human-readable account display name.

### token (optional)

- **Type:** `Address`

Token contract address to pre-fill. Omit to let the user choose.

### value (optional)

- **Type:** `string`

Human-readable amount to pre-fill (for example, `"1.5"`).

### account (optional)

- **Type:** `Account | Address | null`

Account to use for the connector client. Use `null` to let the wallet infer the account. Defaults to the connected Wagmi account.

### connector (optional)

- **Type:** `Connector`

Connector to use. Defaults to the active connector.

## Viem

- [`wallet.deposit`](https://viem.sh/tempo/actions/wallet.deposit)
