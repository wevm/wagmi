---
title: useWriteContracts
description: Hook that requests for the wallet to sign and broadcast a batch of calls (transactions) to the network. 
---

<script setup>
const packageName = 'wagmi/experimental'
const actionName = 'writeContracts'
const typeName = 'WriteContracts'
const mutate = 'writeContracts'
const TData = 'WriteContractsData'
const TError = 'WriteContractsErrorType'
const TVariables = 'WriteContractsVariables'
</script>

# useWriteContracts

Hook that requests for the wallet to sign and broadcast a batch of write contract calls (transactions) to the network.

[Read more.](https://github.com/ethereum/EIPs/blob/815028dc634463e1716fc5ce44c019a6040f0bef/EIPS/eip-5792.md#wallet_sendcalls)

::: warning
This is an experimental Hook that is not supported in most wallets. It is recommended to have a fallback mechanism if using this in production.
:::

## Import

```ts
import { useWriteContracts } from 'wagmi/experimental'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWriteContracts } from 'wagmi/experimental'
import { parseAbi } from 'viem'

const abi = parseAbi([
  'function approve(address, uint256) returns (bool)',
  'function transferFrom(address, address, uint256) returns (bool)',
])

function App() {
  const { writeContracts } = useWriteContracts()

  return (
    <button
      onClick={() =>
        writeContracts({
          contracts: [
            {
              address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              abi,
              functionName: 'approve',
              args: [
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 
                100n
              ],
            },
            {
              address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              abi,
              functionName: 'transferFrom',
              args: [
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                '0x0000000000000000000000000000000000000000',
                100n
              ],
            },
          ],
        })
      }
    >
      Send calls
    </button>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWriteContractsParameters } from 'wagmi/experimental'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWriteContracts } from 'wagmi/experimental'
import { config } from './config' // [!code focus]

function App() {
  const result = useWriteContracts({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseWriteContractsReturnType } from 'wagmi/experimental'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`writeContracts`](/core/api/actions/writeContracts)
