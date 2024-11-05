---
"@wagmi/core": patch
---

Fixed bug in `waitForTransactionReceipt`, where transaction data wasn't passed to `'eth_call'` method as part of getting the revert reason.
