# useWatchContractEvent

Hook that watches and returns emitted contract event logs.

## Import

```ts
import { useWatchContractEvent } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'

function App() {
  useWatchContractEvent()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchContractEventParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseWatchContractEventReturnType } from 'wagmi'
```

## Action

- [`watchContractEvent`](/core/api/actions/watchContractEvent)
