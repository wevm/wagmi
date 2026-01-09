---
"@wagmi/core": minor
"wagmi": minor
---

Updated to viem 2.44.0 with Tempo Moderato support.

**Breaking Changes (Tempo)**

- Renamed `reward.start` → `reward.distribute` (no longer supports streaming)
- Renamed `reward.startSync` → `reward.distributeSync`
- Renamed `reward.getTotalPerSecond` → `reward.getGlobalRewardPerToken`
- Renamed `reward.watchRewardScheduled` → `reward.watchRewardDistributed`
- Renamed `Addresses.stablecoinExchange` → `Addresses.stablecoinDex`
- Renamed `Abis.stablecoinExchange` → `Abis.stablecoinDex`
- Removed `nonce.getNonceKeyCount`
- Removed `nonce.watchActiveKeyCountChanged`
- Removed `amm.watchFeeSwap` (FeeSwap event no longer emitted by protocol)

**React Hooks (Tempo)**

- Renamed `reward.useStart` → `reward.useDistribute`
- Renamed `reward.useStartSync` → `reward.useDistributeSync`
- Renamed `reward.useGetTotalPerSecond` → `reward.useGetGlobalRewardPerToken`
- Renamed `reward.useWatchRewardScheduled` → `reward.useWatchRewardDistributed`
- Removed `nonce.useNonceKeyCount`
- Removed `nonce.useWatchActiveKeyCountChanged`
- Removed `amm.useWatchFeeSwap`

**New Features (Tempo)**

- Added `dex.cancelStale` action to cancel stale orders from restricted makers
- Added `dex.cancelStaleSync` action
- Added `dex.useCancelStale` hook
- Added `dex.useCancelStaleSync` hook
- Added `salt` parameter to `token.create`
