---
title: usePrepareAuthorization
description: Hook for preparing an EIP-7702 Authorization for signing.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'prepareAuthorization'
const typeName = 'PrepareAuthorization'
const TData = 'PrepareAuthorizationData'
const TError = 'PrepareAuthorizationErrorType'
</script>

# usePrepareAuthorization

Hook for preparing an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) for signing. This Action will fill the required fields of the Authorization object if they are not provided (e.g. `nonce` and `chainId`).

With the prepared Authorization object, you can use [useSignAuthorization](/react/api/hooks/useSignAuthorization) to sign over it.

[Read more.](https://github.com/ethereum/EIPs/blob/9ab44b9534a848a21946d2afe9591767cd1522af/EIPS/eip-7702.md)

## Import

```ts
import { usePrepareAuthorization } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UsePrepareAuthorizationParameters } from 'wagmi'
```

### account

`Account | Address | undefined`

Account to use to prepare the Authorization object.

::: code-group
```tsx [index.tsx]
import { privateKeyToAccount } from 'viem/accounts'
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### contractAddress

`Address`

The target Contract to designate onto the Account.

::: code-group
```tsx [index.tsx]
import { privateKeyToAccount } from 'viem/accounts'
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


### chainId

`config['chains'][number]['id'] | undefined`

Chain ID to scope the Authorization to. If set to zero (`0`), then the Authorization will be valid on all chains.

::: code-group
```tsx [index.tsx]
import { privateKeyToAccount } from 'viem/accounts'
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    chainId: 1, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### nonce

`number | undefined`

The nonce to scope the Authorization to.

::: code-group
```tsx [index.tsx]
import { privateKeyToAccount } from 'viem/accounts'
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    nonce: 69, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### executor

`'self' | undefined`

Whether the EIP-7702 Transaction will be executed by the Account that signed the Authorization.

If not specified, it will be assumed that the EIP-7702 Transaction will be executed by another Account (ie. a relayer Account).

::: code-group
```tsx [index.tsx]
import { privateKeyToAccount } from 'viem/accounts'
import { usePrepareAuthorization } from 'wagmi'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    executor: 'self', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { usePrepareAuthorization } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = usePrepareAuthorization({
    config, // [!code focus]
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { usePrepareAuthorization } from 'wagmi'
import { privateKeyToAccount } from 'viem/accounts'

function App() {
  const result = usePrepareAuthorization({
    account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UsePrepareAuthorizationReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`prepareAuthorization`](/core/api/actions/prepareAuthorization)
