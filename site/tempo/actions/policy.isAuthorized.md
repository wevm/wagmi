# `policy.isAuthorized`

Checks if an address is authorized by a transfer policy.

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

const isAuthorized = await Actions.policy.isAuthorized(config, {
  user: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})

console.log('Is authorized:', isAuthorized)
// @log: Is authorized: true
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = boolean
```

## Parameters

### policyId

- **Type:** `bigint`

Policy ID.

### user

- **Type:** `Address`

User address to check.

## Viem

- [`policy.isAuthorized`](https://viem.sh/tempo/actions/policy.isAuthorized)
