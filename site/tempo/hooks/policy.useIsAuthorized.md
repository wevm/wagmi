# `policy.useIsAuthorized`

Checks if an address is authorized by a transfer policy.

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

const { data: isAuthorized } = Hooks.policy.useIsAuthorized({
  user: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})

console.log('Is authorized:', isAuthorized)
// @log: Is authorized: true
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `policy.isAuthorized` Return Type](/tempo/actions/policy.isAuthorized#return-type)

## Parameters

See [Wagmi Action `policy.isAuthorized` Parameters](/tempo/actions/policy.isAuthorized#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`policy.isAuthorized`](/tempo/actions/policy.isAuthorized)
