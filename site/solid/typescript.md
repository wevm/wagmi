<script setup>
import packageJson from '../../packages/solid/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

`@wagmi/solid` is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases.
- Changes to types in this repository are considered non-breaking and are usually released as patch changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `@wagmi/solid` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.
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

By default Solid Context does not work well with type inference. To support strong type-safety across the Solid Context boundary, there are two options available:

- Declaration merging to "register" your `config` globally with TypeScript.
- `config` property to pass your `config` directly to primitives.

### Declaration Merging

[Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) allows you to "register" your `config` globally with TypeScript. The `Register` type enables Wagmi to infer types in places that wouldn't normally have access to type info via Solid Context alone.

To set this up, add the following declaration to your project. Below, we co-locate the declaration merging and the `config` set up.

```ts
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

declare module '@wagmi/solid' { // [!code focus]
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

Since the `Register` type is global, you only need to add it once in your project. Once set up, you will get strong type-safety across your entire project. For example, query primitives will type `chainId` based on your `config`'s `chains`.

### Primitive `config` Property

For cases where you have more than one Wagmi `config` or don't want to use the declaration merging approach, you can pass a specific `config` directly to primitives via the `config` property.

```ts
import { http, createConfig } from '@wagmi/solid'
import { mainnet, optimism } from '@wagmi/solid/chains'

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

```ts
import { useBlockNumber } from '@wagmi/solid'

// Pass config as a getter function (Solid reactivity)
useBlockNumber(() => ({ chainId: 123, config: configA }))
useBlockNumber(() => ({ chainId: 123, config: configB }))
```

This approach is more explicit, but works well for advanced use-cases, if you don't want to use Solid Context or declaration merging, etc.

## Reactive Parameters

In Solid, primitive parameters are passed as getter functions (accessors) to maintain reactivity. This is different from React where parameters are passed directly as objects.

```ts
// React style (NOT used in @wagmi/solid)
useBlockNumber({ chainId: 1 })

// Solid style (used in @wagmi/solid)
useBlockNumber(() => ({ chainId: 1 }))
```

This allows Wagmi to react to changes in your parameters automatically when using Solid's reactive primitives like `createSignal`.

```ts
import { createSignal } from 'solid-js'
import { useBlockNumber } from '@wagmi/solid'

const [chainId, setChainId] = createSignal(1)

// Block number will automatically update when chainId changes
useBlockNumber(() => ({ chainId: chainId() }))
```

## Configure Internal Types

For advanced use-cases, you may want to configure Wagmi's internal types. Most of Wagmi's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://github.com/wevm/abitype). See the [ABIType docs](https://abitype.dev) for more info on how to configure types.
