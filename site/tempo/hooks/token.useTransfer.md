# `token.useTransfer`

Transfers TIP-20 tokens from the caller to a recipient.

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

const { data: result, mutate } = Hooks.token.useTransferSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transfer amount:', result.amount)
// @log: Transfer amount: 10500000n
console.log('From:', result.from)
// @log: From: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('To:', result.to)
// @log: To: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.transfer` action and wait for inclusion manually:

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

const { data: hash, mutate } = Hooks.token.useTransfer()
const { data: receipt } = useWaitForTransactionReceipt({ hash })

// Call `mutate` in response to user action (e.g. button click, form submission)
mutate({
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args: { amount, from, to } } 
    = Actions.token.transfer.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.transfer` Return Type](/tempo/actions/token.transfer#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.transfer` Parameters](/tempo/actions/token.transfer#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.transfer`](/tempo/actions/token.transfer)
