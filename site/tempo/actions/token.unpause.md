# `token.unpause`

Unpauses a TIP-20 token, allowing transfers to resume. Requires the `UNPAUSE` role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"acbdcb03cf8c56a50bc60fe3d4d353742e327ae6fa423ee3dd905872a93fd690","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { isPaused, receipt } = await Actions.token.unpauseSync(config, {
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Is paused:', isPaused)
// @log: Is paused: false
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.unpause` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.unpause(config, {
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.unpause.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Whether the token is paused */
  isPaused: boolean
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that unpaused the token */
  updater: Address
}
```

## Parameters

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.unpause`](https://viem.sh/tempo/actions/token.unpause)
