<script setup>
const packageName = 'wagmi'
const actionName = 'simulateContract'
const typeName = 'SimulateContract'
const TData = 'SimulateContractReturnType'
const TError = 'SimulateContractError'
</script>

# useContractSimulate

Action for simulating/validating a contract interaction.

## Import

```ts
import { useContractSimulate } from 'wagmi'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```

<<< @/snippets/abi-write.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!-- TODO: Usage for combining with useContractWrite -->

## Parameters

```ts
import { type UseContractSimulateParameters } from 'wagmi'
```

### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi' // [!code focus]

function App() {
  const result = useContractSimulate({
    abi, // [!code focus]
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`).

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [ // [!code focus]
      '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
      123n, // [!code focus]
    ], // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    blockNumber: 17829139n, // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    blockTag: 'safe', // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    chainId: mainnet.id, // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/WagmiProvider).

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'
import { config } from './config' // [!code focus]

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom',
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
    config, // [!code focus]
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group

```tsx [index.tsx]
import { useContractSimulate } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractSimulate({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', 
    functionName: 'transferFrom', // [!code focus]
    args: [
      '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      123n,
    ],
  })
}
```

<<< @/snippets/abi-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseContractSimulateReturnType } from 'wagmi'
```

The return type's [`data`](#data) property is inferrable via the combination of [`abi`](#abi), [`functionName`](#functionname), and [`args`](#args). Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for more info.

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`functionName`](#functionname), [`args`](#args), and the return type. See the Wagmi [TypeScript docs](/react/typescript) for more information.

::: code-group

```ts twoslash [Inline]
import { createConfig, http, useContractSimulate } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const result = useContractSimulate({
  abi: [
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }],
    },
  ],
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  // ^?
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  // ^?
})
result.data
//     ^?
```

```ts twoslash [Const-Asserted]
import { createConfig, http, useContractSimulate } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
// ---cut---
const abi = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }],
  },
] as const

const result = useContractSimulate({
  abi,
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  functionName: 'balanceOf',
  // ^?
  args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  // ^?
})
result.data
//     ^?
```

:::

## Action

[`simulateContract`](/core/api/actions/simulateContract)
