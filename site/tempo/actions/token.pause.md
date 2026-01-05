# `token.pause`

Pauses a TIP-20 token, preventing all transfers. Requires the `PAUSE` role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { isPaused, receipt } = await Actions.token.pauseSync(config, {
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Is paused:', isPaused)
// @log: Is paused: true
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.pause` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.pause(config, {
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.pause.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Whether the token is paused */
  isPaused: boolean
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that paused the token */
  updater: Address
}
```

## Parameters

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.pause`](https://viem.sh/tempo/actions/token.pause)
