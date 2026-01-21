# `nonce.watchNonceIncremented`

Watches for nonce incremented events. This event is emitted whenever a transaction is executed using a specific nonce key.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"d6c088363c7a29ffdad7dc923554c75831017d0aa12ea1177d8bb4c8f55ce3f0","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.nonce.watchNonceIncremented(config, {
  onNonceIncremented(args, log) {
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

### onNonceIncremented

- **Type:** `function`

```ts
declare function onNonceIncremented(args: Args, log: Log): void

type Args = {
  /** Address of the account */
  account: Address
  /** Nonce key that was incremented */
  nonceKey: bigint
  /** New nonce value after increment */
  newNonce: bigint
}
```

Callback to invoke when a nonce is incremented.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Address of the account to filter by */
  account?: Address | Address[] | null
  /** Nonce key to filter by */
  nonceKey?: bigint | bigint[] | null
}
```

Optional filters for the event.

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

- [`nonce.watchNonceIncremented`](https://viem.sh/tempo/actions/nonce.watchNonceIncremented)
