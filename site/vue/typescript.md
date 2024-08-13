<script setup>
import packageJson from '../../packages/vue/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

Wagmi is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases.
- Changes to types in this repository are considered non-breaking and are usually released as patch changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `wagmi` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.
- The non-type-related public API of Wagmi still follows semver very strictly.

To ensure everything works correctly, make sure your `tsconfig.json` has [`strict`](https://www.typescriptlang.org/tsconfig#strict) mode set to `true`.

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}
```
:::

## Config Types

By default Vue Plugins does not work well with type inference. To support strong type-safety across the Vue Plugins boundary, there are two options available:

- Declaration merging to "register" your `config` globally with TypeScript.
- `config` property to pass your `config` directly to composables.

### Declaration Merging

[Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) allows you to "register" your `config` globally with TypeScript. The `Register` type enables Wagmi to infer types in places that wouldn't normally have access to type info via a Vue Plugin alone. 

To set this up, add the following declaration to your project. Below, we co-locate the declaration merging and the `config` set up.

```ts
import { createConfig, http } from '@wagmi/vue'
import { mainnet, sepolia } from 'wagmi/chains'

declare module '@wagmi/vue' { // [!code focus]
  interface Register { // [!code focus]
    config: typeof config // [!code focus]
  } // [!code focus]
} // [!code focus]

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

Since the `Register` type is global, you only need to add it once in your project. Once set up, you will get strong type-safety across your entire project. For example, query composables will type `chainId` based on your `config`'s `chains`. 

```ts twoslash
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from 'wagmi/chains'

declare module '@wagmi/vue' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123 })
```

You just saved yourself a runtime error and you didn't even need to pass your `config`. 🎉

### Hook `config` Property

For cases where you have more than one Wagmi `config` or don't want to use the declaration merging approach, you can pass a specific `config` directly to composables via the `config` property.

```ts
import { createConfig, http } from '@wagmi/vue'
import { mainnet, optimism } from '@wagmi/vue/chains'

export const configA = createConfig({ // [!code focus]
  chains: [mainnet], // [!code focus]
  transports: { // [!code focus]
    [mainnet.id]: http(), // [!code focus]
  }, // [!code focus]
}) // [!code focus]

export const configB = createConfig({ // [!code focus]
  chains: [optimism], // [!code focus]
  transports: { // [!code focus]
    [optimism.id]: http(), // [!code focus]
  }, // [!code focus]
}) // [!code focus]
```

As you expect, `chainId` is inferred correctly for each `config`.

```ts twoslash
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, optimism } from '@wagmi/vue/chains'

declare const configA: Config<readonly [typeof mainnet]>
declare const configB: Config<readonly [typeof optimism]>
// ---cut---
import { useBlockNumber } from '@wagmi/vue'

useBlockNumber({ chainId: 123, config: configA })
useBlockNumber({ chainId: 123, config: configB })
```

This approach is more explicit, but works well for advanced use-cases, if you don't want to use a Vue Plugin or declaration merging, etc.

## Const-Assert ABIs & Typed Data

Wagmi can infer types based on [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, powered by [Viem](https://viem.sh) and [ABIType](https://github.com/wevm/abitype). This achieves full end-to-end type-safety from your contracts to your frontend and enlightened developer experience by autocompleting ABI item names, catching misspellings, inferring argument and return types (including overloads), and more.

For this to work, you must either [const-assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ABIs and Typed Data (more info below) or define them inline. For example, `useReadContract`'s `abi` configuration parameter:

```ts
const { data } = useReadContract({
  abi: […], // <--- defined inline // [!code focus]
})
```

```ts
const abi = […] as const // <--- const assertion // [!code focus]
const { data } = useReadContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion or define the configuration parameter inline. Also, make sure your ABIs, Typed Data definitions, and [TypeScript configuration](#requirements) are valid and set up correctly.

::: tip
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Wagmi CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Etherscan and other block explorers, resolve ABIs from your Foundry/Hardhat projects, generate Vue Composables, and more.
:::

Anywhere you see the `abi` or `types` configuration property, you can likely use const-asserted or inline ABIs and Typed Data to get type-safety and inference. These properties are also called out in the docs.

Here's what [`useReadContract`](/vue/api/composables/useReadContract) looks like with and without a const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
const erc721Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'address', name: 'owner' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'address', name: 'operator' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'getApproved',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'string' }],
  },
] as const
// ---cut---
import { useReadContract } from '@wagmi/vue'

const { data } = useReadContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

data
// ^?
```
```ts twoslash [Not Const-Asserted]
declare const erc721Abi: {
  name: string;
  type: string;
  stateMutability: string;
  inputs: {
    type: string;
    name: string;
  }[];
  outputs: {
    type: string;
  }[];
}[]
// ---cut---
import { useReadContract } from '@wagmi/vue'

const { data } = useReadContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

data
// ^?
```
:::

<br/>
<br/>

You can prevent runtime errors and be more productive by making sure your ABIs and Typed Data definitions are set up appropriately. 🎉

```ts twoslash
// @errors: 2820
const erc721Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'address', name: 'owner' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { type: 'address', name: 'owner' },
      { type: 'address', name: 'operator' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'getApproved',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ type: 'uint256', name: 'tokenId' }],
    outputs: [{ type: 'string' }],
  },
] as const
// ---cut---
import { useReadContract } from '@wagmi/vue'

useReadContract({
  abi: erc721Abi,
  functionName: 'balanecOf',
})
```

## Configure Internal Types

For advanced use-cases, you may want to configure Wagmi's internal types. Most of Wagmi's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://github.com/wevm/abitype). See the [ABIType docs](https://abitype.dev) for more info on how to configure types.
