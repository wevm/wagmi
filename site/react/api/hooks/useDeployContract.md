---
title: useDeployContract
description: Hook for deploying a contract to the network, given bytecode & constructor arguments.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'deployContract'
const typeName = 'DeployContract'
const mutate = 'deployContract'
const TData = 'DeployContractData'
const TError = 'DeployContractErrorType'
const TVariables = 'DeployContractVariables'
</script>

# useDeployContract <Badge text="viem@>=2.8.18" />

Hook for deploying a contract to the network, given bytecode, and constructor arguments.

## Import

```ts
import { useDeployContract } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useDeployContract } from 'wagmi'
import { parseEther } from 'viem'
import { wagmiAbi } from './abi'

function App() {
  const { deployContract } = useDeployContract()

  return (
    <button
      onClick={() =>
        deployContract({
          abi: wagmiAbi,
          bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
        })
      }
    >
      Deploy Contract
    </button>
  )
}
```
```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  ...
] as const
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Deploying with Constructor Args

::: code-group
```tsx [index.tsx]
import { useDeployContract } from 'wagmi'
import { parseEther } from 'viem'
import { wagmiAbi } from './abi'

function App() {
  const { deployContract } = useDeployContract()

  return (
    <button
      onClick={() =>
        deployContract({
          abi: wagmiAbi,
          args: [69420],
          bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
        })
      }
    >
      Deploy Contract
    </button>
  )
}
```
```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "x", type: "uint32" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  ...
] as const;
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type useDeployContractParameters } from 'wagmi'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useDeployContract } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useDeployContract({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type useDeployContractReturnType } from 'wagmi'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`deployContract`](/core/api/actions/deployContract)
