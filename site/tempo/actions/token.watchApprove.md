# `token.watchApprove`

Watches for token approval events on TIP20 tokens.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"a50530b6c3dfb0005748890f9451c15c1c16886305459d01bf4b5b8957109244","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
