---
"wagmi": minor
---

Updated to `viem@2.44.0` with Tempo Moderato support.

**Breaking Changes (Tempo)**

- Renamed `reward.useStart` → `reward.useDistribute`
- Renamed `reward.useStartSync` → `reward.useDistributeSync`
- Renamed `reward.useGetTotalPerSecond` → `reward.useGetGlobalRewardPerToken`
- Renamed `reward.useWatchRewardScheduled` → `reward.useWatchRewardDistributed`
- Removed `nonce.useNonceKeyCount`
- Removed `nonce.useWatchActiveKeyCountChanged`
- Removed `amm.useWatchFeeSwap`

**New Features (Tempo)**

- Added `dex.useCancelStale` hook
- Added `dex.useCancelStaleSync` hook
