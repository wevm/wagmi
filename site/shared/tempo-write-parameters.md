### account (optional)

- **Type:** `Account | Address`

Account that will be used to send the transaction. Defaults to connected Wagmi account.

### feeToken (optional)

- **Type:** `Address | bigint`

Fee token for the transaction. 

Can be a TIP-20 token address or ID.

### feePayer (optional)

- **Type:** `Account | true`

Fee payer for the transaction. 

Can be a [Viem Account](https://viem.sh/docs/accounts/local/privateKeyToAccount), or `true` if a [Fee Payer Service](https://docs.tempo.xyz/sdk/typescript/server/handler.feePayer) will be used.

### gas (optional)

- **Type:** `bigint`

Gas limit for the transaction.

### maxFeePerGas (optional)

- **Type:** `bigint`

Max fee per gas for the transaction.

### maxPriorityFeePerGas (optional)

- **Type:** `bigint`

Max priority fee per gas for the transaction.

### nonce (optional)

- **Type:** `number`

Nonce for the transaction.

### nonceKey (optional)

- **Type:** `'expiring' | bigint`

Nonce key for the transaction. 

### validBefore (optional)

- **Type:** `number`

Unix timestamp before which the transaction must be included.

### validAfter (optional)

- **Type:** `number`

Unix timestamp after which the transaction can be included.

### throwOnReceiptRevert (optional)

- **Type:** `boolean`
- **Default:** `true`

Whether to throw an error if the transaction receipt indicates a revert. Only applicable to `*Sync` actions.
