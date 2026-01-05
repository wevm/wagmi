# `token.setSupplyCap`

Sets the supply cap for a TIP-20 token. Requires the default admin role.

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
import { parseUnits } from 'viem'
import { config } from './config'

const { newSupplyCap, receipt } = await Actions.token.setSupplyCapSync(config, {
  supplyCap: parseUnits('1000000', 6),
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('New supply cap:', newSupplyCap)
// @log: New supply cap: 1000000000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.setSupplyCap` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.setSupplyCap(config, {
  supplyCap: parseUnits('1000000', 6),
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.setSupplyCap.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** New supply cap value */
  newSupplyCap: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that updated the supply cap */
  updater: Address
}
```

## Parameters

### supplyCap

- **Type:** `bigint`

Maximum total supply allowed for the token.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.setSupplyCap`](https://viem.sh/tempo/actions/token.setSupplyCap)
