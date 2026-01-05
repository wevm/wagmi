# `token.watchApprove`

Watches for token approval events on TIP20 tokens.

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

const unwatch = Actions.token.watchApprove(config, {
  token: 0n,
  onApproval(args, log) {
    console.log('args:', args)
  },
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

### onApproval

- **Type:** `function`

```ts
declare function onApproval(args: Args, log: Log): void

type Args = {
  /** Amount approved */
  amount: bigint
  /** Address of the token owner */
  owner: Address
  /** Address of the spender */
  spender: Address
}
```

Callback to invoke when tokens are approved.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by token owner address */
  owner?: Address | Address[] | null
  /** Filter by spender address */
  spender?: Address | Address[] | null
}
```

Filter events by owner and/or spender addresses.

### fromBlock (optional)

- **Type:** `bigint`

Block to start listening from.

### onError (optional)

- **Type:** `function`

```ts
declare function onError(error: Error): void
```

The callback to call when an error occurred when trying to get for a new block.

### poll (optional)

- **Type:** `true`

Enable polling mode.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`token.watchApprove`](https://viem.sh/tempo/actions/token.watchApprove)
