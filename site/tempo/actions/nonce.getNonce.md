# `nonce.getNonce`

Gets the nonce for an account and nonce key. This is useful for managing multiple nonce lanes for parallel transaction submission.

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

const nonce = await Actions.nonce.getNonce(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  nonceKey: 1n,
})

console.log('Nonce:', nonce)
// @log: Nonce: 42n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint
```

The current nonce value for the given account and nonce key.

## Parameters

### account

- **Type:** `Address`

Account address to get the nonce for.

### nonceKey

- **Type:** `bigint`

Nonce key (must be > 0, key 0 is reserved for protocol nonces).

## Viem

- [`nonce.getNonce`](https://viem.sh/tempo/actions/nonce.getNonce)
