---
"@wagmi/core": patch
"wagmi": patch
---

**Breaking (`wagmi/tempo`):** Removed `Actions.zone.getDepositStatus` and `Hooks.zone.useDepositStatus` to align with the current Tempo Zone API. Use `Actions.zone.getZoneInfo` or `Hooks.zone.useZoneInfo` and inspect `tempoBlockNumber` instead.
