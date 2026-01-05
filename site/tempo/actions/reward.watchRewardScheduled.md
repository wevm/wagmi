# `reward.watchRewardScheduled`

Watches for reward scheduled events when new reward streams are started.

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

const unwatch = Actions.reward.watchRewardScheduled(config, {
  onRewardScheduled(args, log) {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})

// Later, stop watching
unwatch()
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

`() => void`

Returns a function to unsubscribe from the event.

## Parameters

### onRewardScheduled

- **Type:** `function`

```ts
declare function onRewardScheduled(args: Args, log: Log): void

type Args = {
  /** Total amount allocated to the stream */
  amount: bigint
  /** Address that funded the stream */
  funder: Address
}
```

Callback to invoke when a reward stream is scheduled.

### token

- **Type:** `Address`

Address of the TIP-20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by funder address */
  funder?: Address | Address[]
  /** Filter by stream ID */
  id?: bigint | bigint[]
}
```

Optional filters to narrow down events by funder address or stream ID.

## Viem

- [`reward.watchRewardScheduled`](https://viem.sh/tempo/actions/reward.watchRewardScheduled)
