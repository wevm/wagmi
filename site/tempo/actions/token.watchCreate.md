# `token.watchCreate`

Watches for new TIP20 token creation events on the TIP20 Factory.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"0fc1ecb422e1310805039e9f9c6a825260c57e6ebb91bb88edd178eeb92819a4","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.token.watchCreate(config, {
  onTokenCreated(args, log) {
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

### onTokenCreated

- **Type:** `function`

```ts
declare function onTokenCreated(args: Args, log: Log): void

type Args = {
  /** Address of the created token */
  token: Address
  /** ID of the created token */
  tokenId: bigint
  /** Name of the token */
  name: string
  /** Symbol of the token */
  symbol: string
  /** Currency of the token */
  currency: string
  /** Quote token address */
  quoteToken: Address
  /** Admin address */
  admin: Address
}
```

Callback to invoke when a new TIP20 token is created.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by token address(es) */
  token?: Address | Address[] | null
  /** Filter by token ID(s) */
  tokenId?: bigint | bigint[] | null
}
```

Optional filter arguments to watch for specific tokens.

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

- [`token.watchCreate`](https://viem.sh/tempo/actions/token.watchCreate)
