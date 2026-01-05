# `dex.useCreatePair`

Creates a new trading pair on the Stablecoin DEX.

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

const createPairSync = Hooks.dex.useCreatePairSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
createPairSync.mutate({
  base: '0x20c0000000000000000000000000000000000001',
})

console.log('Base token:', createPairSync.data?.base)
console.log('Quote token:', createPairSync.data?.quote)
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.createPair` action and wait for inclusion manually:

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
import { Actions } from 'viem/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'

const createPair = Hooks.dex.useCreatePair()
const { data: receipt } = useWaitForTransactionReceipt({ hash: createPair.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
createPair.mutate({
  base: '0x20c0000000000000000000000000000000000001',
})

if (receipt) {
  const { args: { base, quote } } 
    = Actions.dex.createPair.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `dex.createPair` Return Type](/tempo/actions/dex.createPair#return-type)

### mutate/mutateAsync

See [Wagmi Action `dex.createPair` Parameters](/tempo/actions/dex.createPair#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`dex.createPair`](/tempo/actions/dex.createPair)
