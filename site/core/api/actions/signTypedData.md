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
import { getConnection, signTypedData } from '@wagmi/core'
import { config } from './config'
import { types } from './typedData'

const { connector } = getConnection(config)
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

[`Hex`](https://viem.sh/docs/glossary/types#hex)

The signed data.

## Type Inference

With [`types`](#types) setup correctly, TypeScript will infer the correct types for [`domain`](#domain), [`message`](#message), and [`primaryType`](#primarytype). See the Wagmi [TypeScript docs](/core/typescript) for more information.

::: code-group
```ts twoslash [Inline]
// @twoslash-cache: {"v":1,"hash":"44d90fe296d503e3675e18b904994e8969cc43a5fc5d95c28c6ca88739b0e3f3","data":"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"}
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
// @twoslash-cache: {"v":1,"hash":"3253afdbde057c102c6b708011549c2795dd31d2584982f81ae20a403b5bdb54","data":"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"}
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

- [`signTypedData`](https://viem.sh/docs/actions/wallet/signTypedData)
