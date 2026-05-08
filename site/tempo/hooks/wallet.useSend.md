# `wallet.useSend`

Hook for opening the wallet send flow with optional pre-filled send fields.

## Usage

::: code-group

```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

const send = Hooks.wallet.useSend()

// Call `mutate` in response to user action (e.g. button click, form submission)
send.mutate({
  to: '0x20c0000000000000000000000000000000000001',
  token: '0x20c0000000000000000000000000000000000002',
  value: '1.5',
})

console.log('Transaction hash:', send.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `wallet.send` Return Type](/tempo/actions/wallet.send#return-type)

### mutate/mutateAsync

See [Wagmi Action `wallet.send` Parameters](/tempo/actions/wallet.send#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`wallet.send`](/tempo/actions/wallet.send)
