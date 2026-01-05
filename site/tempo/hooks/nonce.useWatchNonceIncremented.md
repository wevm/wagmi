# `nonce.useWatchNonceIncremented`

Hook for watching nonce incremented events. This event is emitted whenever a transaction is executed using a specific nonce key.

## Usage

::: code-group
```ts twoslash [example.ts]
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof tempoTestnet]>
  }
}
// ---cut---
import { Hooks } from 'wagmi/tempo'

Hooks.nonce.useWatchNonceIncremented({
  onNonceIncremented: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `nonce.watchNonceIncremented` Parameters](/tempo/actions/nonce.watchNonceIncremented#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`nonce.getNonce`](/tempo/actions/nonce.getNonce)
- [`nonce.watchNonceIncremented`](/tempo/actions/nonce.watchNonceIncremented)

