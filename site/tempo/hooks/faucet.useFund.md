# `faucet.useFund`

Hook for funding an account with testnet tokens on Tempo's testnet.

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

const { data: hashes, mutate } = Hooks.faucet.useFund()

// Call `mutate` in response to user action (e.g. button click)
mutate({
  account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
})

console.log('Transaction hashes:', hashes)
// @log: Transaction hashes: ['0x...', '0x...']
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Synchronous Usage

Use `useFundSync` to wait for the transactions to be included on a block before returning:

```ts twoslash
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

const { data: receipts, mutate } = Hooks.faucet.useFundSync()

// Call `mutate` in response to user action
mutate({
  account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
})

console.log('Receipts:', receipts)
// @log: Receipts: [{ blockNumber: 123n, ... }, { blockNumber: 123n, ... }]
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `faucet.fund` Return Type](/tempo/actions/faucet.fund#return-type)

### mutate/mutateAsync

See [Wagmi Action `faucet.fund` Parameters](/tempo/actions/faucet.fund#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`faucet.fund`](/tempo/actions/faucet.fund)
