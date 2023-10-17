---
"@wagmi/core": patch
"wagmi": patch
---

Fixed an issue where `dataSuffix` was not being passed down into viem's `simulateContract`, causing the data to be omitted from requests.
