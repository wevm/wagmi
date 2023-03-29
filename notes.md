Breaking changes:

- `fetchBalance`
  - Removed `formatUnits` in favor of `units` config option.
- `signMessage`
  - `message` no longer accepts byte array.
  - Removed `UserRejectedRequestError` in favor of viem's internal error
- `readContract`
  - Removed `overrides` in favor of `blockNumber` & `blockTag`
- `readContracts`
  - Changed structure of return type (`allowFailure: true` returns an array of `{ error, result, status }[]` instead of `Result[]`)
  - Removed console.warn logs (these can be extracted from the `status` & `error` field now)
  - Removed `overrides` in favor of `blockNumber` & `blockTag`
- `multicall`
  - Changed structure of return type (`allowFailure: true` returns an array of `{ error, result, status }[]` instead of `Result[]`)
  - Removed console.warn logs (these can be extracted from the `status` & `error` field now)
  - Removed `overrides` in favor of `blockNumber` & `blockTag`
- `waitForTransaction`
  - Replaced `onSpeedUp` with `onReplaced`

TODO:

- Remove `types/contracts.ts` in favor of viem contract types
- ethers workaround: Remove `normalizeFunctionName` util
- ethers workaround: Remove `ContractMethodDoesNotExistError` error
