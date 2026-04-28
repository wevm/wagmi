# `zone.useEncryptedDeposit`

Hook for depositing tokens into a zone with an encrypted recipient and memo.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { parseUnits } from 'viem'

const encryptedDepositSync = Hooks.zone.useEncryptedDepositSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
encryptedDepositSync.mutate({
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})

console.log(
  'Transaction hash:',
  encryptedDepositSync.data?.receipt.transactionHash,
)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `zone.encryptedDeposit` action and wait for inclusion manually:

```ts
import { Hooks } from 'wagmi/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'

const encryptedDeposit = Hooks.zone.useEncryptedDeposit()
const { data: receipt } = useWaitForTransactionReceipt({
  hash: encryptedDeposit.data,
})

encryptedDeposit.mutate({
  amount: parseUnits('10', 6),
  token: '0x20c0000000000000000000000000000000000001',
  zoneId: 7,
})

console.log(receipt?.status)
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `zone.encryptedDeposit` Return Type](/tempo/actions/zone.encryptedDeposit#return-type)

### mutate/mutateAsync

See [Wagmi Action `zone.encryptedDeposit` Parameters](/tempo/actions/zone.encryptedDeposit#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`zone.encryptedDeposit`](/tempo/actions/zone.encryptedDeposit)
