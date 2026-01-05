# `dex.usePlaceFlip`

Places a flip order that automatically flips to the opposite side when filled.

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
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'

const { data: result, mutate } = Hooks.dex.usePlaceFlipSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})

console.log('Flip order ID:', result.orderId)
// @log: Flip order ID: 456n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.placeFlip` action and wait for inclusion manually:

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
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'

const { data: hash, mutate } = Hooks.dex.usePlaceFlip()
const { data: receipt } = useWaitForTransactionReceipt({ hash })

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})

if (receipt) {
  const { args: { orderId } } 
    = Actions.dex.placeFlip.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `dex.placeFlip` Return Type](/tempo/actions/dex.placeFlip#return-type)

### mutate/mutateAsync

See [Wagmi Action `dex.placeFlip` Parameters](/tempo/actions/dex.placeFlip#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`dex.placeFlip`](/tempo/actions/dex.placeFlip)
