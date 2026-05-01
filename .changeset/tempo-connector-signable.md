---
'@wagmi/core': patch
---

Restricted `signable` account hydration in `getClient` to connectors with locally-hydratable signing material (`webAuthn`, `dangerous_secp256k1`).
