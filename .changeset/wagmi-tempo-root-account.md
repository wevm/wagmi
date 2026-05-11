---
'@wagmi/core': patch
'wagmi': patch
---

Fixed Tempo connectors leaking access key flavored accounts into viem by passing `accessKey: false` to `provider.getAccount` in `getClient`, and deprecated the now-unused `signable` setup parameter.
