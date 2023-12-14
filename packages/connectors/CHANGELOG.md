# @wagmi/connectors

## 3.1.10

### Patch Changes

- [`53ca1f7e`](https://github.com/wevm/wagmi/commit/53ca1f7eb411d912e11fcce7e03bd61ed067959c) Thanks [@tmm](https://github.com/tmm)! - Removed LedgerConnector due to security vulnerability

## 3.1.9

### Patch Changes

- [#3114](https://github.com/wevm/wagmi/pull/3114) [`51eca0fb`](https://github.com/wevm/wagmi/commit/51eca0fbaea6932f31a5b8b4213f0252280053e2) Thanks [@akathecoder](https://github.com/akathecoder)! - Added Okto Wallet to Injected Wallets Connector

- [#3299](https://github.com/wevm/wagmi/pull/3299) [`b02020b3`](https://github.com/wevm/wagmi/commit/b02020b3724e0228198f35817611bb063295906e) Thanks [@dasanra](https://github.com/dasanra)! - Fixed issue with [Safe SDK](https://github.com/wevm/viem/issues/579) by bumping `@safe-global/safe-apps-provider@0.18.1`

## 3.1.8

### Patch Changes

- [#3197](https://github.com/wevm/wagmi/pull/3197) [`e8f7bcbc`](https://github.com/wevm/wagmi/commit/e8f7bcbcd9c038a901c29e71769682c088efe2ac) Thanks [@ByteZhang1024](https://github.com/ByteZhang1024)! - Added OneKey Wallet to injected connector flags.

## 3.1.7

### Patch Changes

- [#3276](https://github.com/wevm/wagmi/pull/3276) [`83223a06`](https://github.com/wevm/wagmi/commit/83223a0659e2f675d897a1d3374c7af752c16abf) Thanks [@glitch-txs](https://github.com/glitch-txs)! - Removed required namespaces from WalletConnect connector

## 3.1.6

### Patch Changes

- [#3236](https://github.com/wevm/wagmi/pull/3236) [`cc7e18f2`](https://github.com/wevm/wagmi/commit/cc7e18f2e7f6b8b989f60f0b05aee70e996a9975) Thanks [@0xAsimetriq](https://github.com/0xAsimetriq)! - Updated @walletconnect/ethereum-provider

- [#3236](https://github.com/wevm/wagmi/pull/3236) [`cc7e18f2`](https://github.com/wevm/wagmi/commit/cc7e18f2e7f6b8b989f60f0b05aee70e996a9975) Thanks [@0xAsimetriq](https://github.com/0xAsimetriq)! - Updated @walletconnect/ethereum-provider

## 3.1.5

### Patch Changes

- [#3220](https://github.com/wagmi-dev/wagmi/pull/3220) [`a1950449`](https://github.com/wagmi-dev/wagmi/commit/a1950449127ddf72fff8ecd1fc34c3690befbb05) Thanks [@rkalis](https://github.com/rkalis)! - Fixed a bug where injected walets with an empty providers array could not connect

## 3.1.4

### Patch Changes

- [#3115](https://github.com/wagmi-dev/wagmi/pull/3115) [`4e6ec415`](https://github.com/wagmi-dev/wagmi/commit/4e6ec4151baece94e940e227e0e3711c7f8534d9) Thanks [@bifot](https://github.com/bifot)! - Added SafePal injected name mapping.

## 3.1.3

### Patch Changes

- [#3141](https://github.com/wagmi-dev/wagmi/pull/3141) [`e78aa337`](https://github.com/wagmi-dev/wagmi/commit/e78aa337c454f04b41a3cbd381d25270dd4a0afd) Thanks [@einaralex](https://github.com/einaralex)! - Updated WalletConnect libraries.

## 3.1.2

### Patch Changes

- [#3009](https://github.com/wagmi-dev/wagmi/pull/3009) [`3aaba328`](https://github.com/wagmi-dev/wagmi/commit/3aaba32808ddb4035ec885f96992c91078056715) Thanks [@0xAsimetriq](https://github.com/0xAsimetriq)! - Update WalletConnect dependencies

## 3.1.1

### Patch Changes

- [#2973](https://github.com/wagmi-dev/wagmi/pull/2973) [`bf831bb3`](https://github.com/wagmi-dev/wagmi/commit/bf831bb30df8037cc4312342d0fe3c045408c2fe) Thanks [@masm](https://github.com/masm)! - Added Zeal wallet

## 3.1.0

### Minor Changes

- [#2956](https://github.com/wagmi-dev/wagmi/pull/2956) [`2abeb285`](https://github.com/wagmi-dev/wagmi/commit/2abeb285674af3e539cc2550b1f5027b1eb0c895) Thanks [@tmm](https://github.com/tmm)! - Replaced `@wagmi/chains` with `viem/chains`.

## 3.0.0

### Patch Changes

- 0306383: Updated WalletConnect dependencies
- Updated dependencies [d1ef9b4]
- Updated dependencies [484c846]
  - @wagmi/chains@1.8.0

## 2.7.0

### Minor Changes

- a270cb9: Updated WalletConnect dependencies.

### Patch Changes

- 06cc1b4: Add SubWallet injected flags
- 131a337: Added Desig Wallet name mapping.
- e089d7d: Added Fordefi Wallet name mapping.
- ce84d0a: Added Coin98 Wallet injected flags.
- Updated dependencies [8fdacd8]
- Updated dependencies [2e9283a]
- Updated dependencies [a432a2b]
- Updated dependencies [408740a]
- Updated dependencies [6794a61]
- Updated dependencies [0c5a32b]
- Updated dependencies [ebc85ec]
- Updated dependencies [5683df2]
- Updated dependencies [414ff36]
- Updated dependencies [4f514c6]
- Updated dependencies [1cf72bc]
- Updated dependencies [cd68471]
- Updated dependencies [baf3143]
- Updated dependencies [9737f24]
- Updated dependencies [7797238]
- Updated dependencies [3846811]
- Updated dependencies [0ea344c]
  - @wagmi/chains@1.7.0

## 2.6.6

### Patch Changes

- 56c127d: Updated WalletConnect dependencies.
- Updated dependencies [4b411d2]
- Updated dependencies [df697ac]
- Updated dependencies [186f5a7]
- Updated dependencies [a96b514]
- Updated dependencies [0a6e6da]
  - @wagmi/chains@1.5.0

## 2.6.5

### Patch Changes

- 51e346e: Updated WalletConnectConnector logic to handle individual namespaces like eip155:\*

## 2.6.4

### Patch Changes

- 0a57de2: Added conditional for WalletConnectConnector optionalChains

## 2.6.3

### Patch Changes

- f2d532d: Updated WalletConnect dependencies, exposed `relayUrl` option for `WalletConnectConnector`
- ff53857: Fixed issue importing `EthereumProvider` in Vite environments.
- Updated dependencies [d642e1d]
- Updated dependencies [3027d7b]
- Updated dependencies [97dbd44]
  - @wagmi/chains@1.4.0

## 2.6.2

### Patch Changes

- 27bb1b3: Added explicit type annotations for the `getWalletClient()` method.

## 2.6.1

### Patch Changes

- a3507a9: Updated @walletconnect/ethereum-provider dependency

## 2.6.0

### Minor Changes

- 32dc317: Updated @walletconnect/ethereum-provider and @walletconnect/modal dependencies

## 2.5.0

### Minor Changes

- 57e674e: Updated `@safe-global/safe-apps-sdk` & `@safe-global/safe-apps-provider`

## 2.4.0

### Patch Changes

- f21c8e0: Added WalletConnect v2 support to Ledger connector.
- 27482bb: Add HAQQ Wallet detection
- 7d6aa43: Exported `normalizeChainId`.
- Updated dependencies [62b8209]
- Updated dependencies [106ac13]
- Updated dependencies [8b3f5e5]
  - @wagmi/chains@1.3.0

## 2.3.0

### Minor Changes

- 28219ae: Added metadata property to WalletConnect init function
- 6fef949: Updated @walletconnect/modal and @walletconnect/ethereum-provider deps

### Patch Changes

- 72f6465: Added `TTWallet` to `getInjectedName` list
- Updated dependencies [a7cbd04]
- Updated dependencies [f6ee133]
  - @wagmi/chains@1.2.0

## 2.2.0

### Minor Changes

- 6c841d4: Changed `Address` type import from ABIType to viem.

### Patch Changes

- 09c83f8: Update @walletconnect/ethereum-provider, Replace @web3modal/standalone with @walletconnect/modal, Fix issue with wallet_addEthereumChain method in WalletConnectConnector

## 2.1.1

### Patch Changes

- c24de75: Updated `@walletconnect/ethereum-provider` and `@web3modal/standalone` dependencies.
- 605c422: Bumped `viem` peer dependency.
- dc1c546: Throw ResourceUnavailableError on -30002 errors.

## 2.1.0

### Minor Changes

- b001569: Bumped minimum TypeScript version to v5.0.4.

### Patch Changes

- 0f05b2b: Updated `abitype` to `0.8.7`.
- 6aea7ee: Fixed internal types.
- b187cb0: Added `isNovaWallet` injected flag.
- 5e44429: Added Edgeware mainnet and testnet
- b18b314: Updated @walletconnect/ethereum-provider and @web3modal/standalone dependencies
- Updated dependencies [b62a199]
- Updated dependencies [b001569]
- Updated dependencies [260ab59]
- Updated dependencies [6aea7ee]
- Updated dependencies [5e44429]
  - @wagmi/chains@1.0.0

## 2.0.0

### Patch Changes

- Updated dependencies [36c14b2]
  - @wagmi/chains@0.3.0

## 1.0.5

### Patch Changes

- fa61dfe: Updated viem.
- Updated dependencies [577d2a0]
  - @wagmi/chains@0.2.25

## 1.0.4

### Patch Changes

- bbbd11b: Corrected Rabby Wallet name
- Updated dependencies [0639a1f]
  - @wagmi/chains@0.2.24

## 1.0.3

### Patch Changes

- 64dfe61: Update @web3modal/standalone to v2.4.1, Update @walletconnect/ethereum-provider to 2.7.4
- bab7ad8: Added Defiant to injected connector flags
- 44cde07: Added Talisman wallet flag

## 1.0.2

### Patch Changes

- bce5a0c: Removed chain fallback when instantiating a Wallet Client.

## 1.0.1

### Patch Changes

- [`ea651cd7`](https://github.com/wagmi-dev/wagmi/commit/ea651cd7fc75b7866272605467db11fd6e1d81af) Thanks [@jxom](https://github.com/jxom)! - Downgraded abitype.

## 1.0.0

### Major Changes

- 7e274f5: Released v1.

### Patch Changes

- 0966bf7: Changed Kucoin Wallet name mapping to Halo Wallet

## 1.0.0-next.5

### Major Changes

- Updated references.

## 1.0.0-next.4

### Major Changes

- Updated references.

## 1.0.0-next.3

### Patch Changes

- Updated dependencies []:
  - @wagmi/chains@1.0.0-next.0

## 1.0.0-next.2

### Major Changes

- updated viem

## 1.0.0-next.1

### Major Changes

- [`a7dda00c`](https://github.com/wagmi-dev/wagmi/commit/a7dda00c5b546f8b2c42b527e4d9ac1b9e9ab1fb) Thanks [@jxom](https://github.com/jxom)! - Released v1.

## 1.0.0-next.0

### Major Changes

- 33488cf: Released v1.

## 0.3.19

### Patch Changes

- 274eef3: - Updated @web3modal/standalone to 2.3.7
  - Updated @walletconnect/ethereum-provider to 2.7.1
- 41697df: Updated @walletconnect/ethereum-provider version to 2.7.2
- 82dcb72: Added Enkrypt extension detection

## 0.3.18

### Patch Changes

- f66e065: Added BlockWallet to injected connector flags.

## 0.3.17

### Patch Changes

- 12ab5d1: Updated @coinbase/wallet-sdk to 3.6.6

## 0.3.16

### Patch Changes

- c1e3ddf: Reverted ABIType version change.

## 0.3.15

### Patch Changes

- d4825e6: Fixed ABIType version to match downstream packages.

## 0.3.14

### Patch Changes

- c25ac82: Added more flags to `MetaMaskConnector` `getProvider` check.
- b19a932: Updated @web3modal/standalone to 2.3.0, @walletconnect/ethereum-provider to 2.7.0
- cdc387e: Added `ImToken` to `getInjectedName` list

## 0.3.13

### Patch Changes

- 2a21d27: Updated `@coinbase/wallet-sdk` to `3.6.4`

## 0.3.12

### Patch Changes

- 9bb22b6: Updated `@walletconnect/ethereum-provider` to `2.6.2`, relaxed `@web3modal/standalone` version requirement
- 0d7625b: Added Rabby to injected connector flags
- f63d7fd: Added correct error to switch network cause.

## 0.3.11

### Patch Changes

- 0778abc: Renamed `isTally` injected provider to `Taho`

## 0.3.10

### Patch Changes

- 4267020: Added `qrModalOptions` option to `WalletConnectConnector`
- e78fb0a: Pinned WalletConnect dependencies

## 0.3.9

### Patch Changes

- 5cd0afc: Added `isZerion` to `InjectedProviderFlags` and `getInjectedName`
- be4825e: Added GameStop Wallet to injected connector flags

## 0.3.8

### Patch Changes

- 11f3fe2: Fixed issue where `UNSTABLE_shimOnConnectSelectAccount` would not bubble up error for MetaMask if request to connect was already active.

## 0.3.7

### Patch Changes

- 04c0e47: Fixed issue switching chain after adding to MetaMask.

## 0.3.6

### Patch Changes

- 85330c1: Removed `InjectedConnector` `shimChainChangedDisconnect` shim (no longer necessary).

## 0.3.5

### Patch Changes

- 8b1a526: Added Dawn wallet flag

## 0.3.4

### Patch Changes

- 6b15d6f: Updated `@walletconnect/ethereum-provider` to `2.5.1`.
- 1f452e7: Added OKX Wallet to injected connector flags.
- a4d9083: Added Backpack wallet to injected connector flags.
- 6a4af48: Enabled support for programmatic chain switching on `LedgerConnector` & added `"ledger"` to the switch chain regex on `WalletConnectLegacyConnector`.

## 0.3.3

### Patch Changes

- f24ce0c: Updated @walletconnect/ethereum-provider to 2.4.8
- e3a3fee: Added "uniswap wallet" to the regex that determines wallets allowed to switch chains in the WalletConnect legacy connector
- 641af48: Added name mapping for Bifrost Wallet
- 4d2c90a: Added name mapping for Phantom
- 3d276d0: Added Status as the name of the injected connector for the Status App

## 0.3.2

### Patch Changes

- 13a6a07: Updated `@walletconnect/ethereum-provider` to `2.4.7`.

## 0.3.1

### Patch Changes

- a23c40f: Added name mapping for [Frontier](https://frontier.xyz) Wallet
- d779fb3: Added name mapping for HyperPay.

## 0.3.0

### Minor Changes

- c4d5bb5: **Breaking:** Removed the `version` config option for `WalletConnectConnector`.

  `WalletConnectConnector` now uses WalletConnect v2 by default. WalletConnect v1 is now `WalletConnectLegacyConnector`.

  ### WalletConnect v2

  ```diff
  import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'

  const connector = new WalletConnectConnector({
    options: {
  -   version: '2',
      projectId: 'abc',
    },
  })
  ```

  ### WalletConnect v1

  ```diff
  -import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'
  +import { WalletConnectLegacyConnector } from '@wagmi/connectors/walletConnectLegacy'

  -const connector = new WalletConnectConnector({
  +const connector = new WalletConnectLegacyConnector({
    options: {
      qrcode: true,
    },
  })
  ```

## 0.2.7

### Patch Changes

- 57f1226: Added name mapping for XDEFI

## 0.2.6

### Patch Changes

- bb1b88c: Added name mapping for Bitski injected wallet
- fcb5595: Fixed shim disconnect key to read from defined Connector ID.
- 49f8853: Fixed `SafeConnector` import type error that existed for specific build environments.

## 0.2.5

### Patch Changes

- 5d121f2: Added `isApexWallet` to injected `window.ethereum` flags.
- e3566eb: Updated `@web3modal/standalone` to `2.1.1` for WalletConnectConnector.

## 0.2.4

### Patch Changes

- a4f31bc: Added Connector for [Safe](https://safe.global) wallet
- d5e25d9: Locked ethers peer dependency version to >=5.5.1 <6

## 0.2.3

### Patch Changes

- 6fa74dd: Updated `@walletconnect/universal-provider`
  Added more signable methods to WC v2.

## 0.2.2

### Patch Changes

- 6b0725b: Fixed race condition between `switchNetwork` and mutation Hooks that use `chainId` (e.g. `sendTransaction`).

## 0.2.1

### Patch Changes

- 942fcde: Updated `@walletconnect/universal-provider` and `@web3modal/standalone` packages for WalletConnectConnector (v2).

  Improved initialization flow for `@walletconnect/universal-provider` for WalletConnectConnector (v2).

## 0.2.0

### Minor Changes

- be33c7d: Chains are now narrowed to their most specific type using the TypeScript [`satisfies`](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/#the-satisfies-operator) operator.

## 0.1.10

### Patch Changes

- d75e8d2: Fixed ABIType version mismatch between packages.

## 0.1.9

### Patch Changes

- 8c3fc00: Added public RPC URL to Connector fallback chains

## 0.1.8

### Patch Changes

- 5e6dc30: Replaced legacy qrcodemodal with web3modal for WalletConnect v2.

## 0.1.7

### Patch Changes

- be4add2: Added `isRainbow` flag to `InjectedConnector`.

## 0.1.6

### Patch Changes

- 3dfc558: Add `switchSigner` method to `MockProvider`.

## 0.1.5

### Patch Changes

- 7dce4b5: Bumped WalletConnect Universal Provider version.

## 0.1.4

### Patch Changes

- 4cec598: Added CJS escape hatch bundle under the "cjs" tag.

## 0.1.3

### Patch Changes

- 822bc88: The `WalletConnectConnector` now supports WalletConnect v2.

  It can be enabled by setting `version` to `'2'` and supplying a [WalletConnect Cloud `projectId`](https://cloud.walletconnect.com/sign-in).

## 0.1.2

### Patch Changes

- 5e5f37f: Fixed issue where connecting to MetaMask may return with a stale address

## 0.1.1

### Patch Changes

- 919790c: Updated `@ledgerhq/connect-kit-loader` to `1.0.1`

## 0.1.0

### Minor Changes

- 5db7cba: Added `LedgerConnector`
- 55a0ca2: Initial release of the `@wagmi/connectors` package – a collection of Connectors for wagmi.
