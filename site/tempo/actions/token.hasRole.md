# `token.hasRole`

Checks if an address has a specific role for a TIP-20 token. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const hasRole = await Actions.token.hasRole(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000011',
})

console.log('Has issuer role:', hasRole)
// @log: Has issuer role: true
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = boolean // Whether the account has the role
```

## Parameters

### account

- **Type:** `Address`

Address to check for the role.

### role

- **Type:** `"defaultAdmin" | "pause" | "unpause" | "issuer" | "burnBlocked"`

Role to check.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

## Viem

- [`token.hasRole`](https://viem.sh/tempo/actions/token.hasRole)
