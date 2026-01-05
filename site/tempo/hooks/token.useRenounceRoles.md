# `token.useRenounceRoles`

Renounces roles from the caller for a TIP-20 token. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const renounceRolesSync = Hooks.token.useRenounceRolesSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
renounceRolesSync.mutate({
  roles: ['issuer', 'blocker'],
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', renounceRolesSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.renounceRoles` action and wait for inclusion manually:

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

const renounceRoles = Hooks.token.useRenounceRoles()
const { data: receipt } = useWaitForTransactionReceipt({ hash: renounceRoles.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
renounceRoles.mutate({
  roles: ['issuer', 'blocker'],
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const events 
    = Actions.token.renounceRoles.extractEvents(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.renounceRoles` Return Type](/tempo/actions/token.renounceRoles#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.renounceRoles` Parameters](/tempo/actions/token.renounceRoles#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.renounceRoles`](/tempo/actions/token.renounceRoles)
