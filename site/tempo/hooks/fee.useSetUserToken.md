# `fee.useSetUserToken`

Sets the user's default fee token preference. [Learn more about fees](https://docs.tempo.xyz/protocol/fees)

## Usage

::: code-group

```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

const setUserToken = Hooks.fee.useSetUserToken()

// Call `mutate` in response to user action
setUserToken.mutate({
  token: '0x20c0000000000000000000000000000000000001',
})
```

```ts [wagmi.config.ts] filename="wagmi.config.ts"
// @noErrors
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `fee.setUserToken` action and wait for inclusion manually:

```ts
import { Hooks } from 'wagmi/tempo'
import { Actions } from 'viem/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'

const setUserToken = Hooks.fee.useSetUserToken()
const { data: receipt } = useWaitForTransactionReceipt({ hash: setUserToken.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
setUserToken.mutate({
  token: '0x20c0000000000000000000000000000000000001',
})

if (receipt) {
  const { args } 
    = Actions.fee.setUserToken.extractEvent(receipt.logs)
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `fee.setUserToken` Return Type](/tempo/actions/fee.setUserToken#return-type)

### mutate/mutateAsync

See [Wagmi Action `fee.setUserToken` Parameters](/tempo/actions/fee.setUserToken#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`fee.setUserToken`](/tempo/actions/fee.setUserToken)
