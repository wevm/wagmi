---
'wagmi': minor
---

**Breaking**: The `useSigner` hook now always returns `undefined` when no signer is present. Previously, it returned `null`.

When no signer is present, the hook will be in an `"idle"` status.
