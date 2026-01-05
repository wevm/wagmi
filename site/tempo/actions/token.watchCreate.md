# `token.watchCreate`

Watches for new TIP20 token creation events on the TIP20 Factory.

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

const unwatch = Actions.token.watchCreate(config, {
  onTokenCreated(args, log) {
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
