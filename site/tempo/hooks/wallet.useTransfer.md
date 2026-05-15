# `wallet.useTransfer`

Hook for transferring a TIP-20 token via the `wallet_transfer` JSON-RPC method on the connected wallet.

## Usage

::: code-group

```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

const transfer = Hooks.wallet.useTransfer()

// Call `mutate` in response to user action (e.g. button click, form submission)
transfer.mutate({
  amount: '1.5',
  to: '0x20c0000000000000000000000000000000000001',
  token: 'pathUSD',
})

console.log('Transaction hash:', transfer.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Editable mode

By default, `useTransfer` submits the transfer without showing an editable UI.

Pass `editable: true` to open the wallet's send UI instead, with any supplied fields pre-filled for the user to confirm or edit before signing.

```ts
transfer.mutate({
  editable: true,
  token: 'pathUSD',
})
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `wallet.transfer` Return Type](/tempo/actions/wallet.transfer#return-type)

### mutate/mutateAsync

See [Wagmi Action `wallet.transfer` Parameters](/tempo/actions/wallet.transfer#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`wallet.transfer`](/tempo/actions/wallet.transfer)
