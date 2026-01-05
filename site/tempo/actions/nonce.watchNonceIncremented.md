# `nonce.watchNonceIncremented`

Watches for nonce incremented events. This event is emitted whenever a transaction is executed using a specific nonce key.

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

const unwatch = Actions.nonce.watchNonceIncremented(config, {
  onNonceIncremented(args, log) {
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
