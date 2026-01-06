<script setup>
import packageJson from '../../packages/core/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

Wagmi Core is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases.
- Changes to types in this repository are considered non-breaking and are usually released as patch  changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `@wagmi/core` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.
- The non-type-related public API of Wagmi Core still follows semver very strictly.

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

## Const-Assert ABIs & Typed Data

Wagmi Core can infer types based on [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, powered by [Viem](https://viem.sh) and [ABIType](https://github.com/wevm/abitype). This achieves full end-to-end type-safety from your contracts to your frontend and enlightened developer experience by autocompleting ABI item names, catching misspellings, inferring argument and return types (including overloads), and more.

For this to work, you must either [const-assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ABIs and Typed Data (more info below) or define them inline. For example, `useReadContract`'s `abi` configuration parameter:

```ts
const result = await readContract({
  abi: […], // <--- defined inline // [!code focus]
})
```

```ts
const abi = […] as const // <--- const assertion // [!code focus]
const result = readContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion or define the configuration parameter inline. Also, make sure your ABIs, Typed Data definitions, and [TypeScript configuration](#requirements) are valid and set up correctly.

::: tip
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Wagmi CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Etherscan and other block explorers, resolve ABIs from your Foundry/Hardhat projects, and more.
:::

Anywhere you see the `abi` or `types` configuration property, you can likely use const-asserted or inline ABIs and Typed Data to get type-safety and inference. These properties are also called out in the docs.

Here's what [`readContract`](/core/api/actions/readContract) looks like with and without a const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"ce7669bfd8403077642e11ee62585359f9005b3491bb5cb9aa7196e861042c9f","data":"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"}
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

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
import { readContract } from '@wagmi/core'

const result = await readContract(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

result
// ^?
```
```ts twoslash [Not Const-Asserted]
// @twoslash-cache: {"v":1,"hash":"32e9700c30963257f6c79b087bc2f37aa4f1bb4bb135b24ec22d2f898493f29f","data":"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"}
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

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
import { readContract } from '@wagmi/core'

const result = await readContract(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanceOf',
  // ^?



  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // ^?
})

result
// ^?
```
:::

You can prevent runtime errors and be more productive by making sure your ABIs and Typed Data definitions are set up appropriately. 🎉

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"1302572cb196fc0dde6d7e01c4f069233f8e54486c2e57cde92bd7a1bf18508b","data":"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"}
// @errors: 2820
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

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
import { readContract } from '@wagmi/core'

readContract(config, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: erc721Abi,
  functionName: 'balanecOf',
  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
})
```

## Configure Internal Types

For advanced use-cases, you may want to configure wagmi's internal types. Most of wagmi's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://github.com/wevm/abitype). See the [ABIType docs](https://abitype.dev) for more info on how to configure types.
