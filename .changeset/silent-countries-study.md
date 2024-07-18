---
"wagmi": patch
"@wagmi/vue": patch
---

Updated `useConnectorClient` to be enabled when status is `'reconnecting'` or `'connected'` (previously was also enabled when status was `'connecting'`).
