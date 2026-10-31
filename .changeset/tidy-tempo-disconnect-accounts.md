---
"@wagmi/core": patch
---

Fixed Tempo connectors (`tempoWallet`, `webAuthn`, `dangerous_secp256k1`) publishing a `connected` state with empty addresses during `disconnect()`. The connector now removes its `accountsChanged` listener before sending `wallet_disconnect`, so the provider's account-clearing event can no longer overwrite the live connection mid-teardown.
