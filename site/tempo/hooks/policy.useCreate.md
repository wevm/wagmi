# `policy.useCreate`

Creates a new transfer policy for token access control. [Learn more about transfer policies](https://docs.tempo.xyz/protocol/tip403/overview)

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

const createSync = Hooks.policy.useCreateSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
createSync.mutate({
  addresses: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ],
  type: 'whitelist',
})

console.log('Policy ID:', createSync.data?.policyId)
// @log: Policy ID: 1n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.create` action and wait for inclusion manually:

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

const create = Hooks.policy.useCreate()
const { data: receipt } = useWaitForTransactionReceipt({ hash: create.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
create.mutate({
  addresses: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ],
  type: 'whitelist',
})

if (receipt) {
  const { args: { policyId } } 
    = Actions.policy.create.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `policy.create` Return Type](/tempo/actions/policy.create#return-type)

### mutate/mutateAsync

See [Wagmi Action `policy.create` Parameters](/tempo/actions/policy.create#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`policy.create`](/tempo/actions/policy.create)
