# `nonce.getNonceKeyCount`

Gets the number of active nonce keys for an account. Active nonce keys are keys that have been used at least once.

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

const count = await Actions.nonce.getNonceKeyCount(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})

console.log('Active nonce keys:', count)
// @log: Active nonce keys: 3n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint
```

The number of active nonce keys for the account.

## Parameters

### account

- **Type:** `Address`

Account address to get the active nonce key count for.

## Viem

- [`nonce.getNonceKeyCount`](https://viem.sh/tempo/actions/nonce.getNonceKeyCount)
