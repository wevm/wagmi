# `token.useGetAllowance`

Gets the amount of tokens that a spender is approved to transfer on behalf of an owner.

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

const { data: allowance } = Hooks.token.useGetAllowance({
  owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  spender: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Allowance:', allowance)
// @log: Allowance: 10500000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `token.getAllowance` Return Type](/tempo/actions/token.getAllowance#return-type)

## Parameters

See [Wagmi Action `token.getAllowance` Parameters](/tempo/actions/token.getAllowance#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`token.getAllowance`](/tempo/actions/token.getAllowance)
