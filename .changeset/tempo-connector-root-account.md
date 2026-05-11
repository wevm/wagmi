---
'@wagmi/core': patch
'wagmi': patch
---

`viem/tempo`: Fixed Tempo connectors leaking access key flavored accounts into viem by passing `accessKey: false` to `provider.getAccount` in `getClient`.
