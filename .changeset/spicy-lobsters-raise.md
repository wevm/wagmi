---
'wagmi': minor
---

**Breaking**: The following changes were made to the `useConnect` return value:

### Connection status flags have been moved

The `isConnected`, `isConnecting`, `isReconnecting` & `isDisconnected` flags have been moved to the `useAccount` hook.

```diff
-import { useConnect } from 'wagmi'
+import { useAccount } from 'wagmi'

function App() {
  const {
    isConnected,
    isConnecting,
    isConnecting,
    isDisconnected
- } = useConnect()
+ } = useAccount()
}
```

### New `connect` mutation status flags have been added

The `isLoading`, `isSuccess` and `isError` flags have been added to `useConnect`.

These flags represent the **local** async state of `useConnect`.

### `activeConnector` has been removed

The `activeConnector` value has been removed. You can find the active connector on `useAccount`.

```diff
-import { useConnect } from 'wagmi'
+import { useAccount } from 'wagmi'

function App() {
- const { activeConnector } = useConnect()
+ const { connector } = useAccount()
}
```
