---
"wagmi": patch
---

**Breaking (`wagmi/tempo`):** Removed `Hooks.zone.useDepositStatus` to align with the current Tempo Zone API. Use `Hooks.zone.useWaitForTempoBlock` to wait for a block import, or use `Hooks.zone.useZoneInfo` and inspect `tempoBlockNumber` for a one-shot read.
