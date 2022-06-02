---
'wagmi': patch
---

Added `chainId` config option to `useConnect()` & `connect()`. Consumers can now pick what chain they want their user to be connected to.

Examples:

```tsx
import { useConnect, chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function App() {
  const connect = useConnect({
    chainId: chain.polygon.id,
  })
}
```

```tsx
import { useConnect, chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function App() {
  const connect = useConnect()

  return (
    <button onClick={() => connect({ chainId: chain.optimism.id })}>
      Connect to Optimism
    </button>
  )
}
```
