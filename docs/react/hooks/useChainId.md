# useChainId

Hook for getting current chain ID.

## Import

```ts
import { useChainId } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useChainId } from 'wagmi'

function App() {
  const chainId = useChainId()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseChainIdReturnType } from 'wagmi'
```

## Action

- [`getChainId`](/core/actions/getChainId)
- [`watchChainId`](/core/actions/getChainId#watchchainid)