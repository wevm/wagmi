<script setup>
const packageName = 'wagmi'
const actionName = 'readContract'
const typeName = 'ReadContract'
const TData = 'ReadContractReturnType'
const TError = 'ReadContractError'
</script>

# useContractRead

Calls a **read-only** function on a contract, and returns the response.

A **read-only** function (constant function) on a Solidity contract is denoted by a view or pure keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

## Import

```ts
import { useContractRead } from 'wagmi'
```

## Usage

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseContractReadParameters } from 'wagmi'
```

---

### abi

`Abi | undefined`

The contract's ABI.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi, // [!code focus]
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    functionName: 'totalSupply',
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### functionName

`string | undefined`

Function to call on the contract.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf', // [!code focus]
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-balanceOf[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### args

`unknown[] | undefined`

Arguments to pass when calling the contract.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'], // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-balanceOf[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### account

`Account | undefined`

Account to use when calling the contract (`msg.sender`).

::: code-group

```tsx [index.tsx]
import { useContractRead, useAccount } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const { address } = useAccount() // [!code focus]
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    account: address, // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-balanceOf[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Block number to call contract at.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    blockNumber: 17829139n, // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to call contract at.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    blockTag: 'safe', // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]
import { erc20Abi } from './abi'

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    chainId: mainnet.id, // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/WagmiProvider).

::: code-group

```tsx [index.tsx]
import { useContractRead } from 'wagmi'
import { erc20Abi } from './abi'
import { config } from './config' // [!code focus]

function App() {
  const result = useContractRead({
    abi: erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'totalSupply',
    config, // [!code focus]
  })
}
```

<<< @/snippets/react/abi.ts#erc20Abi-totalSupply[abi.ts]

<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseContractReadReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

[`readContract`](/core/api/actions/readContract)
