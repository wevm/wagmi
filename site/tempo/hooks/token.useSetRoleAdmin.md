# `token.useSetRoleAdmin`

Sets the admin role for a specific role on a TIP-20 token. Requires appropriate permissions. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const setRoleAdminSync = Hooks.token.useSetRoleAdminSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
setRoleAdminSync.mutate({
  adminRole: 'admin',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', setRoleAdminSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.setRoleAdmin` action and wait for inclusion manually:

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

const setRoleAdmin = Hooks.token.useSetRoleAdmin()
const { data: receipt } = useWaitForTransactionReceipt({ hash: setRoleAdmin.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
setRoleAdmin.mutate({
  adminRole: 'admin',
  role: 'issuer',
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args } 
    = Actions.token.setRoleAdmin.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `token.setRoleAdmin` Return Type](/tempo/actions/token.setRoleAdmin#return-type)

### mutate/mutateAsync

See [Wagmi Action `token.setRoleAdmin` Parameters](/tempo/actions/token.setRoleAdmin#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`token.setRoleAdmin`](/tempo/actions/token.setRoleAdmin)
