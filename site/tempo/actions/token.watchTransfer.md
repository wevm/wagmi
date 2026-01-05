# `token.watchTransfer`

Watches for token transfer events on TIP20 tokens.  

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

const unwatch = Actions.token.watchTransfer(config, {
  token: 1n,
  onTransfer(args, log) {
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

### onTransfer

- **Type:** `function`

```ts
declare function onTransfer(args: Args, log: Log): void

type Args = {
  /** Amount transferred */
  amount: bigint
  /** Address sending the tokens */
  from: Address
  /** Address receiving the tokens */
  to: Address
}
```

Callback to invoke when tokens are transferred.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by sender address(es) */
  from?: Address | Address[] | null
  /** Filter by recipient address(es) */
  to?: Address | Address[] | null
}
```

Optional filter to watch only transfers from or to specific addresses.

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

- [`token.watchTransfer`](https://viem.sh/tempo/actions/token.watchTransfer)
