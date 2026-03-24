---
"@wagmi/connectors": patch
---

Fixed a listener leak in the WalletConnect connector's `switchChain` implementation. When a chain switch failed (user rejection, network error, or any other RPC error), the `change` event listener registered on the connector's emitter was not removed, causing it to accumulate across repeated failed attempts.
