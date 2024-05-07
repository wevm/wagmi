<script setup>
const packageName = '@wagmi/core'
const actionName = 'signTypedData'
const typeName = 'SignTypedData'
</script>

# signTypedData

Action for signing typed data and calculating an Ethereum-specific [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature.

## Import

```ts
import { signTypedData } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'

const result = await signTypedData(config, {
  types: {
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
  primaryType: 'Mail',
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
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type SignTypedDataParameters } from '@wagmi/core'
```

### account

`Address | Account | undefined`

Account to use when signing data. Throws if account is not found on [`connector`](#connector).

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const result = await signTypedData(config, {
  account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  types,
  primaryType: 'Mail',
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
})
```
<<< @/snippets/typedData.ts[typedData.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### connector

`Connector | undefined`

[Connector](/core/api/connectors) to sign data with.

::: code-group
```ts [index.ts]
import { getAccount, signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const { connector } = getAccount(config)
const result = await signTypedData(config, {
  connector, // [!code focus]
  types,
  primaryType: 'Mail',
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
})
```
<<< @/snippets/typedData.ts[typedData.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### domain

`TypedDataDomain | undefined`

- The typed data domain.
- If `EIP712Domain` key exists in [`types`](#types), `domain` schema is inferred from it.

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const result = await signTypedData(config, {
  domain: { // [!code focus]
    name: 'Ether Mail', // [!code focus]
    chainId: 1, // [!code focus]
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', // [!code focus]
    version: '1', // [!code focus]
  }, // [!code focus]
  types,
  primaryType: 'Mail',
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
})
```
<<< @/snippets/typedData.ts[typedData.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### message

`Record<string, unknown>`

- Data to sign.
- Type inferred from [`types`](#types) and [`primaryType`](#primarytype).

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const result = await signTypedData(config, {
  types,
  primaryType: 'Mail',
  message: { // [!code focus]
    from: { // [!code focus]
      name: 'Cow', // [!code focus]
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', // [!code focus]
    }, // [!code focus]
    to: { // [!code focus]
      name: 'Bob', // [!code focus]
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', // [!code focus]
    }, // [!code focus]
    contents: 'Hello, Bob!', // [!code focus]
  }, // [!code focus]
})
```
<<< @/snippets/typedData.ts[typedData.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### primaryType

`string`

- The primary type to extract from [`types`](#types) and use in [`message`](#message).
- Type inferred from [`types`](#types).

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const result = await signTypedData(config, {
  types,
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
})
```
<<< @/snippets/typedData.ts[typedData.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### types

`TypedData`

- The type definitions for the typed data.
- By defining inline or adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `types`, TypeScript will infer the correct types for [`message`](#message) and [`primaryType`](#primarytype). See the Wagmi [TypeScript docs](/core/typescript) for more information.

::: code-group
```ts [index.ts]
import { signTypedData } from '@wagmi/core'
import { config } from './config'

const result = await signTypedData(config, {
  types: { // [!code focus]
    Person: [ // [!code focus]
      { name: 'name', type: 'string' }, // [!code focus]
      { name: 'wallet', type: 'address' }, // [!code focus]
    ], // [!code focus]
    Mail: [ // [!code focus]
      { name: 'from', type: 'Person' }, // [!code focus]
      { name: 'to', type: 'Person' }, // [!code focus]
      { name: 'contents', type: 'string' }, // [!code focus]
    ], // [!code focus]
  }, // [!code focus]
  primaryType: 'Mail',
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
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type SignTypedDataReturnType } from '@wagmi/core'
```

[`Hex`](https://viem.sh/docs/glossary/types.html#hex)

The signed data.

## Type Inference

With [`types`](#types) setup correctly, TypeScript will infer the correct types for [`domain`](#domain), [`message`](#message), and [`primaryType`](#primarytype). See the Wagmi [TypeScript docs](/core/typescript) for more information.

::: code-group
```ts twoslash [Inline]
import { createConfig, http, signTypedData } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const result = await signTypedData(config, {
  types: {
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
  primaryType: 'Mail',
  // ^?


  message: {
  // ^?












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
})
```
```ts twoslash [Const-Asserted]
import { createConfig, http, signTypedData } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const types = {
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

const result = await signTypedData(config, {
  types,
  primaryType: 'Mail',
  // ^?


  message: {
  // ^?












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
})
```
:::

## Error

```ts
import { type SignTypedDataErrorType } from '@wagmi/core'
```

<!--@include: @shared/mutation-imports.md-->

## Viem

- [`signTypedData`](https://viem.sh/docs/actions/wallet/signTypedData.html)
