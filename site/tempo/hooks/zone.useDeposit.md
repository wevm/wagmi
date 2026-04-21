# `zone.useDeposit`

Hook for depositing tokens from the parent Tempo chain into a zone.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { parseUnits } from 'viem'

const depositSync = Hooks.zone.useDepositSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
depositSync.mutate({
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})

console.log('Transaction hash:', depositSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `zone.deposit` action and wait for inclusion manually:

```ts
import { Hooks } from 'wagmi/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'

const deposit = Hooks.zone.useDeposit()
const { data: receipt } = useWaitForTransactionReceipt({ hash: deposit.data })

deposit.mutate({
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})

console.log(receipt?.status)
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `zone.deposit` Return Type](/tempo/actions/zone.deposit#return-type)

### mutate/mutateAsync

See [Wagmi Action `zone.deposit` Parameters](/tempo/actions/zone.deposit#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`zone.deposit`](/tempo/actions/zone.deposit)
