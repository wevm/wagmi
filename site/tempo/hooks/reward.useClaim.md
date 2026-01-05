# `reward.useClaim`

Claims accumulated rewards for the caller.

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

const claimSync = Hooks.reward.useClaimSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
claimSync.mutate({
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', claimSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.claim` action and wait for inclusion manually:

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
import { useWaitForTransactionReceipt } from 'wagmi'

const claim = Hooks.reward.useClaim()
const { data: receipt } = useWaitForTransactionReceipt({ hash: claim.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
claim.mutate({
  token: '0x20c0000000000000000000000000000000000000',
})
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `reward.claim` Return Type](/tempo/actions/reward.claim#return-type)

### mutate/mutateAsync

See [Wagmi Action `reward.claim` Parameters](/tempo/actions/reward.claim#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`reward.claim`](/tempo/actions/reward.claim)
