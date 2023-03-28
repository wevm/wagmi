Breaking changes:

- `fetchBalance`
  - Removed `formatUnits` in favor of `units` config option.
- `signMessage`
  - `message` no longer accepts byte array.
  - Removed `UserRejectedRequestError` in favor of viem's internal error
- `readContract`
  - Removed `overrides` in favor of `blockNumber` & `blockTag`

TODO:

- Remove `types/contracts.ts` in favor of viem contract types
- ethers workaround: Remove `normalizeFunctionName` util
- ethers workaround: Remove `ContractMethodDoesNotExistError` error
