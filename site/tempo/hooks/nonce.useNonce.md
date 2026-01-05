# `nonce.useNonce`

Hook for getting the nonce for an account and nonce key. This is useful for managing multiple nonce lanes for parallel transaction submission.

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

const { data: nonce } = Hooks.nonce.useNonce({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  nonceKey: 1n,
})

console.log('Nonce:', nonce)
// @log: Nonce: 42n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `nonce.getNonce` Return Type](/tempo/actions/nonce.getNonce#return-type)

## Parameters

See [Wagmi Action `nonce.getNonce` Parameters](/tempo/actions/nonce.getNonce#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`nonce.getNonce`](/tempo/actions/nonce.getNonce)

