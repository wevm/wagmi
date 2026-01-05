# `fee.useUserToken`

Gets the user's default fee token preference. [Learn more about fees](https://docs.tempo.xyz/protocol/fees)

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

const { data: userToken } = Hooks.fee.useUserToken({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
})

console.log('Fee token address:', userToken?.address)
// @log: Fee token address: 0x20c0000000000000000000000000000000000000
console.log('Fee token ID:', userToken?.id)
// @log: Fee token ID: 0n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `fee.getUserToken` Return Type](/tempo/actions/fee.getUserToken#return-type)

## Parameters

See [Wagmi Action `fee.getUserToken` Parameters](/tempo/actions/fee.getUserToken#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`fee.getUserToken`](/tempo/actions/fee.getUserToken)

