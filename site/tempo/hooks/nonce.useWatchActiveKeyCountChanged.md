# `nonce.useWatchActiveKeyCountChanged`

Hook for watching active key count changed events. This event is emitted when an account starts using a new nonce key for the first time.

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

Hooks.nonce.useWatchActiveKeyCountChanged({
  onActiveKeyCountChanged: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `nonce.watchActiveKeyCountChanged` Parameters](/tempo/actions/nonce.watchActiveKeyCountChanged#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`nonce.getNonceKeyCount`](/tempo/actions/nonce.getNonceKeyCount)
- [`nonce.watchActiveKeyCountChanged`](/tempo/actions/nonce.watchActiveKeyCountChanged)

