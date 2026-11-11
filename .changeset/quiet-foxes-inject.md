---
"@wagmi/core": patch
---

Fixed `injected` connector `unstable_shimAsyncInject` leaving its `ethereum#initialized` listener and timeout behind, and authorizing late-injected providers without checking accounts.
