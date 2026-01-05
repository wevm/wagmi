# `dex.getBalance`

Gets a user's token balance on the Stablecoin DEX.  

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

const balance = await Actions.dex.getBalance(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('DEX balance:', balance)
// @log: DEX balance: 1000000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint
```

## Parameters

### account

- **Type:** `Address`

Address of the account.

### token

- **Type:** `Address`

Address of the token.

## Viem

- [`dex.getBalance`](https://viem.sh/tempo/actions/dex.getBalance)
