# `nonce.useNonceKeyCount`

Hook for getting the number of active nonce keys for an account. Active nonce keys are keys that have been used at least once.

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

const { data: count } = Hooks.nonce.useNonceKeyCount({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})

console.log('Active nonce keys:', count)
// @log: Active nonce keys: 3n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `nonce.getNonceKeyCount` Return Type](/tempo/actions/nonce.getNonceKeyCount#return-type)

## Parameters

See [Wagmi Action `nonce.getNonceKeyCount` Parameters](/tempo/actions/nonce.getNonceKeyCount#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`nonce.getNonceKeyCount`](/tempo/actions/nonce.getNonceKeyCount)

