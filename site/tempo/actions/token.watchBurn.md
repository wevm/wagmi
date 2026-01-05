# `token.watchBurn`

Watches for token burn events on TIP20 tokens.

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

const unwatch = Actions.token.watchBurn(config, {
  token: 1n, // or token address
  onBurn(args, log) {
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
