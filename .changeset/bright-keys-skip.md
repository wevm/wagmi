---
"@wagmi/core": patch
---

Added credential fast path to `webAuthn` connector — pass `capabilities.credential` directly to skip the WebAuthn ceremony when the credential is already known.
