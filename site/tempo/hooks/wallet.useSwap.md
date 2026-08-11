# `wallet.useSwap`

Hook for opening the wallet swap flow with optional pre-filled swap fields.

## Usage

::: code-group

```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

const swap = Hooks.wallet.useSwap()

// Call `mutate` in response to user action (e.g. button click, form submission)
swap.mutate({
  amount: '1.5',
  pairToken: '0x20c0000000000000000000000000000000000001',
  slippage: 0.05,
  token: '0x20c0000000000000000000000000000000000002',
  type: 'sell',
})

console.log('Transaction hash:', swap.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `wallet.swap` Return Type](/tempo/actions/wallet.swap#return-type)

### mutate/mutateAsync

See [Wagmi Action `wallet.swap` Parameters](/tempo/actions/wallet.swap#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`wallet.swap`](/tempo/actions/wallet.swap)
