# `policy.useSetAdmin`

Sets the admin for a transfer policy. Requires current policy admin role.

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

const setAdminSync = Hooks.policy.useSetAdminSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
setAdminSync.mutate({
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})

console.log('Transaction hash:', setAdminSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.setAdmin` action and wait for inclusion manually:

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

const setAdmin = Hooks.policy.useSetAdmin()
const { data: receipt } = useWaitForTransactionReceipt({ hash: setAdmin.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
setAdmin.mutate({
  admin: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  policyId: 1n,
})

if (receipt) {
  const { args } 
    = Actions.policy.setAdmin.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `policy.setAdmin` Return Type](/tempo/actions/policy.setAdmin#return-type)

### mutate/mutateAsync

See [Wagmi Action `policy.setAdmin` Parameters](/tempo/actions/policy.setAdmin#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`policy.setAdmin`](/tempo/actions/policy.setAdmin)
