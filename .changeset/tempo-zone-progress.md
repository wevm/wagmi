---
"@wagmi/core": patch
"wagmi": patch
---

**Breaking (`wagmi/tempo`):** Removed `Actions.zone.getDepositStatus` and `Hooks.zone.useDepositStatus` to align with the current Tempo Zone API. Use `Actions.zone.waitForTempoBlock` or `Hooks.zone.useWaitForTempoBlock` to wait for a block import, or use the Zone info APIs and inspect `tempoBlockNumber` for a one-shot read.
