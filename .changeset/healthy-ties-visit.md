---
'wagmi': patch
---

Fix an issue where the `useContractRead` query function could return `undefined` instead of a serializable `null`.
