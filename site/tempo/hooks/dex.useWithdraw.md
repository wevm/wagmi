# `dex.useWithdraw`

Withdraws tokens from the Stablecoin DEX to your wallet.

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

const { data: result, mutate } = Hooks.dex.useWithdrawSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('100', 6),
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('Transaction hash:', result.receipt.transactionHash)
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.withdraw` action and wait for inclusion manually:

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
import { parseUnits } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

const { data: hash, mutate } = Hooks.dex.useWithdraw()
const { data: receipt } = useWaitForTransactionReceipt({ hash })

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('100', 6),
  token: '0x20c0000000000000000000000000000000000001',
})
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `dex.withdraw` Return Type](/tempo/actions/dex.withdraw#return-type)

### mutate/mutateAsync

See [Wagmi Action `dex.withdraw` Parameters](/tempo/actions/dex.withdraw#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`dex.withdraw`](/tempo/actions/dex.withdraw)
