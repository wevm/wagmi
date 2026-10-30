---
"@wagmi/cli": patch
---

Fixed Foundry plugin throwing "Contract name must be unique" when Foundry emits the same artifact more than once (e.g. under both `out/` and `out/src/`). Duplicates with an identical ABI are now skipped.
