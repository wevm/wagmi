# `token.getBalance`

Gets the token balance of an address.

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

const balance = await Actions.token.getBalance(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Balance:', balance)
// @log: Balance: 10500000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint // Balance amount
```

## Parameters

### account

- **Type:** `Address`

Account address.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

## Viem

- [`token.getBalance`](https://viem.sh/tempo/actions/token.getBalance)
