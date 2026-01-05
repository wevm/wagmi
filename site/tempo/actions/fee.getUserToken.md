# `fee.getUserToken`

Gets the user's default fee token preference. [Learn more about fees](https://docs.tempo.xyz/protocol/fees)

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

const result = await Actions.fee.getUserToken(config, {
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})

console.log('Fee token:', result)
// @log: Fee token: { address: '0x20c0000000000000000000000000000000000000', id: 0n }
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Address of the fee token */
  address: Address
  /** ID of the fee token */
  id: bigint
} | null
```

Returns `null` if the user has not set a default fee token.

## Parameters

### account

- **Type:** `Address`

Account address.

## Viem

- [`fee.getUserToken`](https://viem.sh/tempo/actions/fee.getUserToken)
