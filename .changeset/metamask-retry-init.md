---
"@wagmi/connectors": patch
---

Fixed `metaMask` connector SDK initialization to allow retrying after a failure and to share a single initialization between concurrent calls.
