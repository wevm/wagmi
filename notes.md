Breaking changes:

- General
  - `gasLimit` is now `gas`
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
- `signTypedData`
  - `value` renamed to `message`
  - `primaryType` is required
- `fetchBlockNumber`
  - now bigint
- `watchPendingTransactions`
  - callback now returns array of transactions
- `prepareWriteTransaction`
  - Removed `abi`, `address`, `functionName` from return value, they are now in `request`.
  - `request` now returns shape of viem's `WriteContractParameters` instead of ethers' `TransactionRequest`.
- `writeTransaction`
  - Removed `overrides` in favor of `eth_sendTransaction` args (`gas`, `maxFeePerGas`, `account`, etc): https://viem.sh/docs/contract/writeContract.html#parameters
    - `from` is now `account`
  - `wait` has been removed from return type, use `waitForTransaction` instead.
- `prepareSendTransaction`
  - No longer returns `gasLimit` – wallets will calculate this instead.

TODO:

- Remove `types/contracts.ts` in favor of viem contract types
- ethers workaround: Remove `normalizeFunctionName` util
- ethers workaround: Remove `ContractMethodDoesNotExistError` error
