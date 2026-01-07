# `token.watchBurn`

Watches for token burn events on TIP20 tokens.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"964634b1472c31080644e57c6495fef8eddfe7936d04a402712785277c2e7797","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.token.watchBurn(config, {
  token: 1n, // or token address
  onBurn(args, log) {
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

### onBurn

- **Type:** `function`

```ts
declare function onBurn(args: Args, log: Log): void

type Args = {
  /** Address whose tokens were burned */
  from: Address
  /** Amount burned */
  amount: bigint
}
```

Callback to invoke when tokens are burned.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by burner address */
  from?: Address | Address[] | null
}
```

Optional filter arguments.

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

- [`token.watchBurn`](https://viem.sh/tempo/actions/token.watchBurn)
