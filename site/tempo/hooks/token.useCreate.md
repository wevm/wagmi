# `token.useCreate`

Creates a new TIP-20 token, and assigns the admin role to the calling account. [Learn more](https://docs.tempo.xyz/protocol/tip20/overview)

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

const createSync = Hooks.token.useCreateSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
createSync.mutate({
  currency: 'USD',
  name: 'My Company USD',
  symbol: 'CUSD',
})

console.log('Token address:', createSync.data?.token)
// @log: Token address: 0x20c0000000000000000000000000000000000004
console.log('Token ID:', createSync.data?.tokenId)
// @log: Token ID: 4n
console.log('Admin:', createSync.data?.admin)
// @log: Admin: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.create` action and wait for inclusion manually:

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

const create = Hooks.token.useCreate()
const { data: receipt } = useWaitForTransactionReceipt({ hash: create.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
create.mutate({
  currency: 'USD',
  name: 'My Company USD',
  symbol: 'CUSD',
})

if (receipt) {
  const { args: { token, tokenId, admin } } 
    = Actions.token.create.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.create` Return Type](/tempo/actions/token.create#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.create` Parameters](/tempo/actions/token.create#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.create`](/tempo/actions/token.create)
