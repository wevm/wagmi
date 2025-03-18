# @wagmi/core

## 2.16.6

### Patch Changes

- [#4586](https://github.com/wevm/wagmi/pull/4586) [`edf47477b2f6385a1c3ae01d36a8498c47f30a0b`](https://github.com/wevm/wagmi/commit/edf47477b2f6385a1c3ae01d36a8498c47f30a0b) Thanks [@jxom](https://github.com/jxom)! - **Experimental (EIP-5792):** Added `waitForCallsStatus` + `useWaitForCallsStatus`.

## 2.16.5

### Patch Changes

- [`d0c9a86921a4e939373cc6e763284e53f2a2e93c`](https://github.com/wevm/wagmi/commit/d0c9a86921a4e939373cc6e763284e53f2a2e93c) Thanks [@jxom](https://github.com/jxom)! - **Experimental (ERC-5792)**: Added support for `account: null` in `sendCalls` to cater for sending calls without a connected account (account will be filled by the wallet).

## 2.16.4

### Patch Changes

- [`507f864d91238bfd423d0e36d3619eb9f6e52eec`](https://github.com/wevm/wagmi/commit/507f864d91238bfd423d0e36d3619eb9f6e52eec) Thanks [@jxom](https://github.com/jxom)! - Updated `@coinbase/wallet-sdk`.

## 2.16.3

### Patch Changes

- [#4480](https://github.com/wevm/wagmi/pull/4480) [`384a1d91597622eb59e1c05dc13ce25017c5b6d8`](https://github.com/wevm/wagmi/commit/384a1d91597622eb59e1c05dc13ce25017c5b6d8) Thanks [@RodeRickIsWatching](https://github.com/RodeRickIsWatching)! - Fixed invocation of default storage.

## 2.16.2

### Patch Changes

- [`012907032b532a438fce48f407470250cbc8f0c6`](https://github.com/wevm/wagmi/commit/012907032b532a438fce48f407470250cbc8f0c6) Thanks [@jxom](https://github.com/jxom)! - Fixed assignment in `getDefaultStorage`.

## 2.16.1

### Patch Changes

- [#4472](https://github.com/wevm/wagmi/pull/4472) [`3892ebd21c06beef4b28ece4e70d2a38807bce6f`](https://github.com/wevm/wagmi/commit/3892ebd21c06beef4b28ece4e70d2a38807bce6f) Thanks [@tmm](https://github.com/tmm)! - Added handling to default storage for `setItem` errors, like `QuotaExceededError`, `SecurityError`, etc.

## 2.16.0

### Minor Changes

- [#4453](https://github.com/wevm/wagmi/pull/4453) [`070e48480194c8d7f45bda1d7dd1346e6f5d7227`](https://github.com/wevm/wagmi/commit/070e48480194c8d7f45bda1d7dd1346e6f5d7227) Thanks [@tmm](https://github.com/tmm)! - Added narrowing to `config.connectors`.

### Patch Changes

- [`afea6b67822a7a2b96901ec851441d27ee0f7a52`](https://github.com/wevm/wagmi/commit/afea6b67822a7a2b96901ec851441d27ee0f7a52) Thanks [@tmm](https://github.com/tmm)! - Passed through parameters to `connector.connect` in `connect` action.

## 2.15.2

### Patch Changes

- [#4433](https://github.com/wevm/wagmi/pull/4433) [`06e186cd679b27fe195309110e766fcf46d4efbc`](https://github.com/wevm/wagmi/commit/06e186cd679b27fe195309110e766fcf46d4efbc) Thanks [@Aerilym](https://github.com/Aerilym)! - Bumped Metamask SDK version to `0.31.1`.

## 2.15.1

### Patch Changes

- [`b8bbb409f4934538e3dd6cac5aaf7346292d0693`](https://github.com/wevm/wagmi/commit/b8bbb409f4934538e3dd6cac5aaf7346292d0693) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where `null` gas would accidentally pass through.

## 2.15.0

### Minor Changes

- [#4417](https://github.com/wevm/wagmi/pull/4417) [`42e65ea4fea99c639817088bba915e0933d17141`](https://github.com/wevm/wagmi/commit/42e65ea4fea99c639817088bba915e0933d17141) Thanks [@jxom](https://github.com/jxom)! - Removed simulation in `writeContract` & `sendTransaction`.

## 2.14.6

### Patch Changes

- [#4406](https://github.com/wevm/wagmi/pull/4406) [`a13aa8d7c38eb3cc8171a02d6302e6d12cf6bcb3`](https://github.com/wevm/wagmi/commit/a13aa8d7c38eb3cc8171a02d6302e6d12cf6bcb3) Thanks [@tmm](https://github.com/tmm)! - Added support for multiple connector `rdns` entries.

## 2.14.5

### Patch Changes

- [#4400](https://github.com/wevm/wagmi/pull/4400) [`6b9bbacdc7bffd44fc2165362a5e65fd434e7646`](https://github.com/wevm/wagmi/commit/6b9bbacdc7bffd44fc2165362a5e65fd434e7646) Thanks [@AzzouQ](https://github.com/AzzouQ)! - Fixed `createWatchContractEvent` internal wiring, where `eventName` was incorrectly `functionName`.

## 2.14.4

### Patch Changes

- [#4311](https://github.com/wevm/wagmi/pull/4311) [`e08681c81fbdf475213e2d0f4c5517d0abf4e743`](https://github.com/wevm/wagmi/commit/e08681c81fbdf475213e2d0f4c5517d0abf4e743) Thanks [@chybisov](https://github.com/chybisov)! - Fixed `injected` connector race condition after calling `'wallet_addEthereumChain'` in `switchChain`.

## 2.14.3

### Patch Changes

- [`cb7dd2ebb871d0be8f1a11a8cd8ce592cd74b7c7`](https://github.com/wevm/wagmi/commit/cb7dd2ebb871d0be8f1a11a8cd8ce592cd74b7c7) Thanks [@tmm](https://github.com/tmm)! - Removed unnecessary internal deep equal check in `structuralSharing`.

## 2.14.2

### Patch Changes

- [#4339](https://github.com/wevm/wagmi/pull/4339) [`d0d0963bb5904a15cf0355862d62dd141ce0c31c`](https://github.com/wevm/wagmi/commit/d0d0963bb5904a15cf0355862d62dd141ce0c31c) Thanks [@AndriyAntonenko](https://github.com/AndriyAntonenko)! - Fixed bug in `waitForTransactionReceipt`, where transaction data wasn't passed to `'eth_call'` method as part of getting the revert reason.

- [`ecac0ba36243d94c9199d0bd21937104c835d9a0`](https://github.com/wevm/wagmi/commit/ecac0ba36243d94c9199d0bd21937104c835d9a0) Thanks [@tmm](https://github.com/tmm)! - Fixed `getBalance` symbol error handling.

## 2.14.1

### Patch Changes

- [`052e72e1f8c1c14fcbdce04a9f8fa7ec28d83702`](https://github.com/wevm/wagmi/commit/052e72e1f8c1c14fcbdce04a9f8fa7ec28d83702) Thanks [@tmm](https://github.com/tmm)! - Added `defaultConnected` feature to `mock` connector.

- [#4349](https://github.com/wevm/wagmi/pull/4349) [`b250fc21ee577b2a75c5a34ff684f62fb4ad771a`](https://github.com/wevm/wagmi/commit/b250fc21ee577b2a75c5a34ff684f62fb4ad771a) Thanks [@tmm](https://github.com/tmm)! - Bumped internal deps.

## 2.14.0

### Minor Changes

- [#4343](https://github.com/wevm/wagmi/pull/4343) [`f43e074f473820b208a6295d7c97f847332f1a1d`](https://github.com/wevm/wagmi/commit/f43e074f473820b208a6295d7c97f847332f1a1d) Thanks [@tmm](https://github.com/tmm)! - Added `rdns` property to connector interface. This is used to filter out duplicate [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) injected providers when [`createConfig#multiInjectedProviderDiscovery`](https://wagmi.sh/core/api/createConfig#multiinjectedproviderdiscovery) is enabled and `createConfig#connectors` already matches EIP-6963 providers' `rdns` property.

## 2.13.9

### Patch Changes

- [#4336](https://github.com/wevm/wagmi/pull/4336) [`c05caabc20c3ced9682cfc7ba1f3f7dcfece0703`](https://github.com/wevm/wagmi/commit/c05caabc20c3ced9682cfc7ba1f3f7dcfece0703) Thanks [@EdouardBougon](https://github.com/EdouardBougon)! - Added deprecation notice to `injected` target flags.

## 2.13.8

### Patch Changes

- [#4207](https://github.com/wevm/wagmi/pull/4207) [`56f2482508f2ba71bd6b0295c70c6abca7101e57`](https://github.com/wevm/wagmi/commit/56f2482508f2ba71bd6b0295c70c6abca7101e57) Thanks [@Smert](https://github.com/Smert)! - Updated chain switch listener for `injected` and `metaMask` to be more robust.

## 2.13.7

### Patch Changes

- [`be75c2d4ef636d7362420ab0a106bfdf63f5d1e6`](https://github.com/wevm/wagmi/commit/be75c2d4ef636d7362420ab0a106bfdf63f5d1e6) Thanks [@tmm](https://github.com/tmm)! - Added guard for missing `provider.on` for `injected` connector.

## 2.13.6

### Patch Changes

- [#4286](https://github.com/wevm/wagmi/pull/4286) [`edcbf5d6fbe92f639bead800502edda9e0aa39f1`](https://github.com/wevm/wagmi/commit/edcbf5d6fbe92f639bead800502edda9e0aa39f1) Thanks [@holic](https://github.com/holic)! - Removed duplicate code.

## 2.13.5

### Patch Changes

- [#4259](https://github.com/wevm/wagmi/pull/4259) [`f47ce8f6d263e49fdff90b8edb3190142d2657bb`](https://github.com/wevm/wagmi/commit/f47ce8f6d263e49fdff90b8edb3190142d2657bb) Thanks [@tmm](https://github.com/tmm)! - Added guard to `getConnectorClient` when reconnecting to check if connector is fully restored.

## 2.13.4

### Patch Changes

- [`b4c8971788c70b09479946ecfa998cff2f1b3953`](https://github.com/wevm/wagmi/commit/b4c8971788c70b09479946ecfa998cff2f1b3953) Thanks [@tmm](https://github.com/tmm)! - Made `serialize` and `deserialize` types more permissive.

## 2.13.3

### Patch Changes

- [`871dbdbfe59ac8ad01d1ec6150ea7b091b7b7de4`](https://github.com/wevm/wagmi/commit/871dbdbfe59ac8ad01d1ec6150ea7b091b7b7de4) Thanks [@tmm](https://github.com/tmm)! - Added validation to internal state for persisted `chainId`.

## 2.13.2

### Patch Changes

- [`1b9b523fa9b9dfe839aecdf4b40caa9547d7e594`](https://github.com/wevm/wagmi/commit/1b9b523fa9b9dfe839aecdf4b40caa9547d7e594) Thanks [@tmm](https://github.com/tmm)! - Fixed built-in cookie storage `removeItem` working for all paths.

## 2.13.1

### Patch Changes

- [`07c1227f306d0efb9421d4bb77a774f92f5fcf45`](https://github.com/wevm/wagmi/commit/07c1227f306d0efb9421d4bb77a774f92f5fcf45) Thanks [@tmm](https://github.com/tmm)! - Fixed internal `extractRpcUrls` usage with `unstable_connector`.

## 2.13.0

### Minor Changes

- [#4162](https://github.com/wevm/wagmi/pull/4162) [`a73a7737b756886b388f120ae423e72cca53e8a0`](https://github.com/wevm/wagmi/commit/a73a7737b756886b388f120ae423e72cca53e8a0) Thanks [@jxom](https://github.com/jxom)! - Added functionality for consumer-defined RPC URLs (`config.transports`) to be propagated to the WalletConnect & MetaMask Connectors.

## 2.12.2

### Patch Changes

- [`5bc8c8877810b2eec24a829df87dce40a51e6f20`](https://github.com/wevm/wagmi/commit/5bc8c8877810b2eec24a829df87dce40a51e6f20) Thanks [@tmm](https://github.com/tmm)! - Fixed reconnection when `status` is defined.

## 2.12.1

### Patch Changes

- [#4146](https://github.com/wevm/wagmi/pull/4146) [`cc996e08e930c9e88cf753a1e874652059e81a3b`](https://github.com/wevm/wagmi/commit/cc996e08e930c9e88cf753a1e874652059e81a3b) Thanks [@jxom](https://github.com/jxom)! - Updated `@safe-global/safe-apps-sdk` + `@safe-global/safe-apps-provider` dependencies.

## 2.12.0

### Minor Changes

- [#4128](https://github.com/wevm/wagmi/pull/4128) [`5581a810ef70308e99c6f8b630cd4bca59f64afc`](https://github.com/wevm/wagmi/commit/5581a810ef70308e99c6f8b630cd4bca59f64afc) Thanks [@dalechyn](https://github.com/dalechyn)! - Added `watchAsset` action.

## 2.11.8

### Patch Changes

- [`b08013eaa9ce97c02f8a7128ea400e3da7ef74bb`](https://github.com/wevm/wagmi/commit/b08013eaa9ce97c02f8a7128ea400e3da7ef74bb) Thanks [@tmm](https://github.com/tmm)! - Fixed injected accounts ordering for `'wallet_requestPermissions'`.

- [`d3814ab4b88f9f0e052b53bc3d458df87b43f01d`](https://github.com/wevm/wagmi/commit/d3814ab4b88f9f0e052b53bc3d458df87b43f01d) Thanks [@jxom](https://github.com/jxom)! - Updated `mipd` dependency.

## 2.11.7

### Patch Changes

- [`0bb8b562ae04ecfeb2d6b2f1b980ebae31dc127e`](https://github.com/wevm/wagmi/commit/0bb8b562ae04ecfeb2d6b2f1b980ebae31dc127e) Thanks [@tmm](https://github.com/tmm)! - Improved TypeScript `'exactOptionalPropertyTypes'` support.

## 2.11.6

### Patch Changes

- [#4060](https://github.com/wevm/wagmi/pull/4060) [`95965c1f19d480b97f2b297a077a9e607dee32ad`](https://github.com/wevm/wagmi/commit/95965c1f19d480b97f2b297a077a9e607dee32ad) Thanks [@dalechyn](https://github.com/dalechyn)! - Bumped Tanstack Query dependencies to fix typing issues between exported Wagmi query options and TanStack Query suspense query methods (due to [`direction` property in `QueryFunctionContext` being deprecated](https://github.com/TanStack/query/pull/7410)).

## 2.11.5

### Patch Changes

- [#4079](https://github.com/wevm/wagmi/pull/4079) [`04f2b846b113f3d300d82c9fa75212f1805817c5`](https://github.com/wevm/wagmi/commit/04f2b846b113f3d300d82c9fa75212f1805817c5) Thanks [@tmm](https://github.com/tmm)! - Added revalidation for config chain ID in SSR and migration.

## 2.11.4

### Patch Changes

- [`9e8345cd56186b997b5e56deaa2cfc69b30d15f6`](https://github.com/wevm/wagmi/commit/9e8345cd56186b997b5e56deaa2cfc69b30d15f6) Thanks [@tmm](https://github.com/tmm)! - Switched `Register` to `interface` to fix declaration merging.

## 2.11.3

### Patch Changes

- [#4065](https://github.com/wevm/wagmi/pull/4065) [`8974e6269bb5d7bfaa90db0246bc7d13e8bff798`](https://github.com/wevm/wagmi/commit/8974e6269bb5d7bfaa90db0246bc7d13e8bff798) Thanks [@alx-khramov](https://github.com/alx-khramov)! - Added timeout to internal call of `'wallet_revokePermissions'` request during `injected#disconnect` as some wallets that do not support this method hang.

## 2.11.2

### Patch Changes

- [#4042](https://github.com/wevm/wagmi/pull/4042) [`b4d9ef79deb554ee20fed6666a474be5e7cdd522`](https://github.com/wevm/wagmi/commit/b4d9ef79deb554ee20fed6666a474be5e7cdd522) Thanks [@tmm](https://github.com/tmm)! - Removed `injected` connector `isAuthorized` timeout.

## 2.11.1

### Patch Changes

- [`9c862d8d63e3d692a22cef2a90782b74a9103f17`](https://github.com/wevm/wagmi/commit/9c862d8d63e3d692a22cef2a90782b74a9103f17) Thanks [@tmm](https://github.com/tmm)! - Reverted internal module loading utility.

## 2.11.0

### Minor Changes

- [#3816](https://github.com/wevm/wagmi/pull/3816) [`06bb598a7f04c7b167f5b7ff6d46bd15886a6a14`](https://github.com/wevm/wagmi/commit/06bb598a7f04c7b167f5b7ff6d46bd15886a6a14) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `deployContract` action.

### Patch Changes

- [`24a45b269bd0214a29d6f82a84ac66ef8c3f3822`](https://github.com/wevm/wagmi/commit/24a45b269bd0214a29d6f82a84ac66ef8c3f3822) Thanks [@tmm](https://github.com/tmm)! - Added `SameSite` default to `cookieStorage`

## 2.10.6

### Patch Changes

- [#4009](https://github.com/wevm/wagmi/pull/4009) [`f2a7cefab96691ebed8b8e45ffde071c47b58dbe`](https://github.com/wevm/wagmi/commit/f2a7cefab96691ebed8b8e45ffde071c47b58dbe) Thanks [@roninjin10](https://github.com/roninjin10)! - Marked `to` as optional for `sendTransaction`.

- [#4023](https://github.com/wevm/wagmi/pull/4023) [`f0ea0b2a7fe193dadfeb49a4c8031ee451c638b5`](https://github.com/wevm/wagmi/commit/f0ea0b2a7fe193dadfeb49a4c8031ee451c638b5) Thanks [@jxom](https://github.com/jxom)! - Added chain check to `getConnectorClient` since it's possible for connection state chain ID to get out of sync with the connector (e.g. [wallet bug](https://github.com/MetaMask/metamask-extension/issues/25097)).

## 2.10.5

### Patch Changes

- [#3970](https://github.com/wevm/wagmi/pull/3970) [`030c7c2cb380dfd67a2182f62e2aa7a6e1601898`](https://github.com/wevm/wagmi/commit/030c7c2cb380dfd67a2182f62e2aa7a6e1601898) Thanks [@nanxiaobei](https://github.com/nanxiaobei)! - Fixed `cookieStorage` not working across paths.

## 2.10.4

### Patch Changes

- [#3984](https://github.com/wevm/wagmi/pull/3984) [`51fde8a0433b4fff357c1a8d7e08b41b4c86c968`](https://github.com/wevm/wagmi/commit/51fde8a0433b4fff357c1a8d7e08b41b4c86c968) Thanks [@tmm](https://github.com/tmm)! - Fixed `writeContract` query types for `value` property.

## 2.10.3

### Patch Changes

- [#3962](https://github.com/wevm/wagmi/pull/3962) [`2804a8a583b1874271154898b4bae38756ef581c`](https://github.com/wevm/wagmi/commit/2804a8a583b1874271154898b4bae38756ef581c) Thanks [@tmm](https://github.com/tmm)! - Added catch to `reconnect`.

## 2.10.2

### Patch Changes

- [#3940](https://github.com/wevm/wagmi/pull/3940) [`a5071f581dfdfb961718873643a2fc629101c72a`](https://github.com/wevm/wagmi/commit/a5071f581dfdfb961718873643a2fc629101c72a) Thanks [@jxom](https://github.com/jxom)! - Fixed usage of `metaMask` connector in Vite environments.

## 2.10.1

### Patch Changes

- Bumped versions.

## 2.10.0

### Minor Changes

- [#3928](https://github.com/wevm/wagmi/pull/3928) [`3117e71825f9c58a0d718f3d1686f1a191fa9cb1`](https://github.com/wevm/wagmi/commit/3117e71825f9c58a0d718f3d1686f1a191fa9cb1) Thanks [@tmm](https://github.com/tmm)! - Updated the default Coinbase SDK in `coinbaseWallet` Connector to v4.x.

## 2.9.8

### Patch Changes

- [#3906](https://github.com/wevm/wagmi/pull/3906) [`32fcb4a31dde6b0206961d8ffe9c651f8a459c67`](https://github.com/wevm/wagmi/commit/32fcb4a31dde6b0206961d8ffe9c651f8a459c67) Thanks [@tmm](https://github.com/tmm)! - Added support for Vue.

## 2.9.7

### Patch Changes

- [#3924](https://github.com/wevm/wagmi/pull/3924) [`1f58734f88458e0f6adb05c99f0c90f36ab286b8`](https://github.com/wevm/wagmi/commit/1f58734f88458e0f6adb05c99f0c90f36ab286b8) Thanks [@jxom](https://github.com/jxom)! - Refactored `isChainsStale` logic in `walletConnect` connector.

## 2.9.6

### Patch Changes

- [#3917](https://github.com/wevm/wagmi/pull/3917) [`05948fdad5bb4a56b08916d45b3dec2cb1e5f55b`](https://github.com/wevm/wagmi/commit/05948fdad5bb4a56b08916d45b3dec2cb1e5f55b) Thanks [@jxom](https://github.com/jxom)! - Updated `@metamask/sdk`.

## 2.9.5

### Patch Changes

- [`4fecbbb66d0aacd03b8c62a6455d11a33cde8f85`](https://github.com/wevm/wagmi/commit/4fecbbb66d0aacd03b8c62a6455d11a33cde8f85) Thanks [@jxom](https://github.com/jxom)! - Fixed address comparison in `getConnectorClient`.

## 2.9.4

### Patch Changes

- [#3910](https://github.com/wevm/wagmi/pull/3910) [`e6139a97c4b8804d734b1547b5e3921ce01fbe24`](https://github.com/wevm/wagmi/commit/e6139a97c4b8804d734b1547b5e3921ce01fbe24) Thanks [@tmm](https://github.com/tmm)! - Added experimental `wallet_revokePermissions` support to `injected`.

## 2.9.3

### Patch Changes

- [#3904](https://github.com/wevm/wagmi/pull/3904) [`addca28ebc20f1a4367c35fe9ef786decff9c87e`](https://github.com/wevm/wagmi/commit/addca28ebc20f1a4367c35fe9ef786decff9c87e) Thanks [@jxom](https://github.com/jxom)! - Updated `@walletconnect/ethereum-provider`.

## 2.9.2

### Patch Changes

- [#3902](https://github.com/wevm/wagmi/pull/3902) [`204b7b624612405500ec098fb9e35facd3f74ca4`](https://github.com/wevm/wagmi/commit/204b7b624612405500ec098fb9e35facd3f74ca4) Thanks [@jxom](https://github.com/jxom)! - Made third-party SDK imports type-only.

## 2.9.1

### Patch Changes

- [`cda6a5d5`](https://github.com/wevm/wagmi/commit/cda6a5d56328330fbde050b4ef40b01c58d2519a) Thanks [@jxom](https://github.com/jxom)! - Updated packages.

## 2.9.0

### Minor Changes

- [#3878](https://github.com/wevm/wagmi/pull/3878) [`017828fc`](https://github.com/wevm/wagmi/commit/017828fc027c7a84b54ea9d627e9389f4d60d6c2) Thanks [@jxom](https://github.com/jxom)! - Added experimental EIP-5792 Actions & Hooks.

## 2.8.1

### Patch Changes

- [#3869](https://github.com/wevm/wagmi/pull/3869) [`d4a78eb0`](https://github.com/wevm/wagmi/commit/d4a78eb07119d2e5617e52481ac7d6c6d1583ddc) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where `prepareTransactionRequest` would internally call unsupported wallet RPC methods.

## 2.8.0

### Minor Changes

- [#3868](https://github.com/wevm/wagmi/pull/3868) [`c2af20b8`](https://github.com/wevm/wagmi/commit/c2af20b88cf16970d087faaec10b463357a5836e) Thanks [@jxom](https://github.com/jxom)! - Added `supportsSimulation` property to connectors that indicates if the connector's wallet supports contract simulation.

### Patch Changes

- [#3858](https://github.com/wevm/wagmi/pull/3858) [`0d141f17`](https://github.com/wevm/wagmi/commit/0d141f171d6ec44bcbfc9c876565b5e2fb8af6de) Thanks [@yulafezmesi](https://github.com/yulafezmesi)! - Fixed accessing reverted reason property inside `waitForTransactionReceipt`.

## 2.7.0

### Minor Changes

- [#3857](https://github.com/wevm/wagmi/pull/3857) [`d4274c03`](https://github.com/wevm/wagmi/commit/d4274c03a6af5f2d26d31432016ebc14950a330e) Thanks [@tmm](https://github.com/tmm)! - Added `addEthereumChainParameter` to `switchChain`-related methods.

### Patch Changes

- [#3849](https://github.com/wevm/wagmi/pull/3849) [`4781a405`](https://github.com/wevm/wagmi/commit/4781a4056d4ffc2c74f96a75429e9b2cd2417ad8) Thanks [@tmm](https://github.com/tmm)! - Fixed `shimDisconnect: false` behavior.

- [#3859](https://github.com/wevm/wagmi/pull/3859) [`400c960b`](https://github.com/wevm/wagmi/commit/400c960b30d701c134850c695ae903a382c29b5b) Thanks [@holic](https://github.com/holic)! - Added workaround to injected connector for MetaMask bug, where chain switching does not work if target chain RPC `'net_version'` request fails.

## 2.6.19

### Patch Changes

- [`e3c832a1`](https://github.com/wevm/wagmi/commit/e3c832a12c301f9b0ee129d877b3101d220ba8b2) Thanks [@jxom](https://github.com/jxom)! - Fixed undefined `navigator` issue in MetaMask connector.

## 2.6.18

### Patch Changes

- [#3848](https://github.com/wevm/wagmi/pull/3848) [`dd40a41c`](https://github.com/wevm/wagmi/commit/dd40a41c526ab60a288aff2250ed8dba92a27b16) Thanks [@jxom](https://github.com/jxom)! - Updated MetaMask SDK.

## 2.6.17

### Patch Changes

- [#3822](https://github.com/wevm/wagmi/pull/3822) [`a97bfbae`](https://github.com/wevm/wagmi/commit/a97bfbaeb615cfef04665e5e7348d85d17f960f0) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where Wagmi would not correctly rehydrate the active chain when a persisted store was being used.

## 2.6.16

### Patch Changes

- [#3788](https://github.com/wevm/wagmi/pull/3788) [`42ad380d`](https://github.com/wevm/wagmi/commit/42ad380d9a5d8bc0f61d73612142dea9d098de5e) Thanks [@tmm](https://github.com/tmm)! - Refactored connectors to remove unnecessarily event listeners.

## 2.6.15

### Patch Changes

- [#3782](https://github.com/wevm/wagmi/pull/3782) [`b907d5ac`](https://github.com/wevm/wagmi/commit/b907d5ac3a746bcbccc06d1fe78c5bd8f9a7d685) Thanks [@jxom](https://github.com/jxom)! - Refactored injected connector connection logic.

## 2.6.14

### Patch Changes

- [#3777](https://github.com/wevm/wagmi/pull/3777) [`b3b54ef1`](https://github.com/wevm/wagmi/commit/b3b54ef179c5fa0d1694d38d4b808549a0550409) Thanks [@desfero](https://github.com/desfero)! - Fixed `writeContract` to forward `chainIn` when simulating contract call

- [#3779](https://github.com/wevm/wagmi/pull/3779) [`3da20bb8`](https://github.com/wevm/wagmi/commit/3da20bb80e7c3efeef8227ced66ad615370fc242) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `eth_requestAccounts` would be called upon reconnect instead of `eth_accounts`.

- [`a3d1858f`](https://github.com/wevm/wagmi/commit/a3d1858fce448d2b70e36ee692ef1589b74e9d3f) Thanks [@jxom](https://github.com/jxom)! - Fixed hydration conditional in `createConfig`.

## 2.6.13

### Patch Changes

- [`b80236dc`](https://github.com/wevm/wagmi/commit/b80236dc623095fe8f1e1d10957d7776fb6ab48b) Thanks [@jxom](https://github.com/jxom)! - Removed unneeded `uniqueBy` check on connectors state.

## 2.6.12

### Patch Changes

- [#3763](https://github.com/wevm/wagmi/pull/3763) [`a59069e9`](https://github.com/wevm/wagmi/commit/a59069e9fab45dd606bb89a7f829fe94c51a5494) Thanks [@tmm](https://github.com/tmm)! - Fixed `getConnectorClient` internal address comparison.

- [#3608](https://github.com/wevm/wagmi/pull/3608) [`0acd3132`](https://github.com/wevm/wagmi/commit/0acd31320f534993af566be5490c2978b6184f66) Thanks [@mqklin](https://github.com/mqklin)! - Disabled `wallet_requestPermissions` prompt when `shimDisconnect` is `false`.

## 2.6.11

### Patch Changes

- [`e1ca4e63`](https://github.com/wevm/wagmi/commit/e1ca4e637ae6cec7f5902b0a2c0e0efc3b751a1d) Thanks [@tmm](https://github.com/tmm)! - Deprecated `normalizeChainId`. Use `Number` instead.

## 2.6.10

### Patch Changes

- [`dbdca8fd`](https://github.com/wevm/wagmi/commit/dbdca8fd14b90c166222a66a373c1b33c06ce019) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where duplicate connectors could be instantiated if injected after page mount.

## 2.6.9

### Patch Changes

- [#3715](https://github.com/wevm/wagmi/pull/3715) [`d56edf4f`](https://github.com/wevm/wagmi/commit/d56edf4f27c52acc7a0f57114454b0d3e22cacd6) Thanks [@jxom](https://github.com/jxom)! - Fixed SSR hydration issues.

## 2.6.8

### Patch Changes

- [#3643](https://github.com/wevm/wagmi/pull/3643) [`e46bcd47`](https://github.com/wevm/wagmi/commit/e46bcd4738a18da15b53f6612b614379c1985374) Thanks [@TateB](https://github.com/TateB)! - Fixed race condition arising from `reconnect`.

## 2.6.7

### Patch Changes

- [#3642](https://github.com/wevm/wagmi/pull/3642) [`b479b5e8`](https://github.com/wevm/wagmi/commit/b479b5e8a5866cba792862f22e6352c4fb566137) Thanks [@johanneskares](https://github.com/johanneskares)! - Fixed a bug where minification caused the wrong functions to be called on the client.

- [`f5648dd2`](https://github.com/wevm/wagmi/commit/f5648dd28b3576b628f57732b89287f55acbb1c1) Thanks [@jxom](https://github.com/jxom)! - Updated `prepareTransactionRequest` types for `viem@2.8.0`.

- [`1c1fee6a`](https://github.com/wevm/wagmi/commit/1c1fee6ab8f01f7734ac6ce05093fa8e388beb3e) Thanks [@jxom](https://github.com/jxom)! - Updated `@walletconnect/ethereum-provider`.

- [#3653](https://github.com/wevm/wagmi/pull/3653) [`88a2d744`](https://github.com/wevm/wagmi/commit/88a2d744a1315908c9e54156026df3ad2435ad44) Thanks [@tash-2s](https://github.com/tash-2s)! - Fixed error occurring when adding chains without explorers to MetaMask.

## 2.6.6

### Patch Changes

- [#3644](https://github.com/wevm/wagmi/pull/3644) [`a91c0b64`](https://github.com/wevm/wagmi/commit/a91c0b64ba8b3e6537a560e69724eb601f26af27) Thanks [@nishuzumi](https://github.com/nishuzumi)! - Exported types

## 2.6.5

### Patch Changes

- [#3580](https://github.com/wevm/wagmi/pull/3580) [`c677dcd2`](https://github.com/wevm/wagmi/commit/c677dcd245dccdf69289a3d66dded237b09570a2) Thanks [@tmm](https://github.com/tmm)! - Updated internals.

## 2.6.4

### Patch Changes

- [#3571](https://github.com/wevm/wagmi/pull/3571) [`7c6618e6`](https://github.com/wevm/wagmi/commit/7c6618e6a0eb1ff39cf8f66b34d3ddc14be538fe) Thanks [@tmm](https://github.com/tmm)! - Fixed `getClient` passthrough properties from `createConfig`.

- [#3558](https://github.com/wevm/wagmi/pull/3558) [`895f28e8`](https://github.com/wevm/wagmi/commit/895f28e873af7c8eda5ca85734ff67c8979fd950) Thanks [@tmm](https://github.com/tmm)! - Fixed connector warnings.

## 2.6.3

### Patch Changes

- [#3533](https://github.com/wevm/wagmi/pull/3533) [`9c3b85dd`](https://github.com/wevm/wagmi/commit/9c3b85dd0a9a4a593e1d7e029345275735330e32) Thanks [@tmm](https://github.com/tmm)! - Fixed `account` property passthrough for actions.

- [`2a72214a`](https://github.com/wevm/wagmi/commit/2a72214a2901d6b6ddd39f80238aa0bd4db670a7) Thanks [@tmm](https://github.com/tmm)! - Shimmed EIP-1193 `removeListener` for injected since some wallets do not follow spec.

## 2.6.2

### Patch Changes

- [#3519](https://github.com/wevm/wagmi/pull/3519) [`414eb048`](https://github.com/wevm/wagmi/commit/414eb048af492caac70c0e874dfc87c30702804a) Thanks [@tmm](https://github.com/tmm)! - Fixed multicall passing through all properties to Viem method.

- [#3518](https://github.com/wevm/wagmi/pull/3518) [`338e857d`](https://github.com/wevm/wagmi/commit/338e857d8cb2fe85e13d9207bef14cada1c1962d) Thanks [@tmm](https://github.com/tmm)! - Fixed internal store migration between versions.

## 2.6.1

### Patch Changes

- [#3510](https://github.com/wevm/wagmi/pull/3510) [`660ff80d`](https://github.com/wevm/wagmi/commit/660ff80d5b046967a446eba43ee54b8359a37d0d) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where connectors returning multiple addresses didn't checksum correctly.

- [#3433](https://github.com/wevm/wagmi/pull/3433) [`101a7dd1`](https://github.com/wevm/wagmi/commit/101a7dd131b0cae2dc25579ecab9044290efd37b) Thanks [@tmm](https://github.com/tmm)! - Fixed `getClient` and `getPublicClient` throwing when used with unconfigured `chainId`.

## 2.6.0

### Minor Changes

- [#3496](https://github.com/wevm/wagmi/pull/3496) [`ba7f8a75`](https://github.com/wevm/wagmi/commit/ba7f8a758efb07664c6e401b5e7e325e7c62341b) Thanks [@tmm](https://github.com/tmm)! - Updated action internals to resolve Viem Client actions.

## 2.5.0

### Minor Changes

- [#3461](https://github.com/wevm/wagmi/pull/3461) [`ca98041d`](https://github.com/wevm/wagmi/commit/ca98041d1b39893d90246929485f4db0d1c6f9f7) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `getTransactionConfirmations` action.

## 2.4.0

### Minor Changes

- [#3427](https://github.com/wevm/wagmi/pull/3427) [`370f1b4a`](https://github.com/wevm/wagmi/commit/370f1b4a3f154d181acf381c31c2e7862e22c0e4) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `prepareTransactionRequest` action.

## 2.3.1

### Patch Changes

- [#3476](https://github.com/wevm/wagmi/pull/3476) [`3be5bb7b`](https://github.com/wevm/wagmi/commit/3be5bb7b0b38646e12e6da5c762ef74dff66bcc2) Thanks [@jxom](https://github.com/jxom)! - Modified persist strategy to only store "critical" properties that are needed before hydration.

## 2.3.0

### Minor Changes

- [#3459](https://github.com/wevm/wagmi/pull/3459) [`d950b666`](https://github.com/wevm/wagmi/commit/d950b666b56700ca039ce16cdfdf34564991e7f5) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `getEnsText` action.

### Patch Changes

- [#3467](https://github.com/wevm/wagmi/pull/3467) [`90ef39bb`](https://github.com/wevm/wagmi/commit/90ef39bb0f4ecb3c914d317875348e35ba0f4524) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where connectors that share the same provider instance could reconnect when they have never been connected before.

- [`1cfb6e5a`](https://github.com/wevm/wagmi/commit/1cfb6e5a875e707abcee00dd5739e87da05e8c90) Thanks [@jxom](https://github.com/jxom)! - Bumped listener limit on WalletConnect connector.

## 2.2.1

### Patch Changes

- [#3447](https://github.com/wevm/wagmi/pull/3447) [`a02a26ad`](https://github.com/wevm/wagmi/commit/a02a26ad030d3afb78f744377d61b5c60b65d97a) Thanks [@tmm](https://github.com/tmm)! - Fixed account typing.

- [#3443](https://github.com/wevm/wagmi/pull/3443) [`007024a6`](https://github.com/wevm/wagmi/commit/007024a684ddbecf924cdc06dd6a8854fc3d5eeb) Thanks [@jmrossy](https://github.com/jmrossy)! - Fixed invalid `chainId` parameter passed through actions to Viem.

## 2.2.0

### Minor Changes

- [#3434](https://github.com/wevm/wagmi/pull/3434) [`00bf10a4`](https://github.com/wevm/wagmi/commit/00bf10a428b0d1c5dac35ebf25b19571e033ac26) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `getBytecode` and `getStorageAt` actions.

- [#3416](https://github.com/wevm/wagmi/pull/3416) [`64c073f6`](https://github.com/wevm/wagmi/commit/64c073f6c2720961e2d6aff986670b73dbfab9c3) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `getTransactionReceipt` action.

- [#3408](https://github.com/wevm/wagmi/pull/3408) [`fb6c4148`](https://github.com/wevm/wagmi/commit/fb6c4148d9e9e2fccfbe74c8f343b444dc68dec5) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `getProof` action.

## 2.1.2

### Patch Changes

- [#3407](https://github.com/wevm/wagmi/pull/3407) [`e00b8205`](https://github.com/wevm/wagmi/commit/e00b82058685751637edfa9a6b2d196a12549fe7) Thanks [@jxom](https://github.com/jxom)! - Added a prelude gas estimate check to `sendTransaction`/`useSendTransaction`.

## 2.1.1

### Patch Changes

- [#3402](https://github.com/wevm/wagmi/pull/3402) [`64b82282`](https://github.com/wevm/wagmi/commit/64b82282c1e57e77c25aa0814673780e4d11edd4) Thanks [@Songkeys](https://github.com/Songkeys)! - Fixed SSR cookie support for cookies that have special characters, e.g. `=`.

- [`ec0d8b41`](https://github.com/wevm/wagmi/commit/ec0d8b4112181fefb11025e436a94a6114761d37) Thanks [@tmm](https://github.com/tmm)! - Added note to `metaMask` connector.

## 2.1.0

### Minor Changes

- [#3387](https://github.com/wevm/wagmi/pull/3387) [`c9cd302e`](https://github.com/wevm/wagmi/commit/c9cd302e1c65c980deaee2e12567c2a8ec08b399) Thanks [@marthendalnunes](https://github.com/marthendalnunes)! - Added `call` action.

## 2.0.2

### Patch Changes

- [#3384](https://github.com/wevm/wagmi/pull/3384) [`ee868c33`](https://github.com/wevm/wagmi/commit/ee868c3385dae511230b6ddcb5627c1293cc1844) Thanks [@tmm](https://github.com/tmm)! - Fixed connectors not bubbling error when connecting with `chainId` and subsequent user rejection.

## 2.0.1

### Major Changes

- [#3333](https://github.com/wevm/wagmi/pull/3333) [`b3a0baaa`](https://github.com/wevm/wagmi/commit/b3a0baaaee7decf750d376aab2502cd33ca4825a) Thanks [@tmm](https://github.com/tmm)! - Wagmi Core 2.0 featuring:

  - Full TanStack Query support + queryKeys
  - Connect multiple connectors
  - Switch chains while disconnected
  - EIP-6963 enabled
  - Strongly typed chainId and chain properties
  - Smaller bundle size
  - Miscellaneous improvements and bug fixes

  [Breaking Changes & Migration Guide](https://wagmi.sh/core/guides/migrate-from-v1-to-v2)

## 1.4.13

### Patch Changes

- Updated dependencies [[`bbbbf587`](https://github.com/wevm/wagmi/commit/bbbbf587e41bae12b072b7a7c897d580fc07cd2b)]:
  - @wagmi/connectors@3.1.11

## 1.4.12

### Patch Changes

- [`53ca1f7e`](https://github.com/wevm/wagmi/commit/53ca1f7eb411d912e11fcce7e03bd61ed067959c) Thanks [@tmm](https://github.com/tmm)! - Removed LedgerConnector due to security vulnerability

- Updated dependencies [[`53ca1f7e`](https://github.com/wevm/wagmi/commit/53ca1f7eb411d912e11fcce7e03bd61ed067959c)]:
  - @wagmi/connectors@3.1.10

## 1.4.11

### Patch Changes

- [#3299](https://github.com/wevm/wagmi/pull/3299) [`b02020b3`](https://github.com/wevm/wagmi/commit/b02020b3724e0228198f35817611bb063295906e) Thanks [@dasanra](https://github.com/dasanra)! - Fixed issue with [Safe SDK](https://github.com/wevm/viem/issues/579) by bumping `@safe-global/safe-apps-provider@0.18.1`

- Updated dependencies [[`51eca0fb`](https://github.com/wevm/wagmi/commit/51eca0fbaea6932f31a5b8b4213f0252280053e2), [`b02020b3`](https://github.com/wevm/wagmi/commit/b02020b3724e0228198f35817611bb063295906e)]:
  - @wagmi/connectors@3.1.9

## 1.4.10

### Patch Changes

- Updated dependencies [[`e8f7bcbc`](https://github.com/wevm/wagmi/commit/e8f7bcbcd9c038a901c29e71769682c088efe2ac)]:
  - @wagmi/connectors@3.1.8

## 1.4.9

### Patch Changes

- [#3276](https://github.com/wevm/wagmi/pull/3276) [`83223a06`](https://github.com/wevm/wagmi/commit/83223a0659e2f675d897a1d3374c7af752c16abf) Thanks [@glitch-txs](https://github.com/glitch-txs)! - Removed required namespaces from WalletConnect connector

- Updated dependencies [[`83223a06`](https://github.com/wevm/wagmi/commit/83223a0659e2f675d897a1d3374c7af752c16abf)]:
  - @wagmi/connectors@3.1.7

## 1.4.8

### Patch Changes

- Updated dependencies [[`cc7e18f2`](https://github.com/wevm/wagmi/commit/cc7e18f2e7f6b8b989f60f0b05aee70e996a9975), [`cc7e18f2`](https://github.com/wevm/wagmi/commit/cc7e18f2e7f6b8b989f60f0b05aee70e996a9975)]:
  - @wagmi/connectors@3.1.6

## 1.4.7

### Patch Changes

- Updated dependencies [[`a1950449`](https://github.com/wagmi-dev/wagmi/commit/a1950449127ddf72fff8ecd1fc34c3690befbb05)]:
  - @wagmi/connectors@3.1.5

## 1.4.6

### Patch Changes

- Updated dependencies [[`4e6ec415`](https://github.com/wagmi-dev/wagmi/commit/4e6ec4151baece94e940e227e0e3711c7f8534d9)]:
  - @wagmi/connectors@3.1.4

## 1.4.5

### Patch Changes

- Updated dependencies [[`e78aa337`](https://github.com/wagmi-dev/wagmi/commit/e78aa337c454f04b41a3cbd381d25270dd4a0afd)]:
  - @wagmi/connectors@3.1.3

## 1.4.4

### Patch Changes

- [#3125](https://github.com/wagmi-dev/wagmi/pull/3125) [`725e73fe`](https://github.com/wagmi-dev/wagmi/commit/725e73feb9143dbaa6d540bb76d2009cef29da0b) Thanks [@lukasrosario](https://github.com/lukasrosario)! - Fixed an issue where `dataSuffix` was not being passed down into viem's `simulateContract`, causing the data to be omitted from requests.

## 1.4.3

### Patch Changes

- [#3076](https://github.com/wagmi-dev/wagmi/pull/3076) [`4c36831b`](https://github.com/wagmi-dev/wagmi/commit/4c36831b7aa44d03b5c0decf64dcd20faae28a67) Thanks [@jxom](https://github.com/jxom)! - Pass `chain` to viem `sendTransaction`/`writeContract`.

- [#3006](https://github.com/wagmi-dev/wagmi/pull/3006) [`f2ddce23`](https://github.com/wagmi-dev/wagmi/commit/f2ddce23324aff0a91e066100918dac552dc3b4a) Thanks [@jxom](https://github.com/jxom)! - Changed `normalize` to a dynamic import.

## 1.4.2

### Patch Changes

- Updated dependencies [[`3aaba328`](https://github.com/wagmi-dev/wagmi/commit/3aaba32808ddb4035ec885f96992c91078056715)]:
  - @wagmi/connectors@3.1.2

## 1.4.1

### Patch Changes

- Updated dependencies [[`bf831bb3`](https://github.com/wagmi-dev/wagmi/commit/bf831bb30df8037cc4312342d0fe3c045408c2fe)]:
  - @wagmi/connectors@3.1.1

## 1.4.0

### Minor Changes

- [#2956](https://github.com/wagmi-dev/wagmi/pull/2956) [`2abeb285`](https://github.com/wagmi-dev/wagmi/commit/2abeb285674af3e539cc2550b1f5027b1eb0c895) Thanks [@tmm](https://github.com/tmm)! - Replaced `@wagmi/chains` with `viem/chains`.

### Patch Changes

- Updated dependencies [[`2abeb285`](https://github.com/wagmi-dev/wagmi/commit/2abeb285674af3e539cc2550b1f5027b1eb0c895)]:
  - @wagmi/connectors@3.1.0

## 1.3.10

### Patch Changes

- [`557e6400`](https://github.com/wagmi-dev/wagmi/commit/557e6400b9cef3b2c5131739143956c37d7c934a) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.9

### Patch Changes

- [`247c5d11`](https://github.com/wagmi-dev/wagmi/commit/247c5d113e83acf3a6894264c00d4b125d455107) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.8

### Patch Changes

- [#2741](https://github.com/wagmi-dev/wagmi/pull/2741) [`5b1453d9`](https://github.com/wagmi-dev/wagmi/commit/5b1453d95973ed51f1c235a919fffb707eab9b70) Thanks [@jxom](https://github.com/jxom)! - Updated references

## 1.3.7

### Patch Changes

- [#2700](https://github.com/wagmi-dev/wagmi/pull/2700) [`30118e97`](https://github.com/wagmi-dev/wagmi/commit/30118e979b1b00302e035f31f58c15d1aed911d5) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.6

### Patch Changes

- [`7ad2fdb8`](https://github.com/wagmi-dev/wagmi/commit/7ad2fdb81c7734d0c8107670800c68390e3bad99) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.5

### Patch Changes

- [`aab63fc1`](https://github.com/wagmi-dev/wagmi/commit/aab63fc1f8949004573978ecd8574fada3360758) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.4

### Patch Changes

- [`22246d98`](https://github.com/wagmi-dev/wagmi/commit/22246d9884277d28ccad6ca2d9529b96b67d47fc) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.3

### Patch Changes

- [`1946aa43`](https://github.com/wagmi-dev/wagmi/commit/1946aa43a65b684ef41b7b4c43c67bf29c13e854) Thanks [@jxom](https://github.com/jxom)! - Updated references

## 1.3.2

### Patch Changes

- [`e86d0940`](https://github.com/wagmi-dev/wagmi/commit/e86d09409bb20b64d24e1263abcf0291314f03c7) Thanks [@jxom](https://github.com/jxom)! - Updated references

## 1.3.1

### Patch Changes

- [`964042fa`](https://github.com/wagmi-dev/wagmi/commit/964042fa94d682977923c595820c58283fb9244a) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.3.0

### Minor Changes

- [#2619](https://github.com/wagmi-dev/wagmi/pull/2619) [`0d79748c`](https://github.com/wagmi-dev/wagmi/commit/0d79748cec2b6ac2410ad2c9816cc662f2b70962) Thanks [@jxom](https://github.com/jxom)! - Updated references:
  - Updated `@safe-global/safe-apps-sdk` to `^8.0.0` (the one with `viem` support)

## 1.2.2

### Patch Changes

- [#2611](https://github.com/wagmi-dev/wagmi/pull/2611) [`6d1ed7a1`](https://github.com/wagmi-dev/wagmi/commit/6d1ed7a156729b4df5d66fef3ae9a8b5762a2d34) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.2.1

### Patch Changes

- [#2589](https://github.com/wagmi-dev/wagmi/pull/2589) [`9680c347`](https://github.com/wagmi-dev/wagmi/commit/9680c347476500d28ceca20d23eeaed7931cb6e0) Thanks [@jxom](https://github.com/jxom)! - Fixed `writeContract` parameters to be compatible with `prepareWriteContract`.

- [#2587](https://github.com/wagmi-dev/wagmi/pull/2587) [`cfff9994`](https://github.com/wagmi-dev/wagmi/commit/cfff999459384ac644ff7e62f53a7b787cf37507) Thanks [@jxom](https://github.com/jxom)! - Updated references

## 1.2.0

### Minor Changes

- [#2536](https://github.com/wagmi-dev/wagmi/pull/2536) [`85e9760a`](https://github.com/wagmi-dev/wagmi/commit/85e9760a140cb169ac6236d9466b96e2105dd193) Thanks [@tmm](https://github.com/tmm)! - Changed `Address` type import from ABIType to viem.

### Patch Changes

- [#2539](https://github.com/wagmi-dev/wagmi/pull/2539) [`96319c64`](https://github.com/wagmi-dev/wagmi/commit/96319c640b9d07b375821c08a5c213355d8c290b) Thanks [@jxom](https://github.com/jxom)! - Updated references

## 1.1.1

### Patch Changes

- [`02b98a9f`](https://github.com/wagmi-dev/wagmi/commit/02b98a9f9b2c503a47af4a8967e0202b5db21787) Thanks [@jxom](https://github.com/jxom)! - Updated `viem` peer dependency.

- [`02b98a9f`](https://github.com/wagmi-dev/wagmi/commit/02b98a9f9b2c503a47af4a8967e0202b5db21787) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.1.0

### Minor Changes

- [#2482](https://github.com/wagmi-dev/wagmi/pull/2482) [`8764b54a`](https://github.com/wagmi-dev/wagmi/commit/8764b54aab68020063946112e8fe52aff650c99c) Thanks [@tmm](https://github.com/tmm)! - Bumped minimum TypeScript version to v5.0.4.

### Patch Changes

- [#2484](https://github.com/wagmi-dev/wagmi/pull/2484) [`3adf1f4f`](https://github.com/wagmi-dev/wagmi/commit/3adf1f4feab863cb7b5d52c81ad46f7e4eb56f09) Thanks [@jxom](https://github.com/jxom)! - Updated `abitype` to 0.8.7

- [#2484](https://github.com/wagmi-dev/wagmi/pull/2484) [`3adf1f4f`](https://github.com/wagmi-dev/wagmi/commit/3adf1f4feab863cb7b5d52c81ad46f7e4eb56f09) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.0.8

### Patch Changes

- [#2441](https://github.com/wagmi-dev/wagmi/pull/2441) [`326edee4`](https://github.com/wagmi-dev/wagmi/commit/326edee4bc85db84a7a4e3768e33785849ab8d8e) Thanks [@tmm](https://github.com/tmm)! - Fixed internal type issue

## 1.0.7

### Patch Changes

- [#2433](https://github.com/wagmi-dev/wagmi/pull/2433) [`54fcff5f`](https://github.com/wagmi-dev/wagmi/commit/54fcff5f02f6933bbbe045ee0c83c5a78b6bba49) Thanks [@jxom](https://github.com/jxom)! - Added ability to pass an `account` to `writeContract`/`prepareWriteContract`.

## 1.0.6

### Patch Changes

- [`ca2e1e96`](https://github.com/wagmi-dev/wagmi/commit/ca2e1e96149b87a7dc42c9db07e1f1ad2bb02c4a) Thanks [@jxom](https://github.com/jxom)! - Updated references.

- [#2401](https://github.com/wagmi-dev/wagmi/pull/2401) [`0f9dc875`](https://github.com/wagmi-dev/wagmi/commit/0f9dc875e90cfdd7a2028e04b7204caf9ea313b2) Thanks [@jxom](https://github.com/jxom)! - Exposed `account` on `readContract`/`useContractRead`.

## 1.0.5

### Patch Changes

- [`90e2b3b3`](https://github.com/wagmi-dev/wagmi/commit/90e2b3b39efe0585fe28645ac2264109be17362a) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.0.4

### Patch Changes

- [#2344](https://github.com/wagmi-dev/wagmi/pull/2344) [`8a725458`](https://github.com/wagmi-dev/wagmi/commit/8a72545853ae1024acd9efd18c06142e8c6c5750) Thanks [@jxom](https://github.com/jxom)! - Added gas estimation back into `prepareSendTransaction`.

## 1.0.3

### Patch Changes

- [#2338](https://github.com/wagmi-dev/wagmi/pull/2338) [`92bfdc2c`](https://github.com/wagmi-dev/wagmi/commit/92bfdc2c744539558ba93c95f140b46ad331cee4) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where synchronous switch chain behavior (WalletConnect v2) would encounter chain id race conditions in `watchWalletClient`.

## 1.0.2

### Patch Changes

- [#2304](https://github.com/wevm/wagmi/pull/2304) [`09a4fd38`](https://github.com/wevm/wagmi/commit/09a4fd38f44eb176797925fd85314be17b610cd4) Thanks [@jxom](https://github.com/jxom)! - Removed assert chain workaround.

## 1.0.1

### Patch Changes

- [`ea651cd7`](https://github.com/wevm/wagmi/commit/ea651cd7fc75b7866272605467db11fd6e1d81af) Thanks [@jxom](https://github.com/jxom)! - Downgraded abitype.

- Updated dependencies [[`ea651cd7`](https://github.com/wevm/wagmi/commit/ea651cd7fc75b7866272605467db11fd6e1d81af)]:
  - @wagmi/connectors@1.0.1

## 1.0.0

### Major Changes

- [#2235](https://github.com/wevm/wagmi/pull/2235) [`5be0655c`](https://github.com/wevm/wagmi/commit/5be0655c8e48b25d38009022461fbf611af54349) Thanks [@jxom](https://github.com/jxom)! - Released v1. Read [Migration Guide](https://next.wagmi.sh/react/migration-guide#1xx-breaking-changes).

## 1.0.0-next.7

### Major Changes

- [#2235](https://github.com/wevm/wagmi/pull/2235) [`708b2ce2`](https://github.com/wevm/wagmi/commit/708b2ce26efa8d3d910806a97cea5171dabc65de) Thanks [@jxom](https://github.com/jxom)! - Added `config.setPublicClient` & `config.setWebSocketPublicClient`

- Updated references.

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@1.0.0-next.5

## 1.0.0-next.6

### Major Changes

- [#2235](https://github.com/wevm/wagmi/pull/2235) [`708b2ce2`](https://github.com/wevm/wagmi/commit/708b2ce26efa8d3d910806a97cea5171dabc65de) Thanks [@jxom](https://github.com/jxom)! - Added `config.setPublicClient` & `config.setWebSocketPublicClient`

- Added `config.setConnectors`

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@1.0.0-next.6

## 1.0.0-next.5

### Major Changes

- [#2235](https://github.com/wevm/wagmi/pull/2235) [`708b2ce2`](https://github.com/wevm/wagmi/commit/708b2ce26efa8d3d910806a97cea5171dabc65de) Thanks [@jxom](https://github.com/jxom)! - Added `config.setPublicClient` & `config.setWebSocketPublicClient`

## 1.0.0-next.4

### Major Changes

- Updated viem.
  Removed `goerli` export from main entrypoint.

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@1.0.0-next.5

## 1.0.0-next.3

### Major Changes

- Updated references.

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@1.0.0-next.4

## 1.0.0-next.2

### Major Changes

- **Breaking:** Renamed `createClient` to `createConfig`
- **Breaking:** Renamed `getClient` to `getConfig`
- **Breaking:** Removed `request` as an argument to `prepareSendTransaction` & `sendTransaction`. Arguments now belong on the root level of the Action.

### Patch Changes

- Updated dependencies []:
  - @wagmi/chains@1.0.0-next.0
  - @wagmi/connectors@1.0.0-next.3

## 1.0.0-next.1

### Major Changes

- updated viem

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@1.0.0-next.2

## 1.0.0-next.0

### Major Changes

- [`a7dda00c`](https://github.com/wevm/wagmi/commit/a7dda00c5b546f8b2c42b527e4d9ac1b9e9ab1fb) Thanks [@jxom](https://github.com/jxom)! - Released v1.

### Patch Changes

- Updated dependencies [[`a7dda00c`](https://github.com/wevm/wagmi/commit/a7dda00c5b546f8b2c42b527e4d9ac1b9e9ab1fb)]:
  - @wagmi/connectors@1.0.0-next.1

## 0.10.11

### Patch Changes

- [#2270](https://github.com/wevm/wagmi/pull/2270) [`6d1fa9df`](https://github.com/wevm/wagmi/commit/6d1fa9df790287729c3b33d4f01fd23c2f8153f1) Thanks [@jxom](https://github.com/jxom)! - Updated references.

- Updated dependencies []:
  - @wagmi/connectors@0.3.19

## 0.10.10

### Patch Changes

- [#2208](https://github.com/wevm/wagmi/pull/2208) [`cfc696d8`](https://github.com/wevm/wagmi/commit/cfc696d83c6f768a2e1a29c5197efeed7f1d40a1) Thanks [@bangtoven](https://github.com/bangtoven)! - Bumped references to apply coinbase wallet sdk updates

- Updated dependencies []:
  - @wagmi/connectors@0.3.16

## 0.10.9

### Patch Changes

- [#2143](https://github.com/wevm/wagmi/pull/2143) [`26dc5326`](https://github.com/wevm/wagmi/commit/26dc53260fde1d3278018c0b20a6d48a093d9427) Thanks [@tmm](https://github.com/tmm)! - Exported Sepolia Chain.

- [#2146](https://github.com/wevm/wagmi/pull/2146) [`21b6842e`](https://github.com/wevm/wagmi/commit/21b6842e8c296a0bbe71ebe0780d898abc4cf4a8) Thanks [@tmm](https://github.com/tmm)! - Bumped references

- Updated dependencies []:
  - @wagmi/connectors@0.3.12

## 0.10.8

### Patch Changes

- [#2099](https://github.com/wevm/wagmi/pull/2099) [`f1fee5b3`](https://github.com/wevm/wagmi/commit/f1fee5b30a1bd13b5e66118bf9cdc44b0dc003a1) Thanks [@jxom](https://github.com/jxom)! - Added chains:

  - `nexi`
  - `polygonZkEvm`
  - `xdc`
  - `xdcTestnet`

- [#2085](https://github.com/wevm/wagmi/pull/2085) [`7d64e3f5`](https://github.com/wevm/wagmi/commit/7d64e3f538a6149777bfa84ea9435769b2a7db58) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where multicall would not throw if the target chain was not configured on the wagmi client.

- Updated dependencies []:
  - @wagmi/connectors@0.3.10

## 0.10.7

### Patch Changes

- [#2082](https://github.com/wevm/wagmi/pull/2082) [`2ccc8a25`](https://github.com/wevm/wagmi/commit/2ccc8a255e93f0a2bb7b22101656b3905ec59abd) Thanks [@jxom](https://github.com/jxom)! - Updated references.

- Updated dependencies []:
  - @wagmi/connectors@0.3.10

## 0.10.6

### Patch Changes

- [#2056](https://github.com/wevm/wagmi/pull/2056) [`944f6513`](https://github.com/wevm/wagmi/commit/944f6513adf09a6f0b3bd34f591d3bbd1f1ffd2e) Thanks [@tmm](https://github.com/tmm)! - Bumped references.

- Updated dependencies []:
  - @wagmi/connectors@0.3.8

## 0.10.5

### Patch Changes

- [#2053](https://github.com/wevm/wagmi/pull/2053) [`665df1bf`](https://github.com/wevm/wagmi/commit/665df1bf2afccb533102069def395e19fb7194dd) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where you add a new chain to MetaMask, but the switch after is rejected.

- Updated dependencies []:
  - @wagmi/connectors@0.3.7

## 0.10.4

### Patch Changes

- [#2046](https://github.com/wevm/wagmi/pull/2046) [`90d8e9b8`](https://github.com/wevm/wagmi/commit/90d8e9b87962b72c54311649537e91a953660f9b) Thanks [@tmm](https://github.com/tmm)! - Exported internal type.

- Updated dependencies []:
  - @wagmi/connectors@0.3.6

## 0.10.3

### Patch Changes

- [#2039](https://github.com/wevm/wagmi/pull/2039) [`bac893ab`](https://github.com/wevm/wagmi/commit/bac893ab26012d4d8741c4f80e8b8813aee26f0c) Thanks [@tmm](https://github.com/tmm)! - Updated references.

- [#2043](https://github.com/wevm/wagmi/pull/2043) [`49a58320`](https://github.com/wevm/wagmi/commit/49a58320ab5f1f13bc4de25abcc028c8335e98f0) Thanks [@tmm](https://github.com/tmm)! - Removed `InjectedConnector` `shimChainChangedDisconnect` shim (no longer necessary).

- Updated dependencies []:
  - @wagmi/connectors@0.3.6

## 0.10.2

### Patch Changes

- [#2016](https://github.com/wevm/wagmi/pull/2016) [`06bf61de`](https://github.com/wevm/wagmi/commit/06bf61dee6d2920777bd9392491e6b7aedebe7ab) Thanks [@jxom](https://github.com/jxom)! - Added chains:

  - `boba`
  - `chronos`
  - `crossbell`
  - `dfk`
  - `dogechain`
  - `flare`
  - `flareTestnet`
  - `klaytn`
  - `scrollTestnet`
  - `shardeumSphinx`
  - `skaleCalypso`
  - `skaleCalypsoTestnet`
  - `skaleChaosTestnet`
  - `skaleCryptoBlades`
  - `skaleCryptoColosseum`
  - `skaleEuropa`
  - `skaleEuropaTestnet`
  - `skaleExorde`
  - `skaleHumanProtocol`
  - `skaleNebula`
  - `skaleNebulaTestnet`
  - `skaleRazor`
  - `skaleTitan`
  - `skaleTitanTestnet`
  - `songbird`
  - `songbirdTestnet`
  - `titan`
  - `titanTestnet`
  - `wanchain`
  - `wanchainTestnet`

- [#2016](https://github.com/wevm/wagmi/pull/2016) [`06bf61de`](https://github.com/wevm/wagmi/commit/06bf61dee6d2920777bd9392491e6b7aedebe7ab) Thanks [@jxom](https://github.com/jxom)! - Updated references/ submodule.

- Updated dependencies []:
  - @wagmi/connectors@0.3.4

## 0.10.0

### Minor Changes

- [#1902](https://github.com/wevm/wagmi/pull/1902) [`0994e896`](https://github.com/wevm/wagmi/commit/0994e8966349b8811db0a5886db3831dafc99245) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** Removed the `version` config option for `WalletConnectConnector`.

  `WalletConnectConnector` now uses WalletConnect v2 by default. WalletConnect v1 is now `WalletConnectLegacyConnector`.

  ### WalletConnect v2

  ```diff
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  const connector = new WalletConnectConnector({
    options: {
  -   version: '2',
      projectId: 'abc',
    },
  })
  ```

  ### WalletConnect v1

  ```diff
  -import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
  +import { WalletConnectConnector } from 'wagmi/connectors/walletConnectLegacy'

  -const connector = new WalletConnectConnector({
  +const connector = new WalletConnectLegacyConnector({
    options: {
      qrcode: true,
    },
  })
  ```

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@0.3.2

## 0.9.7

### Patch Changes

- [#1907](https://github.com/wevm/wagmi/pull/1907) [`cc4e74ee`](https://github.com/wevm/wagmi/commit/cc4e74ee19665eccb3767052dab6ab956ff4e676) Thanks [@jxom](https://github.com/jxom)! - Added the following chains to the `wagmi/chains` entrypoint:

  - `baseGoerli`
  - `harmonyOne`
  - `polygonZkEvmTestnet`

- Updated dependencies []:
  - @wagmi/connectors@0.2.7

## 0.9.6

### Patch Changes

- [#1882](https://github.com/wevm/wagmi/pull/1882) [`282cc1b0`](https://github.com/wevm/wagmi/commit/282cc1b02003684d582cea411b11792a59c26fd0) Thanks [@tmm](https://github.com/tmm)! - Updated references.

- Updated dependencies []:
  - @wagmi/connectors@0.2.6

## 0.9.5

### Patch Changes

- [#1812](https://github.com/wevm/wagmi/pull/1812) [`c7fd7fbd`](https://github.com/wevm/wagmi/commit/c7fd7fbde6f6c69a3a9a4f89d948c4dfb1d22679) Thanks [@jxom](https://github.com/jxom)! - Added the following chains to the `wagmi/chains` entrypoint:

  - `filecoinCalibration`
  - `moonbaseAlpha`
  - `moonbeam`
  - `moonriver`

- Updated dependencies []:
  - @wagmi/connectors@0.2.5

## 0.9.4

### Patch Changes

- [#1786](https://github.com/wevm/wagmi/pull/1786) [`b173a431`](https://github.com/wevm/wagmi/commit/b173a43165c7925a4e56ce1e0327a31917e7edc5) Thanks [@tmm](https://github.com/tmm)! - Locked ethers peer dependency version to >=5.5.1 <6

- [#1787](https://github.com/wevm/wagmi/pull/1787) [`f023fd8f`](https://github.com/wevm/wagmi/commit/f023fd8f66befb78b9a4df5ca971ceaa64e37ab4) Thanks [@tmm](https://github.com/tmm)! - Added `SafeConnector`

- Updated dependencies []:
  - @wagmi/connectors@0.2.4

## 0.9.3

### Patch Changes

- [#1773](https://github.com/wevm/wagmi/pull/1773) [`9aaf1955`](https://github.com/wevm/wagmi/commit/9aaf195514d3b5f4d085c797fc5021d42a9efb6c) Thanks [@jxom](https://github.com/jxom)! - Updated `@walletconnect/universal-provider` on `WalletConnectConnector` v2.
  Added more signable methods to `WalletConnectConnector` v2.

- [#1773](https://github.com/wevm/wagmi/pull/1773) [`9aaf1955`](https://github.com/wevm/wagmi/commit/9aaf195514d3b5f4d085c797fc5021d42a9efb6c) Thanks [@jxom](https://github.com/jxom)! - Added Telos to the `wagmi/chains` entrypoint. Thanks @donnyquixotic!

- Updated dependencies []:
  - @wagmi/connectors@0.2.3

## 0.9.2

### Patch Changes

- [#1756](https://github.com/wevm/wagmi/pull/1756) [`31d06b8c`](https://github.com/wevm/wagmi/commit/31d06b8ce1e7af5e9d1a7ba57f1743b2dff7a53d) Thanks [@jxom](https://github.com/jxom)! - Added OKC Chain. Thanks @clark-cui!

- [#1756](https://github.com/wevm/wagmi/pull/1756) [`31d06b8c`](https://github.com/wevm/wagmi/commit/31d06b8ce1e7af5e9d1a7ba57f1743b2dff7a53d) Thanks [@jxom](https://github.com/jxom)! - Fixed race condition between `switchNetwork` and mutation Actions that use `chainId` (e.g. `sendTransaction`). Thanks @DanInTheD4rk!

- Updated dependencies []:
  - @wagmi/connectors@0.2.2

## 0.9.1

### Patch Changes

- [#1752](https://github.com/wevm/wagmi/pull/1752) [`144a0e76`](https://github.com/wevm/wagmi/commit/144a0e76ef4bb9ba0650b5ffb9c63f95329819a4) Thanks [@jxom](https://github.com/jxom)! - Improved `WalletConnectConnector` (v2) initialization & updated dependencies.

- [#1752](https://github.com/wevm/wagmi/pull/1752) [`144a0e76`](https://github.com/wevm/wagmi/commit/144a0e76ef4bb9ba0650b5ffb9c63f95329819a4) Thanks [@jxom](https://github.com/jxom)! - Added the following chains to the `wagmi/chains` entrypoint:

  - Aurora – thanks @salil-naik
  - Bronos – thanks @chedetinaveen
  - Canto – thanks @tster
  - Celo – thanks @aaronmgdr

- Updated dependencies []:
  - @wagmi/connectors@0.2.1

## 0.9.0

### Minor Changes

- [#1732](https://github.com/wevm/wagmi/pull/1732) [`01e21897`](https://github.com/wevm/wagmi/commit/01e2189747a5c22dc758c6d719b4145adc2a643c) Thanks [@tmm](https://github.com/tmm)! - Bumped minimum TypeScript version to typescript@>=4.9.4. TypeScript 5.0 is coming soon and has some great features we are excited to bring into wagmi. To prepare for this, update your TypeScript version to 4.9.4 or higher. There are likely no [breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#correctness-fixes-and-breaking-changes) if you are coming from typescript@4.7.x || typescript@4.8.x.

## 0.8.19

### Patch Changes

- [#1718](https://github.com/wevm/wagmi/pull/1718) [`e62b5ef8`](https://github.com/wevm/wagmi/commit/e62b5ef8aaa8063abb5264790768899ea35bbd31) Thanks [@tmm](https://github.com/tmm)! - Updated references

## 0.8.18

### Patch Changes

- [#1708](https://github.com/wevm/wagmi/pull/1708) [`07fc3801`](https://github.com/wevm/wagmi/commit/07fc3801fa13c2cb5f7cf9b86ba8320b05a6a135) Thanks [@jxom](https://github.com/jxom)! - Updated `references/` submodule.

## 0.8.17

### Patch Changes

- [#1705](https://github.com/wevm/wagmi/pull/1705) [`9ff797dc`](https://github.com/wevm/wagmi/commit/9ff797dcb979dc86b798a432b74c98598165430d) Thanks [@jxom](https://github.com/jxom)! - Added the following chains to the `@wagmi/core/chains` entrypoint:

  - `crossbell` (thanks @Songkeys)
  - `filecoin` & `filecoinHyperspace` (thanks @neil0x46dc)
  - `gnosisChiado` (thanks @theNvN)
  - `metis` & `metisGoerli` (thanks @CookedCookee)

## 0.8.16

### Patch Changes

- [#1699](https://github.com/wevm/wagmi/pull/1699) [`2f1e7950`](https://github.com/wevm/wagmi/commit/2f1e7950e55550d9b50ef5ccb97cb609f4af39b1) Thanks [@tmm](https://github.com/tmm)! - Added public RPC URL property to Chain

## 0.8.15

### Patch Changes

- [#1685](https://github.com/wevm/wagmi/pull/1685) [`917f5bc1`](https://github.com/wevm/wagmi/commit/917f5bc1fad578e35a8c6ee787e339bfdc156bab) Thanks [@jxom](https://github.com/jxom)! - Replaced qrcodemodal with web3modal for the WalletConnect v2 Connector.

## 0.8.14

### Patch Changes

- [#1646](https://github.com/wevm/wagmi/pull/1646) [`fcdbe353`](https://github.com/wevm/wagmi/commit/fcdbe3531e6d05cda4a4a511bae1ad4c9e426d88) Thanks [@jxom](https://github.com/jxom)! - Upgraded `zustand` to v4.3.1.

## 0.8.13

### Patch Changes

- [#1639](https://github.com/wevm/wagmi/pull/1639) [`c6869f06`](https://github.com/wevm/wagmi/commit/c6869f0604fffb197752a08256f31db77f52e746) Thanks [@jxom](https://github.com/jxom)! - Added `isRainbow` flag to `InjectedConnector`.

## 0.8.12

### Patch Changes

- [#1636](https://github.com/wevm/wagmi/pull/1636) [`025f6771`](https://github.com/wevm/wagmi/commit/025f6771b32ff7eed22f527be81c5141ddaf9c3d) Thanks [@DanielSinclair](https://github.com/DanielSinclair)! - Added `isRainbow` flag to injected `window.ethereum` types.

## 0.8.11

### Patch Changes

- [#1621](https://github.com/wevm/wagmi/pull/1621) [`5812b590`](https://github.com/wevm/wagmi/commit/5812b5909277bf2862cb57a31d52465b47291410) Thanks [@tmm](https://github.com/tmm)! - Bumped @wagmi/connectors

## 0.8.10

### Patch Changes

- [#1598](https://github.com/wevm/wagmi/pull/1598) [`fc10ebe6`](https://github.com/wevm/wagmi/commit/fc10ebe659dd5f3b7a8e00581f094652280a779b) Thanks [@jxom](https://github.com/jxom)! - Fixed CJS dependency version range

## 0.8.9

### Patch Changes

- [#1593](https://github.com/wevm/wagmi/pull/1593) [`216d555c`](https://github.com/wevm/wagmi/commit/216d555c62bd95c3c7c8f8e20f7269f6c8504610) Thanks [@jxom](https://github.com/jxom)! - Added CJS escape hatch bundle under the "cjs" tag.

## 0.8.8

### Patch Changes

- [#1573](https://github.com/wevm/wagmi/pull/1573) [`ef380d9c`](https://github.com/wevm/wagmi/commit/ef380d9c6d51ae0495b9c35925d2843c75d97fd4) Thanks [@tmm](https://github.com/tmm)! - Updated internal types.

## 0.8.7

### Patch Changes

- [#1570](https://github.com/wevm/wagmi/pull/1570) [`216f585b`](https://github.com/wevm/wagmi/commit/216f585be8a9e3a56e3243f49ccd54d655b5a6dd) Thanks [@wslyvh](https://github.com/wslyvh)! - Added `watchPendingTransactions`

- [#1470](https://github.com/wevm/wagmi/pull/1470) [`3a1a6c9f`](https://github.com/wevm/wagmi/commit/3a1a6c9fe5db5c360adfd116f9a03a1238b5720c) Thanks [@jxom](https://github.com/jxom)! - The `WalletConnectConnector` now supports WalletConnect v2.

  It can be enabled by setting `version` to `'2'` and supplying a [WalletConnect Cloud `projectId`](https://cloud.walletconnect.com/sign-in).

## 0.8.6

### Patch Changes

- [#1539](https://github.com/wevm/wagmi/pull/1539) [`732da004`](https://github.com/wevm/wagmi/commit/732da0042c7e28091b2e36a484ea8239971306f5) Thanks [@0xFlicker](https://github.com/0xFlicker)! - All Providers (ie. Alchemy, Infura, Public) now use the ENS Registry address on the wagmi `Chain` object (`chain.contracts.ensRegistry`).

- [#1574](https://github.com/wevm/wagmi/pull/1574) [`ecde3d10`](https://github.com/wevm/wagmi/commit/ecde3d1029ccdf90e2853ba0e9ae4f5f4ebb9c4c) Thanks [@jxom](https://github.com/jxom)! - Added the following chains:

  - `iotex`
  - `iotexTestnet`
  - `zkSync`
  - `zkSyncTestnet`

## 0.8.5

### Patch Changes

- [#1542](https://github.com/wevm/wagmi/pull/1542) [`731b3b73`](https://github.com/wevm/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Added the following chains:

  - `evmos`
  - `evmosTestnet`
  - `gnosis`

- [#1542](https://github.com/wevm/wagmi/pull/1542) [`731b3b73`](https://github.com/wevm/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Updated Goerli symbol to `"ETH"`.

- [#1542](https://github.com/wevm/wagmi/pull/1542) [`731b3b73`](https://github.com/wevm/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Updated Arbitrum Goerli RPC and Block Explorer.

- [#1542](https://github.com/wevm/wagmi/pull/1542) [`731b3b73`](https://github.com/wevm/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where connecting to MetaMask may return with a stale address.

- [#1542](https://github.com/wevm/wagmi/pull/1542) [`731b3b73`](https://github.com/wevm/wagmi/commit/731b3b733c6a093d1693d49de601705b7c730549) Thanks [@jxom](https://github.com/jxom)! - Removed ENS registry for Sepolia.

## 0.8.4

### Patch Changes

- [#1508](https://github.com/wevm/wagmi/pull/1508) [`0b50b62f`](https://github.com/wevm/wagmi/commit/0b50b62f7389619e429509a3e337e451e823b059) Thanks [@jxom](https://github.com/jxom)! - Updated `@wagmi/chains` to `0.1.3`.

- [#1504](https://github.com/wevm/wagmi/pull/1504) [`11b8b794`](https://github.com/wevm/wagmi/commit/11b8b794fbfd4a2b40f39962e2758e9fbf48cb54) Thanks [@tmm](https://github.com/tmm)! - Converted ethers custom "ACTION_REJECTED" error to standard RPC Error.

## 0.8.3

### Patch Changes

- [#1431](https://github.com/wevm/wagmi/pull/1431) [`af28f8f9`](https://github.com/wevm/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc) Thanks [@jxom](https://github.com/jxom)! - Re-export connectors from `@wagmi/connectors`

- [#1431](https://github.com/wevm/wagmi/pull/1431) [`af28f8f9`](https://github.com/wevm/wagmi/commit/af28f8f9cfc227e7c391927fdb934183edb5c2dc) Thanks [@jxom](https://github.com/jxom)! - Added `LedgerConnector` connector

## 0.8.2

### Patch Changes

- [#1442](https://github.com/wevm/wagmi/pull/1442) [`cde15289`](https://github.com/wevm/wagmi/commit/cde152899c758dea10787412b0aef669ed7202b2) Thanks [@0xproflupin](https://github.com/0xproflupin)! - Added Phantom wallet support to `InjectedConnector`

- [#1448](https://github.com/wevm/wagmi/pull/1448) [`c6075f3a`](https://github.com/wevm/wagmi/commit/c6075f3a16885d850ad2656272351f9517c9f67b) Thanks [@tmm](https://github.com/tmm)! - Updated [ABIType](https://github.com/wevm/abitype) version.

- [#1444](https://github.com/wevm/wagmi/pull/1444) [`310a8bc4`](https://github.com/wevm/wagmi/commit/310a8bc428ce4e7f68377f581b45dcdd64381cce) Thanks [@jxom](https://github.com/jxom)! - Assert that a `connector` exists before invoking the callback in `watchSigner`.

- [#1434](https://github.com/wevm/wagmi/pull/1434) [`100e2a3b`](https://github.com/wevm/wagmi/commit/100e2a3b22f4602716554487b1d98738e053be76) Thanks [@tmm](https://github.com/tmm)! - Updated `MockConnector` `chainId` behavior to default to first chain from `chains` if not provided in `options`.

## 0.8.1

### Patch Changes

- [#1437](https://github.com/wevm/wagmi/pull/1437) [`c34a3dc6`](https://github.com/wevm/wagmi/commit/c34a3dc6396e6473d9f0505fad88ec910f8f5275) Thanks [@jxom](https://github.com/jxom)! - Omitted `"EIP712Domain"` type from `signTypedData` `types` arg since ethers throws an [internal error](https://github.com/ethers-io/ethers.js/blob/c80fcddf50a9023486e9f9acb1848aba4c19f7b6/packages/hash/src.ts/typed-data.ts#L466) if you include it.

- [#1445](https://github.com/wevm/wagmi/pull/1445) [`51dd53cb`](https://github.com/wevm/wagmi/commit/51dd53cba3fe0f79fa1393270b738194577ddf54) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where the wagmi client wouldn't rehydrate the store in local storage when `autoConnect` is truthy.

## 0.8.0

### Minor Changes

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: the shape of the `Chain` type has been modified.

  #### RPC URLs

  The `rpcUrls` shape has changed to include an array of URLs, and also the transport method (`http` or `webSocket`):

  ```diff
  type Chain = {
    ...
    rpcUrls: {
  -   [key: string]: string
  +   [key: string]: {
  +     http: string[]
  +     webSocket: string[]
  +   }
    }
    ...
  }
  ```

  Note that you will also need to ensure that usage is migrated:

  ```diff
  - const rpcUrl = mainnet.rpcUrls.alchemy
  + const rpcUrl = mainnet.rpcUrls.alchemy.http[0]
  ```

  #### Contracts

  The `multicall` and `ens` attributes have been moved into the `contracts` object:

  ```diff
  type Contract = {
    address: Address
    blockCreated?: number
  }

  type Chain = {
    ...
  - multicall: Contract
  - ens: Contract
  + contracts: {
  +   multicall3: Contract
  +   ensRegistry: Contract
  + }
    ...
  }
  ```

  Note that you will also need to ensure that usage is migrated:

  ```diff
  - const multicallContract = mainnet.multicall
  + const multicallContract = mainnet.contracts.multicall3
  ```

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: Upgraded `@coinbase/wallet-sdk` peer dependency to `3.6.0`.

  **Migration steps**: Update `@coinbase/wallet-sdk` to `^3.6.0`.

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: Removed the `wait` argument on `waitForTransaction`. Use the transaction `hash` instead.

  ```diff
  const data = await waitForTransaction({
  - wait: transaction.wait
  + hash: transaction.hash
  })
  ```

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: With the introduction of the [`@wagmi/core/chains` entrypoint](/core/chains), `@wagmi/core` no longer exports the following:

  - `chain`
  - `allChains`
  - `defaultChains`
  - `defaultL2Chains`
  - `chainId`
  - `etherscanBlockExplorers`
  - `alchemyRpcUrls`, `infuraRpcUrls`, `publicRpcUrls`

  Read below for migration steps.

  #### Removed `chain`

  The `chain` export has been removed. `@wagmi/core` now only exports the `mainnet` & `goerli` chains. If you need to use an alternative chain (`polygon`, `optimism`, etc), you will need to import it from the [`@wagmi/core/chains` entrypoint](/core/chains).

  ```diff
  import {
  - chain
    configureChains
  } from '@wagmi/core'
  + import { mainnet, polygon, optimism } from '@wagmi/core/chains'

  const { ... } = configureChains(
  - [chain.mainnet, chain.polygon, chain.optimism],
  + [mainnet, polygon, optimism],
    {
      ...
    }
  )
  ```

  #### Removed `allChains`

  The `allChains` export has been removed. If you need a list of all chains, you can utilize [`@wagmi/core/chains` entrypoint](/core/chains).

  ```diff
  - import { allChains } from '@wagmi/core'
  + import * as allChains from '@wagmi/core/chains'

  const { ... } = configureChains(allChains, ...)
  ```

  #### Removed `defaultChains` & `defaultL2Chains`

  The `defaultChains` & `defaultL2Chains` exports have been removed. If you still need the `defaultChains` or `defaultL2Chains` exports, you can build them yourself:

  ```diff
  - import { defaultChains } from '@wagmi/core'
  + import { mainnet, goerli } from '@wagmi/core/chains'

  + const defaultChains = [mainnet, goerli]
  ```

  > The `defaultChains` export was previously populated with `mainnet` & `goerli`.

  ```diff
  - import { defaultL2Chains } from '@wagmi/core'
  + import {
  +   arbitrum,
  +   arbitrumGoerli,
  +   polygon,
  +   polygonMumbai,
  +   optimism,
  +   optimismGoerli
  + } from '@wagmi/core/chains'

  + const defaultL2Chains = [
  +  arbitrum,
  +  arbitrumGoerli,
  +  polygon,
  +  polygonMumbai,
  +  optimism
  +  optimismGoerli
  + ]
  ```

  > The `defaultL2Chains` export was previously populated with `arbitrum` & `optimism`.

  #### Removed `chainId`

  The `chainId` export has been removed. You can extract a chain ID from the chain itself.

  ```diff
  - import { chainId } from '@wagmi/core'
  + import { mainnet, polygon, optimism } from '@wagmi/core/chains'

  -const mainnetChainId = chainId.mainnet
  -const polygonChainId = chainId.polygon
  -const optimismChainId = chainId.optimism
  +const mainnetChainId = mainnet.chainId
  +const polygonChainId = polygon.chainId
  +const optimismChainId = optimism.chainId
  ```

  #### Removed `etherscanBlockExplorers`

  The `etherscanBlockExplorers` export has been removed. You can extract a block explorer from the chain itself.

  ```diff
  - import { etherscanBlockExplorers } from '@wagmi/core'
  + import { mainnet, polygon, optimism } from '@wagmi/core/chains'

  -const mainnetEtherscanBlockExplorer = etherscanBlockExplorers.mainnet
  -const polygonEtherscanBlockExplorer = etherscanBlockExplorers.polygon
  -const optimismEtherscanBlockExplorer = etherscanBlockExplorers.optimism
  +const mainnetEtherscanBlockExplorer = mainnet.blockExplorer
  +const polygonEtherscanBlockExplorer = polygon.blockExplorer
  +const optimismEtherscanBlockExplorer = optimism.blockExplorer
  ```

  #### Removed `alchemyRpcUrls`, `infuraRpcUrls` & `publicRpcUrls`

  The `alchemyRpcUrls`, `infuraRpcUrls` & `publicRpcUrls` exports have been removed. You can extract a RPC URL from the chain itself.

  ```diff
  - import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from '@wagmi/core'
  + import { mainnet } from '@wagmi/core/chains'

  -const mainnetAlchemyRpcUrl = alchemyRpcUrls.mainnet
  -const mainnetInfuraRpcUrl = infuraRpcUrls.mainnet
  -const mainnetOptimismRpcUrl = publicRpcUrls.mainnet
  +const mainnetAlchemyRpcUrl = mainnet.rpcUrls.alchemy
  +const mainnetInfuraRpcUrl = mainnet.rpcUrls.infura
  +const mainnetOptimismRpcUrl = mainnet.rpcUrls.optimism
  ```

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: Changed `waitForTransaction` behavior to throw an error if the transaction reverted.

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - Updated errors to use `cause` instead of `internal`

### Patch Changes

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - `waitForTransaction` now respects repriced (sped up) transactions.

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - Export `getClient`

- [#1344](https://github.com/wevm/wagmi/pull/1344) [`57a19374`](https://github.com/wevm/wagmi/commit/57a1937464a4ccf72719fc86c38d1734f6306652) Thanks [@jxom](https://github.com/jxom)! - `waitForTransaction` now throws an error for cancelled or replaced transactions.

## 0.7.9

### Patch Changes

- [#1411](https://github.com/wevm/wagmi/pull/1411) [`659be184`](https://github.com/wevm/wagmi/commit/659be1840c613ce9f7aca9ac96694c4f60da4a66) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where block invalidation was not properly disabled when setting `enabled: false`.

## 0.7.8

### Patch Changes

- [#1406](https://github.com/wevm/wagmi/pull/1406) [`4f18c450`](https://github.com/wevm/wagmi/commit/4f18c450a4d7952bfcfa6c533348ffbe55893d3c) Thanks [@tmm](https://github.com/tmm)! - Function for selecting the [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target. Defaults to `() => typeof window !== 'undefined' ? window.ethereum : undefined`.

  ```ts
  import { InjectedConnector } from "@wagmi/core/connectors/injected";

  const connector = new InjectedConnector({
    options: {
      name: "My Injected Wallet",
      getProvider: () =>
        typeof window !== "undefined" ? window.myInjectedWallet : undefined,
    },
  });
  ```

## 0.7.7

### Patch Changes

- [#1386](https://github.com/wevm/wagmi/pull/1386) [`206a2adb`](https://github.com/wevm/wagmi/commit/206a2adbb4ee5149a364543b34612050ccf78c21) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `persister` would still use `window.localStorage` instead of the wagmi `storage`.

- [#1376](https://github.com/wevm/wagmi/pull/1376) [`a70a9528`](https://github.com/wevm/wagmi/commit/a70a9528f93f4d7fea28b7652751dfef2dcacf9b) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where `switchChain` on `WalletConnectConnector` would not resolve.

- [#1386](https://github.com/wevm/wagmi/pull/1386) [`206a2adb`](https://github.com/wevm/wagmi/commit/206a2adbb4ee5149a364543b34612050ccf78c21) Thanks [@jxom](https://github.com/jxom)! - Added `serialize`/`deserialize` as config options to `createStorage`.

- [#1392](https://github.com/wevm/wagmi/pull/1392) [`88afc849`](https://github.com/wevm/wagmi/commit/88afc84978afe9689ab7364633e4422ecd7699ea) Thanks [@tmm](https://github.com/tmm)! - Added check for active connector when connecting

## 0.7.6

### Patch Changes

- [#1384](https://github.com/wevm/wagmi/pull/1384) [`027e88d6`](https://github.com/wevm/wagmi/commit/027e88d6e5f8d028d46ee78aec8500701e0173d9) Thanks [@tmm](https://github.com/tmm)! - Fixed issue reconnecting after disconnect with `MetaMaskConnector` in MetaMask mobile browser.

## 0.7.5

### Patch Changes

- [`1169914a`](https://github.com/wevm/wagmi/commit/1169914a0f0ad2810ca1c536b1f1bc6c20f2c1be) Thanks [@jxom](https://github.com/jxom)! - Use `get_accounts` for `getSigner` in InjectedConnector

## 0.7.4

### Patch Changes

- [#1309](https://github.com/wevm/wagmi/pull/1309) [`1f4a4261`](https://github.com/wevm/wagmi/commit/1f4a4261247b1d3a90e3123157bc851a35d49b9c) Thanks [@tmm](https://github.com/tmm)! - Fixed internal type

## 0.7.3

### Patch Changes

- [#1294](https://github.com/wevm/wagmi/pull/1294) [`b2f88949`](https://github.com/wevm/wagmi/commit/b2f88949f32aabaf13f318472648cd51a8b7f2e7) Thanks [@tmm](https://github.com/tmm)! - Set `abi` return type value for `prepareContractWrite` as more permissive when not inferrable as `Abi`.

## 0.7.2

### Patch Changes

- [`e9f806b6`](https://github.com/wevm/wagmi/commit/e9f806b652ba62effb3ddac464815e447fc287f6) Thanks [@tmm](https://github.com/tmm)! - Bumped abitype and zustand versions.

## 0.7.1

### Patch Changes

- [#1272](https://github.com/wevm/wagmi/pull/1272) [`1f7fc41`](https://github.com/wevm/wagmi/commit/1f7fc419f7960bbdc51dfa85c2f33b89f1ecc1bf) Thanks [@tmm](https://github.com/tmm)! - Fixed ethers import path

## 0.7.0

### Minor Changes

- [#1202](https://github.com/wevm/wagmi/pull/1202) [`9bf56af`](https://github.com/wevm/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Removed the following deprecated chains:

  - `ropsten`
  - `rinkeby`
  - `kovan`
  - `optimismKovan`
  - `arbitrumRinkeby`

  If you feel you still need to include one of these testnets in your application, you will have to define it manually:

  ```diff
  -import { rinkeby } from 'wagmi'
  +import { Chain } from 'wagmi'

  +export const rinkeby: Chain = {
  + id: 4,
  + name: 'Rinkeby',
  + network: 'rinkeby',
  + nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
  + rpcUrls: {
  +   alchemy: 'https://eth-rinkeby.alchemyapi.io/v2',
  +   default: 'https://rpc.ankr.com/eth_rinkeby',
  +   infura: 'https://rinkeby.infura.io/v3',
  +   public: 'https://rpc.ankr.com/eth_rinkeby',
  +  },
  + blockExplorers: {
  +   etherscan: 'https://rinkeby.etherscan.io',
  +   default: 'https://rinkeby.etherscan.io',
  + },
  + ens: {
  +   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  + },
  + multicall: {
  +   address: '0xca11bde05977b3631167028862be2a173976ca11',
  +   blockCreated: 10299530,
  + },
  + testnet: true,
  }
  ```

  You can reference these removed chains [here](https://github.com/wevm/wagmi/blob/389765f7d9af063ab0df07389a2bbfbc10a41060/packages/core/src/constants/chains.ts).

- [#1202](https://github.com/wevm/wagmi/pull/1202) [`9bf56af`](https://github.com/wevm/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `addressOrName` renamed to `address` for `fetchBalance` and `fetchEnsAvatar`.

  ```diff
  const result = await fetchBalance({
  - addressOrName: '0x…',
  + address: '0x…',
  })
  ```

  If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

  ```diff
  + const { data: address } = await fetchEnsAddress({ name: 'example.eth' })
  const result = await fetchBalance({
  - addressOrName: 'example.eth',
  + address,
  })
  ```

- [#1202](https://github.com/wevm/wagmi/pull/1202) [`9bf56af`](https://github.com/wevm/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Made `apiKey` required on `infuraProvider` and `alchemyProvider`.

  ```diff
  import { configureChains } from 'wagmi'

  const config = configureChains(defaultChains, [
  - alchemyProvider(),
  + alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY })
  ])
  ```

  You can find your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/), or your Infura API key from the [Infura Dashboard](https://infura.io/login).

- [#1202](https://github.com/wevm/wagmi/pull/1202) [`9bf56af`](https://github.com/wevm/wagmi/commit/9bf56af3c30bdb80abb1e785c002e00986fadfb2) Thanks [@tmm](https://github.com/tmm)! - Removed CommonJS support

## 0.6.12

### Patch Changes

- [#1250](https://github.com/wevm/wagmi/pull/1250) [`ce2e0f4`](https://github.com/wevm/wagmi/commit/ce2e0f4a46b8fd1c509ead552012ef4c072a525b) Thanks [@tmm](https://github.com/tmm)! - Added support for Trust Wallet browser extension.

## 0.6.11

### Patch Changes

- [#1234](https://github.com/wevm/wagmi/pull/1234) [`3ff9303`](https://github.com/wevm/wagmi/commit/3ff930349250f62137cca4ca3b382522882abf8a) Thanks [@tmm](https://github.com/tmm)! - Fixed issue with adding chain to wallet without block explorer URL.

## 0.6.10

### Patch Changes

- [#1232](https://github.com/wevm/wagmi/pull/1232) [`c0ca509`](https://github.com/wevm/wagmi/commit/c0ca509506dcf6d98b058df549dc761c9a5f3d1c) Thanks [@tmm](https://github.com/tmm)! - Added validation to check that chain is configured for connector when accessing `Signer`.

## 0.6.9

### Patch Changes

- [#1207](https://github.com/wevm/wagmi/pull/1207) [`c73d463`](https://github.com/wevm/wagmi/commit/c73d463d65c9dbfcfe709187e47323a769589741) Thanks [@lvshaoping007](https://github.com/lvshaoping007)! - Added Kucoin wallet support to `InjectedConnector`

## 0.6.8

### Patch Changes

- [#1132](https://github.com/wevm/wagmi/pull/1132) [`d41c0d6`](https://github.com/wevm/wagmi/commit/d41c0d650f8c0e54145758685b7604b8909d7ae0) Thanks [@toniocodo](https://github.com/toniocodo)! - Added ERC-4626 ABI

- [#1201](https://github.com/wevm/wagmi/pull/1201) [`9a07efa`](https://github.com/wevm/wagmi/commit/9a07efaa397d3ba03f2edbe527c359f21e22139a) Thanks [@jxom](https://github.com/jxom)! - Fixed issue where non-checksum addresses did not resolve with an ENS name

## 0.6.7

### Patch Changes

- [#1174](https://github.com/wevm/wagmi/pull/1174) [`196a458`](https://github.com/wevm/wagmi/commit/196a458f64141e8a9f39c1b1e1af5937f692cb39) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `client.chains` (active connector chains) would be populated when there is no active connector (disconnected user).

- [#1176](https://github.com/wevm/wagmi/pull/1176) [`389765f`](https://github.com/wevm/wagmi/commit/389765f7d9af063ab0df07389a2bbfbc10a41060) Thanks [@jxom](https://github.com/jxom)! - Migrate away from Alchemy RPC URLs in the public RPC URL list

## 0.6.6

### Patch Changes

- [`81ce9e6`](https://github.com/wevm/wagmi/commit/81ce9e64d85f7d01370324c1a529988a0919894f) Thanks [@jxom](https://github.com/jxom)! - Add `isPortal` to injected MetaMask flags.

- [`c2c0109`](https://github.com/wevm/wagmi/commit/c2c01096ef4cd0ffadbb49062969c208604c6194) Thanks [@jxom](https://github.com/jxom)! - Add etherscan block explorer to Optimism Goerli

## 0.6.5

### Patch Changes

- [#1162](https://github.com/wevm/wagmi/pull/1162) [`30335b3`](https://github.com/wevm/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where non-indexed event parameter types were set to `null`.

- [#1162](https://github.com/wevm/wagmi/pull/1162) [`30335b3`](https://github.com/wevm/wagmi/commit/30335b3199fb425e398e9c492b50c68d5e2ade7e) Thanks [@tmm](https://github.com/tmm)! - Fixed issue where `useContractReads` and `useContractInfiniteReads` types were slowing down TypeScript compiler.

## 0.6.4

### Patch Changes

- [#1103](https://github.com/wevm/wagmi/pull/1103) [`651eda0`](https://github.com/wevm/wagmi/commit/651eda06384bd0955268427f898e9337b2dc5a31) Thanks [@tmm](https://github.com/tmm)! - Bumped `abitype` dependency.

## 0.6.3

### Patch Changes

- [#1086](https://github.com/wevm/wagmi/pull/1086) [`4e28d2a`](https://github.com/wevm/wagmi/commit/4e28d2ad4c2e6b3479b728563040b9529463cbcf) Thanks [@tmm](https://github.com/tmm)! - Exposed module types.

## 0.6.2

### Patch Changes

- [#1080](https://github.com/wevm/wagmi/pull/1080) [`3be5e8b`](https://github.com/wevm/wagmi/commit/3be5e8b01e58ed40cc9dab7ef9533c0197cb74d0) Thanks [@tmm](https://github.com/tmm)! - Added `abitype` to `dependencies` so types ship correctly.

## 0.6.1

### Patch Changes

- [#1074](https://github.com/wevm/wagmi/pull/1074) [`8db807f`](https://github.com/wevm/wagmi/commit/8db807f16149aa278c2a7db9ee5245431db12173) Thanks [@IljaDaderko](https://github.com/IljaDaderko)! - Exported `EventListener` type

## 0.6.0

### Minor Changes

- [#940](https://github.com/wevm/wagmi/pull/940) [`b6cb8f4`](https://github.com/wevm/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `watchSigner` now requires an arguments object (that accepts an optional `chainId`) as it's first parameter.

  ```diff
  import { watchSigner } from `@wagmi/core`

  -watchSigner(signer => {
  +watchSigner({}, signer => {
    console.log('new signer!', signer)
  })
  ```

- [#940](https://github.com/wevm/wagmi/pull/940) [`b6cb8f4`](https://github.com/wevm/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `prepareSendTransaction` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

- [#941](https://github.com/wevm/wagmi/pull/941) [`0c96009`](https://github.com/wevm/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `addressOrName` and `contractInterface` renamed to `address` and `abi` respectively for contract actions: `getContract`, `multicall`, `prepareWriteContract`, `readContract`, `readContracts`, `watchContractEvent`, `watchMulticall`, `watchReadContract`, `watchReadContracts`, `writeContract`.

  ```diff
  import { readContract } from '@wagmi/core'

  const result = await readContract({
  - addressOrName: '0x…',
  + address: '0x…',
  - contractInterface: […] as const,
  + abi: […] as const,
    functionName: 'balanceOf',
    args: ['0x…'],
  })
  ```

  If you were using an ENS name instead of an address, you can resolve the name to an address before passing it to the action.

  ```diff
  - import { readContract } from '@wagmi/core'
  + import { fetchEnsAddress, readContract } from '@wagmi/core'

  + const address = await fetchEnsAddress('example.eth')
  const result = await readContract({
  - addressOrName: 'example.eth',
  + address,
    abi: […] as const,
    functionName: 'balanceOf',
    args: ['0x…'],
  })
  ```

- [#940](https://github.com/wevm/wagmi/pull/940) [`b6cb8f4`](https://github.com/wevm/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `prepareWriteContract` now throws when a `chainId` is specified and the end-user is on a different chain id (the wrong network).

- [#940](https://github.com/wevm/wagmi/pull/940) [`b6cb8f4`](https://github.com/wevm/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: `prepareSendTransaction` now only accepts a `signer` instead of `signerOrProvider`.

  This is to reach parity with `prepareWriteContract`.

  If no `signer` is provided, wagmi will use the signer that is currently connected. If no user is connected, then `prepareWriteContract` will throw an error.

- [#941](https://github.com/wevm/wagmi/pull/941) [`0c96009`](https://github.com/wevm/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `args` config option must now be an array for the following actions: `readContract`, `writeContract`, `prepareWriteContract`, `multicall`, `readContracts`, `watchMulticall`, and `watchReadContracts`.

  ```diff
  import { readContract } from '@wagmi/core'

  const result = await readContract({
    address: '0x…',
    abi: […],
    functionName: 'balanceOf',
  - args: '0x…',
  + args: ['0x…'],
  })
  ```

- [#941](https://github.com/wevm/wagmi/pull/941) [`0c96009`](https://github.com/wevm/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `watchContractEvent` now accepts a configuration object and callback instead of positional arguments.

  ```diff
  import { watchContractEvent } from '@wagmi/core'

  - const unsubscribe = watchContractEvent(
  -   {
  -     address: '0x…',
  -     abi: […],
  -   },
  -   'Transfer',
  -   (from, to, tokenId) => {
  -     // ...
  -   },
  -   { once: true },
  - )
  + const unsubscribe = watchContractEvent(
  +   {
  +     address: '0x…',
  +     abi: […],
  +     eventName: 'Transfer',
  +     once: true,
  +   },
  +   (from, to, tokenId) => {
  +     // ...
  +   },
  + )
  ```

- [#941](https://github.com/wevm/wagmi/pull/941) [`0c96009`](https://github.com/wevm/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Updated TypeScript version to `typescript@>=4.7.4`.

  `@wagmi/core` can now infer types based on [ABI](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, giving you full end-to-end type-safety from your contracts to your frontend and incredible developer experience (e.g. autocomplete contract function names and catch misspellings, type contract function arguments, etc.).

  For this to work, you must upgrade to `typescript@>=4.7.4`. Why is TypeScript v4.7.4 or greater necessary? TypeScript 4.7.4 introduced the ability to [extend constraints on inferred type variables](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#extends-constraints-on-infer-type-variables), which is used extensively to help narrow types for ABIs. Good news! When upgrading TypeScript from 4.6 to 4.7 there are likely no [breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#breaking-changes) for your set up.

- [#941](https://github.com/wevm/wagmi/pull/941) [`0c96009`](https://github.com/wevm/wagmi/commit/0c96009398647a515a57f72ef25c32724f7c978c) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Updated TypeScript generics for contract interaction and typed data actions.

  Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `abi` allows TypeScript to infer `functionName`, `args`, `overrides`, and return types for functions, and `eventName` and `listener` types for events.

  ```diff
  import { readContract } from '@wagmi/core'

  const result = await readContract({
    address: '0x…',
  - abi: […],
  + abi: […] as const,
    functionName: 'balanceOf', // will autocomplete and catch typos
    args: ['0x…'], // inferred based on `functionName`
  })
  result // inferred based on `functionName`
  ```

  This works for the following actions: `readContract`, `writeContract`, `prepareWriteContract`, `multicall`, `readContracts`, `watchMulticall`, `watchReadContracts`, and `watchContractEvent`.

  Adding a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to `signTypedData`'s config option, `types`, allows TypeScript to infer `value`.

  ```diff
  import { signTypedData } from '@wagmi/core'

  const result = await signTypedData({
    domain: {
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    types: {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
  - },
  + } as const,
    value: { // `value` is inferred based on `types`
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
  })
  ```

### Patch Changes

- [#1061](https://github.com/wevm/wagmi/pull/1061) [`a4ffe8b`](https://github.com/wevm/wagmi/commit/a4ffe8b25516d5504685ae94579da4cd8c409329) Thanks [@alecananian](https://github.com/alecananian)! - Added Arbitrum Goerli Arbiscan block explorer

- [#940](https://github.com/wevm/wagmi/pull/940) [`b6cb8f4`](https://github.com/wevm/wagmi/commit/b6cb8f4cd15eb13073bc7e9ecb4bfa2c261c0663) Thanks [@jxom](https://github.com/jxom)! - The `fetchSigner` action now accepts an optional `chainId` to use for signer initialization as an argument.

  ```tsx
  import { fetchSigner } from "@wagmi/core";
  import { optimism } from "@wagmi/core/chains";

  // ...

  fetchSigner({ chainId: optimism.id });
  ```

- [#1048](https://github.com/wevm/wagmi/pull/1048) [`ed13074`](https://github.com/wevm/wagmi/commit/ed130747c0f28c1d9980a1328883e4000a60455e) Thanks [@Max-3-7](https://github.com/Max-3-7)! - Added support for Avalanche core wallet

- [#1046](https://github.com/wevm/wagmi/pull/1046) [`ab9ecaa`](https://github.com/wevm/wagmi/commit/ab9ecaa74dfa4324279e167dd7e348319ef7d35d) Thanks [@jxom](https://github.com/jxom)! - make ethers block format validator compatible with Celo

- [#1050](https://github.com/wevm/wagmi/pull/1050) [`73d4d47`](https://github.com/wevm/wagmi/commit/73d4d47bc679f4f9a1cf46010fe2bf858c9d0b5c) Thanks [@jxom](https://github.com/jxom)! - update dependencies

  - `zustand@4.1.1`

## 0.5.8

### Patch Changes

- [`8cb07462`](https://github.com/wevm/wagmi/commit/8cb07462acc3c5637398d11d2451f8b8e330d553) Thanks [@jxom](https://github.com/jxom)! - Added `chainId` as an argument to `watchBlockNumber`.

* [`53c1a474`](https://github.com/wevm/wagmi/commit/53c1a4747d03b685e8cfbf55361fc2a56777fb06) Thanks [@tmm](https://github.com/tmm)! - Added missing `decimals` option to `Connector` `watchAsset`

- [`4d74dd4f`](https://github.com/wevm/wagmi/commit/4d74dd4ff827ba5c43c3546a218f38cee45ea76a) Thanks [@jxom](https://github.com/jxom)! - Support ERC20 contracts that represent strings as bytes32

## 0.5.7

### Patch Changes

- [`aa51bc4d`](https://github.com/wevm/wagmi/commit/aa51bc4dc5683bf0178597d2fdb8f2e9d82e7970) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue in `CoinbaseWalletConnector` where the browser extension would unintendedly reset the network when the browser is refreshed.

* [#955](https://github.com/wevm/wagmi/pull/955) [`e326cd80`](https://github.com/wevm/wagmi/commit/e326cd80fe65267db623eb6c80ccdd75572914cf) Thanks [@0xFlicker](https://github.com/0xFlicker)! - Added Infura RPC URL for Sepolia

- [`cec14089`](https://github.com/wevm/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where `useProvider` & `getProvider` were not returning referentially equal providers.

* [`cec14089`](https://github.com/wevm/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where the `watch` option was not respecting the neighboring `chainId` option in `useBlockNumber`.

- [`cec14089`](https://github.com/wevm/wagmi/commit/cec14089500c86687226ab272b4c3fcb85ae3d69) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where block listeners (via `watch`) were firing excessively on L2 chains.

## 0.5.6

### Patch Changes

- [#936](https://github.com/wevm/wagmi/pull/936) [`3329d1f`](https://github.com/wevm/wagmi/commit/3329d1f5880431566e14ac1640f48d0975aec4c2) Thanks [@jxom](https://github.com/jxom)! - Added the ability to provide a custom logger to override how logs are broadcasted to the consumer in wagmi.

  A custom logger can be provided to the wagmi client via `logger`.

  ### API

  ```tsx
  logger?: {
    warn: typeof console.warn | null
  }
  ```

  ### Examples

  **Passing in a custom logger**

  You can pass in a function to define your own custom logger.

  ```diff
  + import { logWarn } from './logger';

  const client = createClient({
    ...
  + logger: {
  +   warn: message => logWarn(message)
  + }
    ...
  })
  ```

  **Disabling a logger**

  You can disable a logger by passing `null` as the value.

  ```diff
  const client = createClient({
    ...
  + logger: {
  +   warn: null
  + }
    ...
  })
  ```

* [#889](https://github.com/wevm/wagmi/pull/889) [`27788ed`](https://github.com/wevm/wagmi/commit/27788ed989b5dc26849c7945fb91a92e56766018) Thanks [@jxom](https://github.com/jxom)! - Make multicall & readContracts more error robust

## 0.5.5

### Patch Changes

- [#912](https://github.com/wevm/wagmi/pull/912) [`e529e12`](https://github.com/wevm/wagmi/commit/e529e125c713ed3ef24a59c6bf226fe4deee7ac9) Thanks [@zouhangwithsweet](https://github.com/zouhangwithsweet)! - Added BitKeep to injected flags

- [#912](https://github.com/wevm/wagmi/pull/910) Thanks [@mytangying](https://github.com/zouhangwithsweet)! - Added MathWallet to injected flags

- [#904](https://github.com/wevm/wagmi/pull/904) [`c231058`](https://github.com/wevm/wagmi/commit/c23105850f335f8798031e14c7098b7dee8c2975) Thanks [@jxom](https://github.com/jxom)! - Minimized contract interface returned from `prepareWriteContract`.

## 0.5.4

### Patch Changes

- [#852](https://github.com/wevm/wagmi/pull/852) [`c3192d0`](https://github.com/wevm/wagmi/commit/c3192d0663aa332ae9edfd9dd49b333454013ab7) Thanks [@skeithc](https://github.com/skeithc)! - Added support for the Sepolia testnet

## 0.5.3

### Patch Changes

- [#835](https://github.com/wevm/wagmi/pull/835) [`1b85e54`](https://github.com/wevm/wagmi/commit/1b85e54ae654e2564cf5bc2dae6411fe0a25875c) Thanks [@jxom](https://github.com/jxom)! - Update `@coinbase/wallet-sdk` to `3.4.1`

* [#834](https://github.com/wevm/wagmi/pull/834) [`9655879`](https://github.com/wevm/wagmi/commit/96558793b0319df47aefafa6b7b9c959068d491b) Thanks [@jxom](https://github.com/jxom)! - Update zustand to `4.0.0`

## 0.5.2

### Patch Changes

- [#823](https://github.com/wevm/wagmi/pull/823) [`10b8b78`](https://github.com/wevm/wagmi/commit/10b8b78605b7246b2c55b8d69f96663906e5cd20) Thanks [@tmm](https://github.com/tmm)! - Add Optimism Goerli to `chain` lookup.

## 0.5.1

### Patch Changes

- [#767](https://github.com/wevm/wagmi/pull/767) [`e9392f3`](https://github.com/wevm/wagmi/commit/e9392f396e48e928bd9d2522e3ad671c589f08cb) Thanks [@klyap](https://github.com/klyap)! - Add Optimism Goerli chain ahead of [Kovan deprecation](https://dev.optimism.io/kovan-to-goerli).

* [#817](https://github.com/wevm/wagmi/pull/817) [`7e5cac7`](https://github.com/wevm/wagmi/commit/7e5cac75815dcd8aa563462342a4853fc5207735) Thanks [@alecananian](https://github.com/alecananian)! - Added custom name mapping for 1inch Wallet injected provider

- [#806](https://github.com/wevm/wagmi/pull/806) [`0b34e56`](https://github.com/wevm/wagmi/commit/0b34e56db97e6dcdb71088e0149b2d55ebc604a5) Thanks [@vmichalik](https://github.com/vmichalik)! - Fix canonical testnet native asset symbols by changing them to ETH

* [#778](https://github.com/wevm/wagmi/pull/778) [`0892908`](https://github.com/wevm/wagmi/commit/08929084eeeba1a3a55aa098fa9d92a243685ad5) Thanks [@0xcadams](https://github.com/0xcadams)! - Add Arbitrum Goerli chain.

## 0.5.0

### Minor Changes

- [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The configuration passed to the `sendTransaction` action now needs to be:

  - prepared with the `prepareSendTransaction` action **(new functionality)**, or
  - recklessly unprepared **(previous functionality)**

  > Why? [Read here](https://wagmi.sh/docs/prepare-hooks)

  ### Prepared usage

  ```diff
  import { prepareSendTransaction, sendTransaction } from '@wagmi/core'

  +const config = await prepareSendTransaction({
  +  request: {
  +    to: 'moxey.eth',
  +    value: parseEther('1'),
  +  }
  +})

  const result = await sendTransaction({
  - request: {
  -   to: 'moxey.eth',
  -   value: parseEther('1')
  - }
  + ...config
  })
  ```

  ### Recklessly unprepared usage

  It is possible to use `sendTransaction` without preparing the configuration first by passing `mode: 'recklesslyUnprepared'`.

  ```diff
  import { sendTransaction } from '@wagmi/core'

  const result = await sendTransaction({
  + mode: 'recklesslyUnprepared',
    request: {
      to: 'moxey.eth',
      value: parseEther('1'),
    }
  })
  ```

* [#760](https://github.com/wevm/wagmi/pull/760) [`d8af6bf`](https://github.com/wevm/wagmi/commit/d8af6bf50885aec110ae4d64716642453aa27896) Thanks [@tmm](https://github.com/tmm)! - **Breaking:** `alchemyProvider` and `infuraProvider` now use a generic `apiKey` configuration option instead of `alchemyId` and `infuraId`.

  ```diff
  import { alchemyProvider } from '@wagmi/core/providers/alchemy'
  import { infuraProvider } from '@wagmi/core/providers/infura'

  alchemyProvider({
  -  alchemyId: 'yourAlchemyApiKey',
  +  apiKey: 'yourAlchemyApiKey',
  })

  infuraProvider({
  -  infuraId: 'yourInfuraApiKey',
  +  apiKey: 'yourInfuraApiKey',
  })
  ```

- [#727](https://github.com/wevm/wagmi/pull/727) [`ac3b9b8`](https://github.com/wevm/wagmi/commit/ac3b9b87f80cb45b65d003f09d916d7d1427a62e) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: Moved the `pollingInterval` config option from the chain provider config to `configureChains` config.

  ```diff
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
    [
  -   alchemyProvider({ apiKey, pollingInterval: 5000 }),
  -   publicProvider({ pollingInterval: 5000 })
  +   alchemyProvider({ apiKey }),
  +   publicProvider()
    ],
  + { pollingInterval: 5000 }
  )
  ```

* [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** The `sendTransaction` action now returns an object only consisting of `hash` & `wait`, and not the full [`TransactionResponse`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

  If you require the full `TransactionResponse`, you can use `fetchTransaction`:

  ```diff
  import { sendTransaction, fetchTransaction } from '@wagmi/core'

  const {
    hash,
    wait,
  - ...transaction
  } = sendTransaction(...)

  +const transaction = fetchTransaction({ hash })
  ```

  > Why? The old implementation of `sendTransaction` created a long-running async task, causing [UX pitfalls](https://wagmi.sh/docs/prepare-hooks#ux-pitfalls-without-prepare-hooks) when invoked in a click handler.

- [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: If a `chainId` is passed to `writeContract` or `sendTransaction`, it will no longer attempt to switch chain before sending the transaction. Instead, it will throw an error if the user is on the wrong chain.

  > Why?
  >
  > - Eagerly prompting to switch chain in these actions created a long-running async task that that makes [iOS App Links](https://wagmi.sh/docs/prepare-hooks#ios-app-link-constraints) vulnerable.
  > - Not all wallets support programmatic chain switching.

### Patch Changes

- [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The configuration passed to the `writeContract` action now needs to be:

  - prepared with the `prepareWriteContract` action **(new functionality)**, or
  - recklessly unprepared **(previous functionality)**

  > Why? [Read here](https://wagmi.sh/docs/prepare-hooks)

  ### Prepared usage

  ```diff
  import { prepareWriteContract, writeContract } from '@wagmi/core'

  const tokenId = 69

  +const config = await prepareWriteContract({
  + addressOrName: '0x...',
  + contractInterface: wagmiAbi,
  + functionName: 'mint',
  + args: [tokenId]
  +})

  const result = await writeContract({
  - addressOrName: '0x...',
  - contractInterface: wagmiAbi,
  - functionName: 'mint',
  - args: [tokenId],
  + ...config
  })
  ```

  ### Recklessly unprepared usage

  It is possible to use `writeContract` without preparing the configuration first by passing `mode: 'recklesslyUnprepared'`.

  ```diff
  import { writeContract } from '@wagmi/core'

  const tokenId = 69

  const result = await writeContract({
  + mode: 'recklesslyUnprepared',
    addressOrName: '0x...',
    contractInterface: wagmiAbi,
    functionName: 'mint',
    args: [tokenId],
  })
  ```

* [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - Added the `prepareSendTransaction` hook that prepares the parameters required for sending a transaction.

  It returns config to be passed through to `sendTransaction`.

  ```ts
  import { prepareSendTransaction, sendTransaction } from "@wagmi/core";

  const config = await prepareSendTransaction({
    request: {
      to: "moxey.eth",
      value: parseEther("1"),
    },
  });
  const result = await sendTransaction(config);
  ```

- [#658](https://github.com/wevm/wagmi/pull/658) [`d70c115`](https://github.com/wevm/wagmi/commit/d70c115131f299fb61f87867b6ac4218e0bcf432) Thanks [@jxom](https://github.com/jxom)! - Added the `prepareWriteContract` hook that prepares the parameters required for a contract write transaction.

  It returns config to be passed through to `writeContract`.

  Example:

  ```tsx
  import { prepareWriteContract, writeContract } from "@wagmi/core";

  const config = await prepareWriteContract({
    addressOrName: "0x...",
    contractInterface: wagmiAbi,
    functionName: "mint",
  });
  const result = await writeContract(config);
  ```

* [#739](https://github.com/wevm/wagmi/pull/739) [`c2295a5`](https://github.com/wevm/wagmi/commit/c2295a56cc86d02cc6602e2b4557b8ab9a091a3f) Thanks [@tmm](https://github.com/tmm)! - Fix balance formatting for tokens that do not have 18 decimals.

- [#759](https://github.com/wevm/wagmi/pull/759) [`959953d`](https://github.com/wevm/wagmi/commit/959953d1f5b3e8189bac56de245c62333470d18e) Thanks [@tmm](https://github.com/tmm)! - Added `fetchTransaction` action:

  ```ts
  import { fetchTransaction } from "@wagmi/core";

  const transaction = await fetchTransaction({
    hash: "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
  });
  ```

## 0.4.9

### Patch Changes

- [#721](https://github.com/tmm/wagmi/pull/721) [`abea25f`](https://github.com/tmm/wagmi/commit/abea25fd15d81d1ecaec9d3fbd687042ab29b1e6) Thanks [@tmm](https://github.com/tmm)! - Stay connected to existing `client.connector` when `connect` action fails to connect to new connector.

* [#721](https://github.com/tmm/wagmi/pull/721) [`abea25f`](https://github.com/tmm/wagmi/commit/abea25fd15d81d1ecaec9d3fbd687042ab29b1e6) Thanks [@tmm](https://github.com/tmm)! - Switch `fetchToken` action to multicall and add `name` output property.

## 0.4.8

### Patch Changes

- [#693](https://github.com/tmm/wagmi/pull/693) [`56e468c`](https://github.com/tmm/wagmi/commit/56e468c3617ec222527bb3c02eadec3ebeff923a) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Fix import errors with Coinbase Wallet SDK in Vite

## 0.4.7

### Patch Changes

- [#677](https://github.com/tmm/wagmi/pull/677) [`35e4219`](https://github.com/tmm/wagmi/commit/35e42199af9dd346549c1718e144728f55b8d7dd) Thanks [@jxom](https://github.com/jxom)! - Move `parseContractResult` to `@wagmi/core`

## 0.4.6

### Patch Changes

- [#670](https://github.com/tmm/wagmi/pull/670) [`29a0d21`](https://github.com/tmm/wagmi/commit/29a0d21ee83995559f63542778dfa805f15e7441) Thanks [@tmm](https://github.com/tmm)! - Added ethers-compatible `deepEqual` function.

## 0.4.5

### Patch Changes

- [#654](https://github.com/tmm/wagmi/pull/654) [`e66530b`](https://github.com/tmm/wagmi/commit/e66530bf4881b3533c528f8c5a5f41be0eab0a64) Thanks [@jxom](https://github.com/jxom)! - fix `multicall` returning nullish data for all calls unexpectedly

## 0.4.4

### Patch Changes

- [#616](https://github.com/tmm/wagmi/pull/616) [`7a7a17a`](https://github.com/tmm/wagmi/commit/7a7a17a46d4c9e6465cc46a111b5fe8a56109f1b) Thanks [@tmm](https://github.com/tmm)! - Adds `UNSTABLE_shimOnConnectSelectAccount` flag. With this flag and "disconnected" with `shimDisconnect` enabled, the user is prompted to select a different MetaMask account (than the currently connected account) when trying to connect (e.g. `useConnect`/`connect` action).

## 0.4.3

### Patch Changes

- [#631](https://github.com/tmm/wagmi/pull/631) [`a780e32`](https://github.com/tmm/wagmi/commit/a780e32e91a0072c795fa0b5a6111302768e2a01) Thanks [@tmm](https://github.com/tmm)! - Fix WalletConnect stale session

## 0.4.2

### Patch Changes

- [#624](https://github.com/tmm/wagmi/pull/624) [`416fa7e`](https://github.com/tmm/wagmi/commit/416fa7ee1f8019ab86e33fb93783ffddecc02c49) Thanks [@jxom](https://github.com/jxom)! - Fix broken `WebSocketProvider` type defs

## 0.4.1

### Patch Changes

- [#622](https://github.com/tmm/wagmi/pull/622) [`d171581`](https://github.com/tmm/wagmi/commit/d171581464891dd870d97b6232205da0cb152d9b) Thanks [@tmm](https://github.com/tmm)! - Use `domain.chainId` to validate and switch chain before signing in `signTypedData`.

* [#618](https://github.com/tmm/wagmi/pull/618) [`a5138e8`](https://github.com/tmm/wagmi/commit/a5138e82a00e4d9469ad78c97b2d34200d7f1fbe) Thanks [@tmm](https://github.com/tmm)! - Fix adding chains when using MetaMask mobile app, add `publicRpcUrls` constant, and default to public endpoint when adding chain.

## 0.4.0

### Minor Changes

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `provider` config option is now required on `createClient`. It is recommended to pass the [`provider` given from `configureChains`](https://wagmi.sh/docs/providers/configuring-chains).

  ```diff
  import {
    createClient,
  + defaultChains,
  + configureChains
  } from 'wagmi'
  +import { publicProvider } from 'wagmi/providers/publicProvider'

  +const { provider } = configureChains(defaultChains, [
  + publicProvider
  +])

  const client = createClient({
  + provider
  })
  ```

  If you previously used an ethers.js Provider, you now need to provide your `chains` on the Provider instance:

  ```diff
  import {
    createClient,
  + defaultChains
  } from 'wagmi'
  import ethers from 'ethers'

  const client = createClient({
  - provider: getDefaultProvider()
  + provider: Object.assign(getDefaultProvider(), { chains: defaultChains })
  })
  ```

* [`4f8f3c0`](https://github.com/tmm/wagmi/commit/4f8f3c0d65383bd8bbdfc3f1033adfdb11d80ebb) Thanks [@nachoiacovino](https://github.com/nachoiacovino)! - Use ethereum-lists chains symbols

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** Removed the `chainId` parameter from `connectors` function on `createClient`.

  ```diff
  const client = createClient({
  - connectors({ chainId }) {
  + connectors() {
      ...
    }
  })
  ```

  If you previously derived RPC URLs from the `chainId` on `connectors`, you can now remove that logic as `wagmi` now handles RPC URLs internally when used with `configureChains`.

  ```diff
  import {
    chain,
  +  configureChains,
    createClient
  } from 'wagmi';

  +import { publicProvider } from 'wagmi/providers/public'

  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

  +const { chains } = configureChains(
  +  [chain.mainnet],
  +  [publicProvider()]
  +);

  const client = createClient({
  -  connectors({ chainId }) {
  -    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
  -    const rpcUrl = chain.rpcUrls.alchemy
  -      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
  -      : chain.rpcUrls.default
  -    return [
  +  connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
  -       chainId: chain.id,
  -       jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
  -       rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { name: 'Injected' },
      }),
    ]
  -  },
  })
  ```

* [#611](https://github.com/tmm/wagmi/pull/611) [`3089c34`](https://github.com/tmm/wagmi/commit/3089c34196d4034acabac031e0a2f7ee63ae30cc) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `Connector`s `getProvider` method no longer supports the `create` config parameter. Use the `chainId` config option instead.

- [#596](https://github.com/tmm/wagmi/pull/596) [`a770af7`](https://github.com/tmm/wagmi/commit/a770af7d2cb214b6620d5341115f1e938e1e77ff) Thanks [@tmm](https://github.com/tmm)! - **Breaking**: `TypedDataDomain` and `TypedDataField` types were removed and incorporated into `SignTypedDataArgs`.

* [`4f8f3c0`](https://github.com/tmm/wagmi/commit/4f8f3c0d65383bd8bbdfc3f1033adfdb11d80ebb) Thanks [@nachoiacovino](https://github.com/nachoiacovino)! - Update symbols to match ethereum-lists/chains

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `writeContract` function parameters have been consolidated into a singular config parameter.

  Before:

  ```tsx
  writeContract(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: wagmigotchiABI,
    },
    "feed",
  );
  ```

  After:

  ```tsx
  readContract({
    addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    contractInterface: wagmigotchiABI,
    functionName: "feed",
  });
  ```

### Patch Changes

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - **Breaking**: The `readContract` & `watchReadContract` function parameters have been consolidated into a singular config parameter.

  Before:

  ```tsx
  readContract(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: wagmigotchiABI,
    },
    "getHunger",
    { args: [0] },
  );

  watchReadContract(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: wagmigotchiABI,
    },
    "getHunger",
    { args: [0] },
    (result) => {},
  );
  ```

  After:

  ```tsx
  readContract({
    addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    contractInterface: wagmigotchiABI,
    functionName: "getHunger",
    args: [0],
  });

  watchReadContract(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: wagmigotchiABI,
      functionName: "getHunger",
      args: [0],
    },
    (result) => {},
  );
  ```

* [#598](https://github.com/tmm/wagmi/pull/598) [`fef26bf`](https://github.com/tmm/wagmi/commit/fef26bf8aef76fc9621e3cd54d4e0ca8f69abb38) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Update `@coinbase/wallet-sdk` peer dependency to `>=3.3.0` to fix errors when connecting with older versions of the Coinbase Wallet extension and mobile app.

- [#611](https://github.com/tmm/wagmi/pull/611) [`3089c34`](https://github.com/tmm/wagmi/commit/3089c34196d4034acabac031e0a2f7ee63ae30cc) Thanks [@tmm](https://github.com/tmm)! - Added `chainId` config parameter for `writeContract` and `sendTransaction`.

  If `chainId` is provided, the connector will validate that `chainId` is the active chain before sending a transaction (and switch to `chainId` if necessary).

* [#582](https://github.com/tmm/wagmi/pull/582) [`b03830a`](https://github.com/tmm/wagmi/commit/b03830a54465215c2526f9509543fe2c978bfe70) Thanks [@jxom](https://github.com/jxom)! - Fixed an issue where the wagmi client's `status` would not update from `"disconnected"` to `"connecting" -> "connected"` when the `connect` action is invoked.

- [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - Added a `multicall` & `watchMulticall` action that provides multicall support.

  Internally uses the [`multicall3` contract](https://github.com/mds1/multicall).

  [See example usage](https://github.com/tmm/wagmi/blob/194866032985fdd3f49bc46bf1b14181d7cb61d1/packages/core/src/actions/contracts/multicall.test.ts)

* [`fc94210`](https://github.com/tmm/wagmi/commit/fc94210b67daa91aa164625dfe189d5b6c2f92d4) Thanks [@jxom](https://github.com/jxom)! - Added a `readContracts` & `watchReadContracts` action that provides the ability to batch up multiple ethers Contract read-only methods.

## 0.3.8

### Patch Changes

- [#570](https://github.com/tmm/wagmi/pull/570) [`0e3fe15`](https://github.com/tmm/wagmi/commit/0e3fe15445377f35d6f4142b49bf1c96bfeb62cd) Thanks [@tmm](https://github.com/tmm)! - adds chain for [Foundry](https://github.com/foundry-rs)

## 0.3.7

### Patch Changes

- [#550](https://github.com/tmm/wagmi/pull/550) [`2a5313e`](https://github.com/tmm/wagmi/commit/2a5313e8cbc9ba6335e8e4b85e43862c9b711bd3) Thanks [@tmm](https://github.com/tmm)! - fix `CoinbaseWalletConnector` possible type error

* [#548](https://github.com/tmm/wagmi/pull/548) [`0c48719`](https://github.com/tmm/wagmi/commit/0c487199f2421f042abc1f1d139468ccbbc5646a) Thanks [@dohaki](https://github.com/dohaki)! - add ensAddress to Chain type

- [#549](https://github.com/tmm/wagmi/pull/549) [`89b3a74`](https://github.com/tmm/wagmi/commit/89b3a74ead4234daacd0dcf8506659887ebf0553) Thanks [@tmm](https://github.com/tmm)! - Turns on [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess=) and [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks=) for better runtime safety.

## 0.3.6

### Patch Changes

- [#526](https://github.com/tmm/wagmi/pull/526) [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f) Thanks [@jxom](https://github.com/jxom)! - Added `shimChainChangedDisconnect` option to `InjectedConnector`. Defaults to `true` for `MetaMaskConnector`.

* [#526](https://github.com/tmm/wagmi/pull/526) [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f) Thanks [@jxom](https://github.com/jxom)! - Added `lastUsedChainId` property to the wagmi `Client`.

- [#526](https://github.com/tmm/wagmi/pull/526) [`e95c5f9`](https://github.com/tmm/wagmi/commit/e95c5f91859e57d079b962a72d06b93dce004d2f) Thanks [@jxom](https://github.com/jxom)! - Added `chainId` config option to the `connect` action.

  Example:

  ```tsx
  import { connect } from "@wagmi/core";

  await connect({ chainId: 69 });
  ```

## 0.3.5

### Patch Changes

- [#543](https://github.com/tmm/wagmi/pull/543) [`4d489fd`](https://github.com/tmm/wagmi/commit/4d489fd630dd8c00440bdaf4d646de662c41ff52) Thanks [@tmm](https://github.com/tmm)! - fix fee data formatting for null values

## 0.3.4

### Patch Changes

- [`c4deb66`](https://github.com/tmm/wagmi/commit/c4deb6655a52e4cc4e5b3fd82202db11d6106848) Thanks [@jxom](https://github.com/jxom)! - infer `options.chainId` config from `chains` on WalletConnectConnector

## 0.3.3

### Patch Changes

- [#486](https://github.com/tmm/wagmi/pull/486) [`dbfe3dd`](https://github.com/tmm/wagmi/commit/dbfe3dd320d178d6854a8096101200c1508786bb) Thanks [@tmm](https://github.com/tmm)! - add chains entrypoint

## 0.3.2

### Patch Changes

- [`17212da`](https://github.com/tmm/wagmi/commit/17212da601640110d2835300e6433d1433db212e) Thanks [@jxom](https://github.com/jxom)! - Made the `defaultChains` type generic in `configureChains`.

## 0.3.1

### Patch Changes

- [#484](https://github.com/tmm/wagmi/pull/484) [`1b9a503`](https://github.com/tmm/wagmi/commit/1b9a5033d51c6655b4f6570c490da6e0e9a29da9) Thanks [@tmm](https://github.com/tmm)! - export React Context

## 0.3.0

### Minor Changes

- [#408](https://github.com/tmm/wagmi/pull/408) [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a) Thanks [@jxom](https://github.com/jxom)! - **Breaking:** The `connectors` option on `createClient` no longer reacts to chain switching.

  **Passing a function to `connectors` has been deprecated.**

  If you previously derived an RPC URL from the `chainId` in `connectors`, you will need to migrate to use the [`configureChains` API](https://wagmi.sh/docs/providers/configuring-chains).

  ### Before

  ```tsx
  import { providers } from "ethers";
  import { chain, createClient, defaultChains } from "wagmi";
  import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { MetaMaskConnector } from "wagmi/connectors/metaMask";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

  const alchemyId = process.env.ALCHEMY_ID;

  const chains = defaultChains;
  const defaultChain = chain.mainnet;

  const client = createClient({
    autoConnect: true,
    connectors({ chainId }) {
      const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
      const rpcUrl = chain.rpcUrls.alchemy
        ? `${chain.rpcUrls.alchemy}/${alchemyId}`
        : chain.rpcUrls.default;
      return [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: "wagmi",
            chainId: chain.id,
            jsonRpcUrl: rpcUrl,
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
            rpc: { [chain.id]: rpcUrl },
          },
        }),
        new InjectedConnector({
          chains,
          options: {
            name: "Injected",
            shimDisconnect: true,
          },
        }),
      ];
    },
  });
  ```

  ### After

  ```tsx
  import { chain, createClient, defaultChains } from "wagmi";

  import { alchemyProvider } from "wagmi/providers/alchemy";
  import { publicProvider } from "wagmi/providers/public";

  import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { MetaMaskConnector } from "wagmi/connectors/metaMask";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

  const alchemyId = process.env.ALCHEMY_ID;

  const { chains } = configureChains(defaultChains, [
    alchemyProvider({ alchemyId }),
    publicProvider(),
  ]);

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
  });
  ```

* [#468](https://github.com/tmm/wagmi/pull/468) [`44a884b`](https://github.com/tmm/wagmi/commit/44a884b84171c418f57701e80ef8de972948ef0b) Thanks [@tmm](https://github.com/tmm)! - **Breaking:** Duplicate exports with different names and the same functionality were removed to simplify the public API. In addition, confusing exports were renamed to be more descriptive.

  - `createWagmiClient` alias was removed. Use `createClient` instead.
  - `useWagmiClient` alias was removed. Use `useClient` instead.
  - `WagmiClient` alias was removed. Use `Client` instead.
  - `createWagmiStorage` alias was removed. Use `createStorage` instead.
  - `Provider` was renamed and `WagmiProvider` alias was removed. Use `WagmiConfig` instead.

- [#408](https://github.com/tmm/wagmi/pull/408) [`bfcc3a5`](https://github.com/tmm/wagmi/commit/bfcc3a51bbb1551753e3ccde6af134e9fd4fec9a) Thanks [@jxom](https://github.com/jxom)! - Add `configureChains` API.

  The `configureChains` function allows you to configure your chains with a selected provider (Alchemy, Infura, JSON RPC, Public RPC URLs). This means you don't have to worry about deriving your own RPC URLs for each chain, or instantiating a Ethereum Provider.

  `configureChains` accepts 3 parameters: an array of chains, and an array of providers, and a config object.

  [Learn more about configuring chains & providers.](https://wagmi.sh/docs/providers/configuring-chains)

  ### Before

  ```tsx
  import { providers } from "ethers";
  import { chain, createClient, defaultChains } from "wagmi";
  import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { MetaMaskConnector } from "wagmi/connectors/metaMask";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

  const alchemyId = process.env.ALCHEMY_ID;

  const chains = defaultChains;
  const defaultChain = chain.mainnet;

  const client = createClient({
    autoConnect: true,
    connectors({ chainId }) {
      const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
      const rpcUrl = chain.rpcUrls.alchemy
        ? `${chain.rpcUrls.alchemy}/${alchemyId}`
        : chain.rpcUrls.default;
      return [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: "wagmi",
            chainId: chain.id,
            jsonRpcUrl: rpcUrl,
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
            rpc: { [chain.id]: rpcUrl },
          },
        }),
        new InjectedConnector({
          chains,
          options: {
            name: "Injected",
            shimDisconnect: true,
          },
        }),
      ];
    },
    provider: ({ chainId }) =>
      new providers.AlchemyProvider(chainId, alchemyId),
  });
  ```

  ### After

  ```tsx
  import { chain, createClient, defaultChains } from "wagmi";

  import { alchemyProvider } from "wagmi/providers/alchemy";
  import { publicProvider } from "wagmi/providers/public";

  import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { MetaMaskConnector } from "wagmi/connectors/metaMask";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

  const alchemyId = process.env.ALCHEMY_ID;

  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    [alchemyProvider({ alchemyId }), publicProvider()],
  );

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });
  ```

### Patch Changes

- [#404](https://github.com/tmm/wagmi/pull/404) [`f81c156`](https://github.com/tmm/wagmi/commit/f81c15665e2e71534f84ada3fa705f2d78627472) Thanks [@holic](https://github.com/holic)! - Add `ProviderRpcError` and `RpcError` error classes.

  Certain wagmi-standardized errors may wrap `ProviderRpcError` or `RpcError`. For these cases, you can access the original provider rpc or rpc error value using the `internal` property.

* [#459](https://github.com/tmm/wagmi/pull/459) [`72dcf7c`](https://github.com/tmm/wagmi/commit/72dcf7c09e814261b2e43a8fa364c57675c472de) Thanks [@tmm](https://github.com/tmm)! - update dependencies

- [#473](https://github.com/tmm/wagmi/pull/473) [`a54f3e2`](https://github.com/tmm/wagmi/commit/a54f3e23ea385ed8aa4ad188128d7089ba20f83e) Thanks [@cesargdm](https://github.com/cesargdm)! - Add workaround for CoinbaseWalletSDK import on esbuild

* [#447](https://github.com/tmm/wagmi/pull/447) [`b9ebf78`](https://github.com/tmm/wagmi/commit/b9ebf782e0900725bcb76483686b30f09d357ebd) Thanks [@tmm](https://github.com/tmm)! - Fix case where connector disconnected while app was closed and stale data was returned when autoconnecting. For example, [MetaMask was locked](https://github.com/tmm/wagmi/issues/444) when page was closed.

## 0.2.5

### Patch Changes

- [`4e03666`](https://github.com/tmm/wagmi/commit/4e03666428d42fc9186c617001b5eb356229677e) Thanks [@tmm](https://github.com/tmm)! - bump dependencies #429
  add imToken support for WC switch chains #432
  fix MetaMask and Brave Wallet collision #436

## 0.2.4

### Patch Changes

- [#421](https://github.com/tmm/wagmi/pull/421) [`a232b3f`](https://github.com/tmm/wagmi/commit/a232b3ff5cc41e882c4d2a34c599a8cb670edd2b) Thanks [@tmm](https://github.com/tmm)! - fix erc721 abi

## 0.2.3

### Patch Changes

- [#412](https://github.com/tmm/wagmi/pull/412) [`80bef4f`](https://github.com/tmm/wagmi/commit/80bef4ff3f714b0b8f896f1b4b658acc7266299b) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Import providers from `ethers` peer dependency rather than `@ethersproject/providers` to avoid multiple conflicting versions being installed

## 0.2.2

### Patch Changes

- [`018c2a1`](https://github.com/tmm/wagmi/commit/018c2a11b22ee513571cc7f83fd63f7eb169ee70) Thanks [@tmm](https://github.com/tmm)! - - warn and fallback to default client #380

  - remove signerOrProvider option from read contract #390

  - MetaMaskConnector #391

## 0.2.1

### Patch Changes

- [`afc4607`](https://github.com/tmm/wagmi/commit/afc46071e91601ab8a2b465524da796cd60b6ad4) Thanks [@tmm](https://github.com/tmm)! - - Fix time scaling e9593df
  - Use fully-specified path for use-sync-external-store import 7b235c1
  - Update serialize 236fc17

## 0.2.0

### Minor Changes

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - don't persist account data when `autoConnect` is falsy

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - fix(@wagmi/core): persist connector chains to local storage

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Initial 0.3.0 release

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Add `cacheOnBlock` config for `useContractRead`
  Update `react-query` to v4
  Fix `watchBlockNumber` listener leak

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - add `connecting` event to connectors

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - Fix issue where `getProvider` was not being awaited in `getSigner`

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - - remove storage persistence of `connector`
  - add `chains` to client state

### Patch Changes

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - add chainId to actions and hooks

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - showtime

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - improve type support for ethers providers

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update zustand

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update babel target

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - update block explorers and rpc urls structure

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - keep previous data when watching

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - republish

- [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - fix stale connectors when switching chains

* [#311](https://github.com/tmm/wagmi/pull/311) [`24ce011`](https://github.com/tmm/wagmi/commit/24ce0113022b890e9582c6cc24035926e0d2b32d) Thanks [@tmm](https://github.com/tmm)! - last beta

## 0.2.0-next.18

### Patch Changes

- showtime

## 0.2.0-next.17

### Patch Changes

- update block explorers and rpc urls structure

## 0.2.0-next.16

### Patch Changes

- last beta

## 0.2.0-next.15

### Patch Changes

- update zustand

## 0.2.0-next.14

### Minor Changes

- Add `cacheOnBlock` config for `useContractRead`
- Update `react-query` to v4
- Fix `watchBlockNumber` listener leak

## 0.2.0-next.13

### Patch Changes

- keep previous data when watching

## 0.2.0-next.12

### Patch Changes

- add chainId to actions and hooks

## 0.2.0-next.11

### Patch Changes

- fix stale connectors when switching chains

## 0.2.0-next.10

### Patch Changes

- republish

## 0.2.0-next.9

### Patch Changes

- improve type support for ethers providers

## 0.2.0-next.8

### Patch Changes

- update babel target

## 0.2.0-next.7

### Minor Changes

- - Favour `message` event over `connecting` event to conform to EIP-1193
  - Export `useWaitForTransaction`

## 0.2.0-next.6

### Minor Changes

- add `connecting` event to connectors

## 0.2.0-next.5

### Minor Changes

- don't persist account data when `autoConnect` is falsy

## 0.2.0-next.4

### Minor Changes

- remove storage persistence of `connector`
- add `chains` to client state

## 0.2.0-next.3

### Minor Changes

- Fix issue where `getProvider` was not being awaited in `getSigner`

## 0.2.0-next.2

### Minor Changes

- fix: persist connector chains to local storage

## 0.2.0-next.1

### Minor Changes

- Initial 0.3.0 release

## 0.1.22

### Patch Changes

- [`747d895`](https://github.com/tmm/wagmi/commit/747d895a54b562958afde34b1d34e81ab5039e2c) Thanks [@tmm](https://github.com/tmm)! - add warning to WalletLinkConnector

## 0.1.21

### Patch Changes

- [`c858c51`](https://github.com/tmm/wagmi/commit/c858c51b44d9039f1d0db5bcf016639f47d1931f) Thanks [@tmm](https://github.com/tmm)! - update coinbase connector

## 0.1.20

### Patch Changes

- [#326](https://github.com/tmm/wagmi/pull/326) [`36e6989`](https://github.com/tmm/wagmi/commit/36e69894f4c27aaad7fb6d678476c8bb870244bb) Thanks [@0xGabi](https://github.com/0xGabi)! - Add Gnosis Chain

## 0.1.19

### Patch Changes

- [`d467df6`](https://github.com/tmm/wagmi/commit/d467df6374210dbc4b016788b4beb4fded54cb4d) Thanks [@tmm](https://github.com/tmm)! - fix global type leaking

## 0.1.18

### Patch Changes

- [#294](https://github.com/tmm/wagmi/pull/294) [`1d253f3`](https://github.com/tmm/wagmi/commit/1d253f3a59b61d24c88d25c99decd84a6c734e5d) Thanks [@tmm](https://github.com/tmm)! - change babel target

## 0.1.17

### Patch Changes

- [#292](https://github.com/tmm/wagmi/pull/292) [`53c9be1`](https://github.com/tmm/wagmi/commit/53c9be17ee0c2ae6b8f34f2351b8858257b3f5f2) Thanks [@tmm](https://github.com/tmm)! - fix private fields

## 0.1.16

### Patch Changes

- [`79a2499`](https://github.com/tmm/wagmi/commit/79a249989029f818c32c0e84c0dd2c75e8aa990a) Thanks [@tmm](https://github.com/tmm)! - update build target to es2021

## 0.1.15

### Patch Changes

- [`f9790b5`](https://github.com/tmm/wagmi/commit/f9790b55600df09c77bb8ca349c5a3457df1b07c) Thanks [@tmm](https://github.com/tmm)! - fix WalletConnect issue

## 0.1.14

### Patch Changes

- [#236](https://github.com/tmm/wagmi/pull/236) [`53bad61`](https://github.com/tmm/wagmi/commit/53bad615788764e31121678083c382c1bd042fe8) Thanks [@markdalgleish](https://github.com/markdalgleish)! - Updated `@walletconnect/ethereum-provider` to [v1.7.4](https://github.com/WalletConnect/walletconnect-monorepo/releases/tag/1.7.4)

## 0.1.13

### Patch Changes

- [`8e9412a`](https://github.com/tmm/wagmi/commit/8e9412af71958301ae2f9748febb936e79900aa0) Thanks [@tmm](https://github.com/tmm)! - bump walletlink

## 0.1.12

### Patch Changes

- [#210](https://github.com/tmm/wagmi/pull/210) [`684468a`](https://github.com/tmm/wagmi/commit/684468aee3e42a1ce2b4b599f3f17d1819213de8) Thanks [@tmm](https://github.com/tmm)! - update chains to match chainslist.org

## 0.1.11

### Patch Changes

- [#195](https://github.com/tmm/wagmi/pull/195) [`25b6083`](https://github.com/tmm/wagmi/commit/25b6083a662a0236794d1765343467691421c14b) Thanks [@tmm](https://github.com/tmm)! - rename wagmi-private to wagmi-core

## 0.1.10

### Patch Changes

- [#192](https://github.com/tmm/wagmi/pull/192) [`428cedb`](https://github.com/tmm/wagmi/commit/428cedb3dec4e3e4b9f4559c8e65932e05f94e05) Thanks [@tmm](https://github.com/tmm)! - rename core and testing packages

## 0.1.9

### Patch Changes

- [#190](https://github.com/tmm/wagmi/pull/190) [`7034bb8`](https://github.com/tmm/wagmi/commit/7034bb868412b9f481b206371280e84c2d52706d) Thanks [@tmm](https://github.com/tmm)! - add shim for metamask chain changed to prevent disconnect

## 0.1.8

### Patch Changes

- [#137](https://github.com/tmm/wagmi/pull/137) [`dceeb43`](https://github.com/tmm/wagmi/commit/dceeb430d9021fbf98366859cb1cd0149e80c55c) Thanks [@tmm](https://github.com/tmm)! - add siwe guide

## 0.1.7

### Patch Changes

- [#127](https://github.com/tmm/wagmi/pull/127) [`f05b031`](https://github.com/tmm/wagmi/commit/f05b0310f7f7e6447e9b6c81cedbb27dcf2f3649) Thanks [@tmm](https://github.com/tmm)! - update switch chain return type

## 0.1.6

### Patch Changes

- [`1412eed`](https://github.com/tmm/wagmi/commit/1412eed0d1494bb4f8c6845a0e890f79e4e68e03) Thanks [@tmm](https://github.com/tmm)! - add frame to injected

## 0.1.5

### Patch Changes

- [`e338c3b`](https://github.com/tmm/wagmi/commit/e338c3b6cc255742be6a67593aa5da6c17e90fbd) Thanks [@tmm](https://github.com/tmm)! - checksum connector address on change events

  add shim to injected connector for simulating disconnect

## 0.1.4

### Patch Changes

- [`0176c4e`](https://github.com/tmm/wagmi/commit/0176c4e83fb0c5f159c3c802a1da3d6deb2184ae) Thanks [@tmm](https://github.com/tmm)! - added switchChain to WalletConnect and WalletLink connectors

## 0.1.3

### Patch Changes

- [`071d7fb`](https://github.com/tmm/wagmi/commit/071d7fbca35ec4832700b5343661ceb2dae20598) Thanks [@tmm](https://github.com/tmm)! - add hardhat chain

## 0.1.2

### Patch Changes

- [`78bade9`](https://github.com/tmm/wagmi/commit/78bade9d0da97ab38a7e6594c34e3841ec1c8fe6) Thanks [@tmm](https://github.com/tmm)! - add type definitions

## 0.1.1

### Patch Changes

- [#56](https://github.com/tmm/wagmi/pull/56) [`2ebfd8e`](https://github.com/tmm/wagmi/commit/2ebfd8e85b560f25cd46cff04619c84643cab297) Thanks [@tmm](https://github.com/tmm)! - add chain support status

## 0.1.0

### Minor Changes

- [#52](https://github.com/tmm/wagmi/pull/52) [`da7a3a6`](https://github.com/tmm/wagmi/commit/da7a3a615def2443f65c041999100ce35e9774cc) Thanks [@tmm](https://github.com/tmm)! - Moves connectors to their own entrypoints to reduce bundle size.

  ```ts
  // old - WalletLinkConnector unused, but still in final bundle
  import { InjectedConnector, WalletConnectConnector } from "wagmi";

  // new - WalletLinkConnector not in final bundle
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
  ```

## 0.0.17

### Patch Changes

- [#25](https://github.com/tmm/wagmi/pull/25) [`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175) Thanks [@tmm](https://github.com/tmm)! - update response types

## 0.0.16

### Patch Changes

- [`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba) Thanks [@tmm](https://github.com/tmm)! - add better type information for contract results

## 0.0.15

### Patch Changes

- [`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879) Thanks [@tmm](https://github.com/tmm)! - make contract read and write execute overrides param optional

## 0.0.14

### Patch Changes

- [`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408) Thanks [@tmm](https://github.com/tmm)! - add once to contract event

## 0.0.13

### Patch Changes

- [`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93) Thanks [@tmm](https://github.com/tmm)! - update readme

## 0.0.12

### Patch Changes

- [#19](https://github.com/tmm/wagmi/pull/19) [`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc) Thanks [@tmm](https://github.com/tmm)! - remove console log from walletlink connector

## 0.0.11

### Patch Changes

- [#17](https://github.com/tmm/wagmi/pull/17) [`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49) Thanks [@tmm](https://github.com/tmm)! - standardize connector provider

## 0.0.10

### Patch Changes

- [#15](https://github.com/tmm/wagmi/pull/15) [`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616) Thanks [@tmm](https://github.com/tmm)! - read and write contract functions

## 0.0.9

### Patch Changes

- [#13](https://github.com/tmm/wagmi/pull/13) [`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313) Thanks [@tmm](https://github.com/tmm)! - add testing package

## 0.0.8

### Patch Changes

- [`5332500`](https://github.com/tmm/wagmi/commit/5332500918ac240d29ffe4d2aed8566a8ac001e4) Thanks [@tmm](https://github.com/tmm)! - update signing

## 0.0.7

### Patch Changes

- [`0bff89a`](https://github.com/tmm/wagmi/commit/0bff89ab2ad28b2cb9b346d1ac870e859d9278bc) Thanks [@tmm](https://github.com/tmm)! - update injected connector

## 0.0.6

### Patch Changes

- [`37d39d1`](https://github.com/tmm/wagmi/commit/37d39d174ddfa122462bbe2d02141cd61eb9db4a) Thanks [@tmm](https://github.com/tmm)! - add message signing

## 0.0.5

### Patch Changes

- [`d7d94f0`](https://github.com/tmm/wagmi/commit/d7d94f06f7d30468e5e39d64db63124c6315cf82) Thanks [@tmm](https://github.com/tmm)! - fix injected connector name

## 0.0.4

### Patch Changes

- [`29fbe29`](https://github.com/tmm/wagmi/commit/29fbe2920046b9e87a34faa04500ccf3c4f83748) Thanks [@tmm](https://github.com/tmm)! - fix external deps

## 0.0.3

### Patch Changes

- [#6](https://github.com/tmm/wagmi/pull/6) [`8dc3a5d`](https://github.com/tmm/wagmi/commit/8dc3a5d5f418813b09663534fe585d9bcf94dbeb) Thanks [@tmm](https://github.com/tmm)! - clean up deps

## 0.0.2

### Patch Changes

- [#4](https://github.com/tmm/wagmi/pull/4) [`2fbd821`](https://github.com/tmm/wagmi/commit/2fbd8216379bd03c9cc5c06b10b75637e75cb7d8) Thanks [@tmm](https://github.com/tmm)! - init changesets
