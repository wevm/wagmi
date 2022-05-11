---
'@wagmi/core': patch
'wagmi': patch
---

Fix case where connector disconnected while app was closed and stale data was returned when autoconnecting. For example, [MetaMask was locked](https://github.com/tmm/wagmi/issues/444) when page was closed.
