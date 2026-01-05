# `policy.useData`

Gets the data for a transfer policy, including its type and admin address.

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

const { data: policyData } = Hooks.policy.useData({
  policyId: 1n,
})

console.log('Policy admin:', policyData?.admin)
// @log: Policy admin: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('Policy type:', policyData?.type)
// @log: Policy type: whitelist
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `policy.getData` Return Type](/tempo/actions/policy.getData#return-type)

## Parameters

See [Wagmi Action `policy.getData` Parameters](/tempo/actions/policy.getData#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`policy.getData`](/tempo/actions/policy.getData)
