---
"@wagmi/core": minor
---

Updated to `viem@2.44.0` with Tempo Moderato support.

**Breaking Changes (Tempo)**

- Renamed `reward.start` → `reward.distribute` (no longer supports streaming)
- Renamed `reward.startSync` → `reward.distributeSync`
- Renamed `reward.getTotalPerSecond` → `reward.getGlobalRewardPerToken`
- Renamed `reward.watchRewardScheduled` → `reward.watchRewardDistributed`
- Removed `nonce.getNonceKeyCount`
- Removed `nonce.watchActiveKeyCountChanged`
- Removed `amm.watchFeeSwap` (FeeSwap event no longer emitted by protocol)

**New Features (Tempo)**

- Added `dex.cancelStale` action to cancel stale orders from restricted makers
- Added `dex.cancelStaleSync` action
- Added `salt` parameter to `token.create`
