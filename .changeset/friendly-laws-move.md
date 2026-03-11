---
'@wagmi/core': patch
'@wagmi/vue': patch
'wagmi': patch
---

Fix `feePayer` typing for regular wallet write actions on Tempo chains.

This preserves chain-specific transaction request fields in `sendTransaction`,
`sendTransactionSync`, and `deployContract`, and adds type regression coverage
for core, React, and Vue surfaces.
