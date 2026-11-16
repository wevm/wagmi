---
"@wagmi/cli": patch
---

Fixed `foundry` plugin failing when the project path contains spaces by passing `forge` arguments as an array instead of a shell string.
