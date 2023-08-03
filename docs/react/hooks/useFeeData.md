<script setup>
const packageName = 'wagmi'
const actionName = 'getFeeData'
const typeName = 'GetFeeData'
const TData = '{ formatted: { gasPrice: string | null; maxFeePerGas: string | null; maxPriorityFeePerGas: string | null; }; gasPrice: bigint | null; lastBaseFeePerGas: bigint | null; maxFeePerGas: bigint | null; maxPriorityFeePerGas: bigint | null; }'
const TError = 'GetFeeDataError'
</script>

# useFeeData

Hook for fetching current network fee info.

## Import

```ts
import { useFeeData } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useFeeData } from 'wagmi'

function App() {
  const result = useFeeData()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseFeeDataParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useFeeData } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useFeeData({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### formatUnits

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { useFeeData } from 'wagmi'

function App() {
  const result = useFeeData({
    formatUnits: 'ether', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseFeeDataReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

[getFeeData](/core/actions/getFeeData)