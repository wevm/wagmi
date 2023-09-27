# useWatchPendingTransactions

Hook that watches and returns pending transaction hashes.

## Import

```ts
import { useWatchPendingTransactions } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchPendingTransactionsParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseWatchPendingTransactionsReturnType } from 'wagmi'
```

## Action

- [`watchPendingTransactions`](/core/api/actions/watchPendingTransactions)
