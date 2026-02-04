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

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"27f72e6eb6261410d5ea826717da884abdb710c1600590e05d55d49a8093f14a","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIAzAK5gAxmnYQwvQXBgAhVhBEBrAHKCAtgCMyAHhGT+7AOa86NMFDi8AwoZO8AvLfvHdpGMyiTWGXqgAdKV4QrUUVAFFaLEUPUjhEXmAgkNTUjy8fP1h+ZkFWNETk4LTS3gzvMF9eMGYNGESAkAi0fDI4EWYwJoBuFLLSiqzpUlZGgjQ0LASAehmYVvbOsAA6CV7+gfTPSurmLHYAVVHx/EnpxDn99hWFtvjltYgZ642S0oBfPvevzd4wpTKAAq7HqiQAjAAmAAMsO+aQMYDQpGYYgSST+aSGVT8MDAcEOYHYJHibAASvAIKwSUVMQNsXsoFAPHB0U1obQYFzuVzwQAWKAAdnBAA4RJCtHzBVAAJwyyEAZlgzC04IVCoArDB+XyeW8tlidsMASobBkaFBEoroSKNXaRfCBr93obMjjeBp8uJOqxWAraS76Ub3V5mfA2SAOZ1weCtLBoRqZYLBVoFQA2BUxtOC6GQkUitMSmCQ5jgwUKpNp6Pg/UGkIMvwm5RmzwWiF8zXp6Hgx1lZ1pfupFbD3j8j0QDy8YcrXu8EnsfgYAASXHwAH5EoxGCIOHjCrZd0jdNOAHwUXhYZgo+o0eKJABqZAXy9XAAUr3UFu0+I4T7xX6QEAaOwsi6FoEBUp4YAnnwAA+0iWDARhgDAUDfB857FGk07oQAumevAiPgzDsGAACSUBmPQeJWIRrjIE0REkfiTS4cgYCaDopBsU07BQKxTh0WARjGAxIBMaRcCsexnFkDxIB8ax56yKwMBiAAIswaDMIJWgmKRaAnowl7Xl+8QbtIsgKIC6jaGQKzvqZt5wPorjnhJ5FQMpMCqRpWnMDBiQyPI4RqLJpArBSaCCKQYBAtgMC6CpaloJp2knkELAcFwfC1PUcCXiIMCWSFNnhUEoJYBOaAldZKi2VxlAgN4IgIIgExTLMMwAO7MMYwErHA+AzHAVJ8S8BwzIQEDKHAMzBXVYV2eQVBwNppAMIgMpUKpYDGK0SD8lQ63GAseALaFDVkE1HAoUg0JUExKJiNdW0YegCV4IQJJNTQ9BMGwnA8LVl3hbodjCSY7jBtUgTvE2UQxBO7QBlsDa8DkeQFKjdblDDfh5Q0vBNC09wdF0tZ1ujMVjMTHUXHMdxLF0TyUwa6PXMctNNGcnWXBNNxMw8LMSALbMDrOg6hKFIJgqOMJwn8iLIqiaDolhQZutUeIEkSJJwOSlLUmQONU/jvChiyEYcjyPL8kKoripK0pyoqyqquqWo6nqICzmj5tNi2WmoVaCo2naGoOnSIRS4M5uegU7A+n6pvs+blvhuMUalrG8aJsmqYZlmOZ5gWRYlmWFaClWOfi5ruyNqFQdtqOHYal2PbR7wsex9OrfjpOOF/POi4rkNFlbju7B7okNiHmgx7DgRJmfs5D5PqPb4fje35OH+AFASBiXgZBXQwbw8HCDkpGoehmF/EPYAfPh57ghfo4xnaMbgueenGAZRkV473MkFKyoNloOW3mZFyp5uCgNKvVcKkUFgxTiglReKwMpEg0FVDaIMyrLSai1Nq9Muq9X6jcIaI0xpQAFlNCCs15pgIIY1Va61NpSh2nifa+BDp8mOleU6m0QAXRYddHaN8kCQkesRZ6t57rvWoJ9dqZBAIrRAGtK8m1CxcL2gdRAkJ+HiWgLgAxCo+QaioEYXan48CkVgLQFYasmp8TwKogAtIqCx7jMx8k8XyX65g8AAEFSDGE0HuXgEB+C8EwDgXgAByRgP4/zAEIsRUiFEISKh6N3BJvAQI1AgDVLgcATC1DCMVNAEALxQNvFEmJcTioJMcqvdo4NXDQy1n4VA/xQqI1iCjJIeNukYyQljfcaT0aE3GKTZm3RfYjIbiMbmpD+ZC3JqsdYiyOYHC5qcc4XVri3EWMLLZzxXiLK+N3XJTZZZEyhLCaEuS+7gg1APYqOE5wbxfOPTc2556z3nhg5edShmPlIM+Me+BWnAOBr+f8gFgKgVge/K+MBpwJJWP0GwbBWC8DKcYWo0VJweBJVIJp1gElpI8lk+WCpckfHyV0Si1LCKojaPciyHFlposQshW+6TmIUQsm/eC38v4xj5dfFCaECUGBwAAaRgBgCya1IV7WlUhG+cqACOggyCqsSAAGQgrIAA8sBBeABFA1pAMDmqwOISQLk/4GXPAAcQWItK6pAIikDUfFHAv99JInPOjZA04X5031Ya5VGAmjvyaLG+1AAxBZf5L78p1bkxEIkLIQxEiC9+ryPlThHFmmVgrepoCIhZE+qkuglpHJCMtfdK0YuHMyycpEDA4K0uwSp2L3hAjaLEhK1homJNpVAbtxVe1AUvOISp/wFjdS5BStoshx04DgMOsoQbmlQgVPkwpkASmsnKSqVSsSalNMSWKj+byNTfy1QK2dKwbowBIKwNxAaJw3UkQYmRH4XrkEQG8xRTSvrEHEdQIJ7VjKARwBtDAfAZ2ivfhKl9UqO3vqapojaSBhS6J4cRgRYSzrtRnYBu6wHxKyNVq9Qxz9HomLsTg6qwzRGIN5R8AQSLEkAAFyHAWoRwWdQQgg8aWlxLcKTeCMBpRkzy2SFTd24NwJqN5mBIFAOYHWEgwB4GcR8D4QA==="}
// @errors: 2345
import { type Config } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

declare module '@wagmi/solid' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut---
import { useBlockNumber } from '@wagmi/solid'

useBlockNumber(() => ({ chainId: 123 }))
```

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

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"6db931da3d5d995c7840071ad1e449e536b2569da9cadac7a5f1a18cd2f5e66d","data":"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"}
// @errors: 2345
import { type Config } from '@wagmi/solid'
import { mainnet, optimism } from '@wagmi/solid/chains'

declare const configA: Config<readonly [typeof mainnet]>
declare const configB: Config<readonly [typeof optimism]>
// ---cut---
import { useBlockNumber } from '@wagmi/solid'

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
