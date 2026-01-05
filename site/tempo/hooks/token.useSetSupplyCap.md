# `token.useSetSupplyCap`

Sets the supply cap for a TIP-20 token. Requires appropriate permissions. [Learn more about roles](https://docs.tempo.xyz/protocol/tip20/spec#role-based-access-control)

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

const setSupplyCapSync = Hooks.token.useSetSupplyCapSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
setSupplyCapSync.mutate({
  supplyCap: parseUnits('1000000', 6),
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', setSupplyCapSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.setSupplyCap` action and wait for inclusion manually:

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

const setSupplyCap = Hooks.token.useSetSupplyCap()
const { data: receipt } = useWaitForTransactionReceipt({ hash: setSupplyCap.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
setSupplyCap.mutate({
  supplyCap: parseUnits('1000000', 6),
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args } 
    = Actions.token.setSupplyCap.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.setSupplyCap` Return Type](/tempo/actions/token.setSupplyCap#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.setSupplyCap` Parameters](/tempo/actions/token.setSupplyCap#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.setSupplyCap`](/tempo/actions/token.setSupplyCap)
