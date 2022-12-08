---
'wagmi': patch
---

Made `useSigner` always returns `null` when no signer is present. Previously, it returned `undefined` whilst the request was pending, and then `null`.
