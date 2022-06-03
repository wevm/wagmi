---
'wagmi': minor
---

**Breaking**: The `client` prop is now required on `WagmiConfig`.

````diff
```tsx
import {
  createClient,
+ configureChains,
+ defaultChains
} from 'wagmi'
+import { publicProvider } from 'wagmi/providers/public'

+const { provider, webSocketProvider } = configureChains(defaultChains, [
+ publicProvider(),
+])

+const client = createClient({
+ provider,
+ webSocketProvider,
+})

function App() {
  return (
    <WagmiConfig
+     client={client}
    >
      <YourRoutes />
    </WagmiConfig>
  )
}
````
