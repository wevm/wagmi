# `token.getAllowance`

Gets the amount of tokens that a spender is approved to transfer on behalf of an owner.

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

const allowance = await Actions.token.getAllowance(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  spender: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Allowance:', allowance)
// @log: Allowance: 10500000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint // Allowance amount
```

## Parameters

### account

- **Type:** `Address`

Account address.

### spender

- **Type:** `Address`

Address of the spender.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

## Viem

- [`token.getAllowance`](https://viem.sh/tempo/actions/token.getAllowance)
