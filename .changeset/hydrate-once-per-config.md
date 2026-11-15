---
"wagmi": patch
---

Fixed `WagmiProvider` reconnecting and re-attaching connector listeners on every re-render when `ssr` is off. It now hydrates once per config.
