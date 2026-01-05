# `reward.watchRewardRecipientSet`

Watches for reward recipient set events when token holders change their reward recipient.

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

const unwatch = Actions.reward.watchRewardRecipientSet(config, {
  onRewardRecipientSet(args, log) {
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

### onRewardRecipientSet

- **Type:** `function`

```ts
declare function onRewardRecipientSet(args: Args, log: Log): void

type Args = {
  /** Token holder address who set their reward recipient */
  holder: Address
  /** New reward recipient address (zero address indicates opt-out) */
  recipient: Address
}
```

Callback to invoke when a reward recipient is set.

### token

- **Type:** `Address`

Address of the TIP-20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter events by holder address */
  holder?: Address
  /** Filter events by recipient address */
  recipient?: Address
}
```

Optional filters for the event.

## Viem

- [`reward.watchRewardRecipientSet`](https://viem.sh/tempo/actions/reward.watchRewardRecipientSet)
