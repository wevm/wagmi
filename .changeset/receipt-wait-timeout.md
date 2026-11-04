---
"@wagmi/core": patch
---

Fixed `waitForTransactionReceipt` waiting forever for a transaction that never goes through. It now gives up after Viem's default `timeout` of 180 seconds. Pass `timeout: 0` to wait forever.
