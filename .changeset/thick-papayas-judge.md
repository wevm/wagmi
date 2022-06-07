---
'wagmi': patch
---

Fixed an issue in `useContractRead` where contract structs wouldn't be parsed back to an ethers `Result` correctly.
