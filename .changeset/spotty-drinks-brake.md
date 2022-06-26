---
'wagmi': minor
---

**Breaking**: The `connector` parameter to `connect` & `connectAsync` now has to be in the config object parameter shape.

```diff
import { useConnect } from 'wagmi'

function App() {
  const { connect, connectors } = useConnect()

  return (
    <button
-     onClick={() => connect(connectors[0])}
+     onClick={() => connect({ connector: connectors[0] })}
    >
      Connect
    </button>
  )
}
```
