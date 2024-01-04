---
title: useVerifyTypedData
description: Hook for verify that a typed data was signed by the provided address.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'verifyTypedData'
const typeName = 'VerifyTypedData'
const TData = 'VerifyTypedDataData'
const TError = 'VerifyTypedDataErrorType'
</script>

# useVerifyTypedData

Hook for verify that a typed data was signed by the provided address. It supports verifying typed data that were signed by either a Smart Contract Account or Externally Owned Account.

## Import

```ts
import { useVerifyTypedData } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseVerifyTypedDataParameters } from 'wagmi'
```

### address

`Address | undefined`

The Ethereum address that signed the original typed data.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### domain

`TypedDataDomain | undefined`

The typed data domain.

::: code-group
```tsx [index.tsx]
import { types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain: { // [!code focus:6]
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### types

The type definitions for the typed data.

::: code-group
```tsx [index.tsx]
import { domain } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types: { // [!code focus:11]
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
    },
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### primaryType

`string | undefined`

The primary `type` to extract from types and use in `value`.

::: code-group
```tsx [index.tsx]
import { domain } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types: {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [ // [!code focus:5]
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
    },
    primaryType: 'Mail', // [!code focus]
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### message

Type inferred from `types` & `primaryType`.

The message to be verified.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types,
    message: { // [!code focus:11]
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### signature

`Hex | ByteArray | undefined`

The signature that was generated by signing the typed data with the address's signer.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c', // [!code focus]
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

Only used when verifying a typed data that was signed by a Smart Contract Account. The ID of chain to check if the contract was already deployed.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useVerifyTypedData({
    chainId: mainnet.id, // [!code focus]
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Only used when verifying a typed data that was signed by a Smart Contract Account. The block number to check if the contract was already deployed.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    blockNumber: 12345678n, // [!code focus]
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Only used when verifying a typed data that was signed by a Smart Contract Account. The block tag to check if the contract was already deployed.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    blockTag: 'latest', // [!code focus]
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useVerifyTypedData({
    config, // [!code focus]
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { domain, types } from './data'
import { useVerifyTypedData } from 'wagmi'

function App() {
  const result = useVerifyTypedData({
    scopeKey: 'foo' // [!code focus]
    domain,
    types,
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
    primaryType: 'Mail',
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
  })
}
```
```ts [data.ts]
// All properties on a domain are optional
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseVerifyTypedDataReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

## Type Inference

With [`types`](#types) setup correctly, TypeScript will infer the correct types for [`domain`](#domain), [`message`](#message), and [`primaryType`](#primarytype). See the Wagmi [TypeScript docs](/react/typescript) for more information.

<!--@include: @shared/query-imports.md-->

## Action

- [`verifyTypedData`](/core/api/actions/verifyTypedData)
