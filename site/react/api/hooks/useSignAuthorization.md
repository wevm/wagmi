---
title: useSignAuthorization
description: Hook that signs an EIP-7702 Authorization.
---

<script setup>
const packageName = 'wagmi/experimental'
const actionName = 'signAuthorization'
const typeName = 'SignAuthorization'
const mutate = 'signAuthorization'
const TData = 'SignAuthorizationData'
const TError = 'SignAuthorizationErrorType'
const TVariables = 'SignAuthorizationVariables'
</script>

# useSignAuthorization

Hook that signs an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702). The signed Authorization can be used in Transaction APIs like [sendTransaction](/core/api/actions/sendTransaction) and [writeContract](/core/api/actions/writeContract) to inject the authorized Contract bytecode(s) into an Account at the time of execution.

[Read more.](https://github.com/ethereum/EIPs/blob/9ab44b9534a848a21946d2afe9591767cd1522af/EIPS/eip-7702.md)

::: warning
This is an experimental Hook that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useSignAuthorization } from 'wagmi/experimental'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useSignAuthorization } from 'wagmi/experimental'

function App() {
  const { signAuthorization } = useSignAuthorization()

  return (
    <button
      onClick={() =>
        signAuthorization({
          account: privateKeyToAccount('0x...'),
          contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        })
      }
    >
      Sign authorization
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignAuthorizationParameters } from 'wagmi/experimental'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useSignAuthorization } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useSignAuthorization({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignAuthorizationReturnType } from 'wagmi/experimental'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signAuthorization`](/core/api/actions/signAuthorization)
