# `token.watchTransfer`

Watches for token transfer events on TIP20 tokens.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"5deeee8975448d70c44695a3fbb88e51e915d6eeb68dabfc6d4cce676856c16d","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
