# useChainId

Hook for getting current chain ID. Uses the [`getChainId`](/core/actions/getChainId) action.

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