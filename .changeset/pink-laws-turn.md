---
'@wagmi/core': patch
'wagmi': patch
---

Add `ProviderRpcError` and `RpcError` error classes.

Certain wagmi-standardized errors may wrap `ProviderRpcError` or `RpcError`. For these cases, you can access the original provider rpc or rpc error value using the `internal` property.
