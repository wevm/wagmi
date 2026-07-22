---
"@wagmi/core": patch
---

**Breaking (`@wagmi/core/tempo`):** Removed `Actions.zone.getDepositStatus` to align with the current Tempo Zone API. Use `Actions.zone.waitForTempoBlock` to wait for a block import, or use `Actions.zone.getZoneInfo` and inspect `tempoBlockNumber` for a one-shot read.
