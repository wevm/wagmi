# useEstimateGas

Hook for estimating the gas necessary to complete a transaction without submitting it to the network.

## Import

```ts
import { useEstimateGas } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEstimateGas } from 'wagmi'

function App() {
  const result = useEstimateGas()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseEstimateGasParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseEstimateGasReturnType } from 'wagmi'
```

## Action

- [`estimateGas`](/core/api/actions/estimateGas)
