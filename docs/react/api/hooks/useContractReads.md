# useContractReads

Hook for calling multiple read methods on a contract.

## Import

```ts
import { useContractReads } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useContractReads } from 'wagmi'

function App() {
  const result = useContractReads()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseContractReadsParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseContractReadsReturnType } from 'wagmi'
```

## Action

- [`readContracts`](/core/api/actions/readContracts)
