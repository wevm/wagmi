# `amm.useBurn`

Burns liquidity tokens and receives the underlying token pair. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

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

const burnSync = Hooks.amm.useBurnSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
burnSync.mutate({
  liquidity: parseUnits('10.5', 18),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Received user tokens:', burnSync.data?.amountUserToken)
// @log: Received user tokens: 5250000000000000000n
console.log('Received validator tokens:', burnSync.data?.amountValidatorToken)
// @log: Received validator tokens: 5250000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.burn` action and wait for inclusion manually:

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

const burn = Hooks.amm.useBurn()
const { data: receipt } = useWaitForTransactionReceipt({ hash: burn.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
burn.mutate({
  liquidity: parseUnits('10.5', 18),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

if (receipt) {
  const { args: { amountUserToken, amountValidatorToken } } 
    = Actions.amm.burn.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `amm.burn` Return Type](/tempo/actions/amm.burn#return-type)

### mutate/mutateAsync

See [Wagmi Action `amm.burn` Parameters](/tempo/actions/amm.burn#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`amm.burn`](/tempo/actions/amm.burn)
