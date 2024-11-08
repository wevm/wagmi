---
title: useShowCallsStatus
description: Action to request for the wallet to show information about a call batch
---

<script setup>
const packageName = 'wagmi/experimental'
const actionName = 'showCallsStatus'
const typeName = 'ShowCallsStatus'
const mutate = 'showCallsStatus'
const TData = 'ShowCallsStatusData'
const TError = 'ShowCallsStatusErrorType'
const TVariables = 'ShowCallsStatusVariables'
</script>

# useShowCallsStatus

Action to request for the wallet to show information about a call batch that was sent via `useShowCalls`.

[Read more.](https://github.com/ethereum/EIPs/blob/1663ea2e7a683285f977eda51c32cec86553f585/EIPS/eip-5792.md#wallet_showcallsstatus)

::: warning
This is an experimental action that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useShowCallsStatus } from 'wagmi/experimental'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useShowCallsStatus } from 'wagmi/experimental'
import { parseEther } from 'viem'

function App() {
  const { showCallsStatus } = useShowCallsStatus()

  return (
    <button
      onClick={() =>
        showCallsStatus({
          id: '0x1234567890abcdef',
        })
      }
    >
      Show calls status
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseShowCallsStatusParameters } from 'wagmi/experimental'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useShowCallsStatus } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useShowCallsStatus({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseShowCallsStatusReturnType } from 'wagmi/experimental'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`showCallsStatus`](/core/api/actions/showCallsStatus)
