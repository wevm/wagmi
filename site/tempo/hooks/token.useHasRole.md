# `token.useHasRole`

Checks if an address has a specific role for a TIP-20 token. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { data: hasRole } = Hooks.token.useHasRole({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000011',
})

console.log('Has issuer role:', hasRole)
// @log: Has issuer role: true
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `token.hasRole` Return Type](/tempo/actions/token.hasRole#return-type)

## Parameters

See [Wagmi Action `token.hasRole` Parameters](/tempo/actions/token.hasRole#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`token.hasRole`](/tempo/actions/token.hasRole)
