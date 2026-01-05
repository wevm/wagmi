# `dex.useCancel`

Cancels an order from the Stablecoin DEX orderbook.

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

const cancelSync = Hooks.dex.useCancelSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
cancelSync.mutate({
  orderId: 123n,
})

console.log('Cancelled order ID:', cancelSync.data?.orderId)
// @log: Cancelled order ID: 123n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.cancel` action and wait for inclusion manually:

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

const cancel = Hooks.dex.useCancel()
const { data: receipt } = useWaitForTransactionReceipt({ hash: cancel.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
cancel.mutate({
  orderId: 123n,
})

if (receipt) {
  const { args: { orderId } } 
    = Actions.dex.cancel.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `dex.cancel` Return Type](/tempo/actions/dex.cancel#return-type)

### mutate/mutateAsync

See [Wagmi Action `dex.cancel` Parameters](/tempo/actions/dex.cancel#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`dex.cancel`](/tempo/actions/dex.cancel)
