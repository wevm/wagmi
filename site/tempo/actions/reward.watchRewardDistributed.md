# `reward.watchRewardDistributed`

Watches for reward distributed events.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.reward.watchRewardDistributed(config, {
  onRewardDistributed(args, log) {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})

// Later, stop watching
unwatch()
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

`() => void`

Returns a function to unsubscribe from the event.

## Parameters

### onRewardDistributed

- **Type:** `function`

```ts
declare function onRewardDistributed(args: Args, log: Log): void

type Args = {
  /** Total amount distributed */
  amount: bigint
  /** Address that funded the distribution */
  funder: Address
}
```

Callback to invoke when a reward is distributed.

### token

- **Type:** `Address`

Address of the TIP-20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by funder address */
  funder?: Address | Address[]
}
```

Optional filters to narrow down events by funder address.

## Viem

- [`reward.watchRewardDistributed`](https://viem.sh/tempo/actions/reward.watchRewardDistributed)
