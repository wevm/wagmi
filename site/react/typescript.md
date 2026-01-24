<script setup>
import packageJson from '../../packages/react/package.json'

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

By default React Context does not work well with type inference. To support strong type-safety across the React Context boundary, there are two options available:

- Declaration merging to "register" your `config` globally with TypeScript.
- `config` property to pass your `config` directly to hooks.

### Declaration Merging

[Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) allows you to "register" your `config` globally with TypeScript. The `Register` type enables Wagmi to infer types in places that wouldn't normally have access to type info via React Context alone. 

To set this up, add the following declaration to your project. Below, we co-locate the declaration merging and the `config` set up.

```ts
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' { // [!code focus]
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

Since the `Register` type is global, you only need to add it once in your project. Once set up, you will get strong type-safety across your entire project. For example, query hooks will type `chainId` based on your `config`'s `chains`. 

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"296ef5d0fbed904e9f4bc9bf96c55b1f47345dcdd993965e6d5420eb1c6583d7","data":"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="}
// @errors: 2322
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useBlockNumber } from 'wagmi'

useBlockNumber({ chainId: 123 })
```

You just saved yourself a runtime error and you didn't even need to pass your `config`. 🎉

### Hook `config` Property

For cases where you have more than one Wagmi `config` or don't want to use the declaration merging approach, you can pass a specific `config` directly to hooks via the `config` property.

```ts
import { createConfig, http } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

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
// @twoslash-cache: {"v":1,"hash":"11543ad9699c8fdbef7c0ce7ac938f71b77d113989b5f3a8de83d428479463c3","data":"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"}
// @errors: 2322
import { type Config } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

declare const configA: Config<readonly [typeof mainnet]>
declare const configB: Config<readonly [typeof optimism]>
// ---cut---
import { useBlockNumber } from 'wagmi'

useBlockNumber({ chainId: 123, config: configA })
useBlockNumber({ chainId: 123, config: configB })
```

This approach is more explicit, but works well for advanced use-cases, if you don't want to use React Context or declaration merging, etc.

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
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Wagmi CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Etherscan and other block explorers, resolve ABIs from your Foundry/Hardhat projects, generate React Hooks, and more.
:::

Anywhere you see the `abi` or `types` configuration property, you can likely use const-asserted or inline ABIs and Typed Data to get type-safety and inference. These properties are also called out in the docs.

Here's what [`useReadContract`](/react/api/hooks/useReadContract) looks like with and without a const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"d7475b91e63cc31608c546a0ebb47f73a765bd7e10587f2f8d3a8df8fdf837c6","data":"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"}
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
import { useReadContract } from 'wagmi'

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
// @twoslash-cache: {"v":1,"hash":"8afd1fa05b7ad31ca46677e8331b056e5b32b376177ca9b18ff226265a7cdaaa","data":"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"}
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
import { useReadContract } from 'wagmi'

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
// @twoslash-cache: {"v":1,"hash":"0a7ec06948f56913d5c1a0817fa61f890c5a7843c9839243ebabed5019be8a0e","data":"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"}
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
import { useReadContract } from 'wagmi'

useReadContract({
  abi: erc721Abi,
  functionName: 'balanecOf',
})
```

## Configure Internal Types

For advanced use-cases, you may want to configure Wagmi's internal types. Most of Wagmi's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://github.com/wevm/abitype). See the [ABIType docs](https://abitype.dev) for more info on how to configure types.
