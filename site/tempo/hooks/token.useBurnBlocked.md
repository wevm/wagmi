# `token.useBurnBlocked`

Burns blocked TIP-20 tokens from a specific address. Requires appropriate permissions.

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

const { data: result, mutate } = Hooks.token.useBurnBlockedSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('10.5', 6),
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', result.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.burnBlocked` action and wait for inclusion manually:

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
import { useWaitForTransactionReceipt } from 'wagmi'

const { data: hash, mutate } = Hooks.token.useBurnBlocked()
const { data: receipt } = useWaitForTransactionReceipt({ hash })

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('10.5', 6),
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args } 
    = Actions.token.burnBlocked.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.burnBlocked` Return Type](/tempo/actions/token.burnBlocked#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.burnBlocked` Parameters](/tempo/actions/token.burnBlocked#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.burnBlocked`](/tempo/actions/token.burnBlocked)
