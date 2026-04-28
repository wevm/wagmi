# `zone.useSignAuthorizationToken`

Hook for signing and storing a Tempo zone authorization token.

Use this hook before querying zone RPC methods that require the zone transport to send an `X-Authorization-Token` header.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)
const signAuthorizationToken = Hooks.zone.useSignAuthorizationToken()

const result = await signAuthorizationToken.mutateAsync({
  chainId: zoneChain.id,
})

console.log('Token:', result.token)
// @log: Token: 0x1234
```

```ts [wagmi.config.ts] filename="wagmi.config.ts"
// @noErrors
import { createConfig } from 'wagmi'
import { KeyManager, webAuthn } from 'wagmi/tempo'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [zoneChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [zoneChain.id]: zoneHttp(),
  },
})
```
:::

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `zone.signAuthorizationToken` Return Type](/tempo/actions/zone.signAuthorizationToken#return-type)

### mutate/mutateAsync

See [Wagmi Action `zone.signAuthorizationToken` Parameters](/tempo/actions/zone.signAuthorizationToken#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`zone.signAuthorizationToken`](/tempo/actions/zone.signAuthorizationToken)
