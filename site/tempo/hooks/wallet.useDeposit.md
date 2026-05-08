# `wallet.useDeposit`

Hook for opening the wallet deposit flow with optional pre-filled deposit fields.

## Usage

::: code-group

```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

const deposit = Hooks.wallet.useDeposit()

// Call `mutate` in response to user action (e.g. button click, form submission)
deposit.mutate({
  address: '0x20c0000000000000000000000000000000000001',
  chainId: 1,
  displayName: 'My Account',
  token: '0x20c0000000000000000000000000000000000002',
  value: '1.5',
})

console.log('Receipts:', deposit.data?.receipts)
// @log: Receipts: [...]
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `wallet.deposit` Return Type](/tempo/actions/wallet.deposit#return-type)

### mutate/mutateAsync

See [Wagmi Action `wallet.deposit` Parameters](/tempo/actions/wallet.deposit#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`wallet.deposit`](/tempo/actions/wallet.deposit)
