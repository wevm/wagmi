# `faucet.fund`

Funds an account with an initial amount of tokens on Tempo's testnet.

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

const hashes = await Actions.faucet.fund(config, {
  account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
})

console.log('Transaction hashes:', hashes)
// @log: Transaction hashes: ['0x...', '0x...']
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Synchronous Usage

Use `fundSync` to wait for the transactions to be included on a block before returning:

```ts
import { Actions } from 'wagmi/tempo'

const receipts = await Actions.faucet.fundSync(config, {
  account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
})

console.log('Receipts:', receipts)
// @log: Receipts: [{ blockNumber: 123n, ... }, { blockNumber: 123n, ... }]
```

## Return Type

### fund

```ts
type ReturnType = readonly Hash[]
```

Returns an array of transaction hashes for the funding transactions.

### fundSync

```ts
type ReturnType = readonly TransactionReceipt[]
```

Returns an array of transaction receipts after the transactions are confirmed.

## Parameters

### account

- **Type:** `Account | Address`

Account to fund with testnet tokens.

### timeout (fundSync only)

- **Type:** `number`
- **Default:** `10000`

Timeout in milliseconds to wait for transaction confirmation.

## Viem

- [`faucet.fund`](https://viem.sh/tempo/actions/faucet.fund)
