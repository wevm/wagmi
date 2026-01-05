# `policy.useModifyWhitelist`

Modifies the whitelist for a whitelist-type transfer policy. Requires policy admin role.

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

const { data: result, mutate } = Hooks.policy.useModifyWhitelistSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  allowed: true,
  policyId: 1n,
})

console.log('Transaction hash:', result.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `policy.modifyWhitelist` action and wait for inclusion manually:

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

const { data: hash, mutate } = Hooks.policy.useModifyWhitelist()
const { data: receipt } = useWaitForTransactionReceipt({ hash })

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  allowed: true,
  policyId: 1n,
})

if (receipt) {
  const { args } 
    = Actions.policy.modifyWhitelist.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `policy.modifyWhitelist` Return Type](/tempo/actions/policy.modifyWhitelist#return-type)

### mutate/mutateAsync

See [Wagmi Action `policy.modifyWhitelist` Parameters](/tempo/actions/policy.modifyWhitelist#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`policy.modifyWhitelist`](/tempo/actions/policy.modifyWhitelist)
