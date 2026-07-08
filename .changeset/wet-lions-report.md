---
"@wagmi/core": patch
---

Fixed `waitForTransactionReceipt` staying pending for reverted transactions when revert-reason lookup hangs behind a fallback transport.
