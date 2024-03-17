# @wagmi/cli

## 2.1.3

### Patch Changes

- [#3660](https://github.com/wevm/wagmi/pull/3660) [`11a22a23`](https://github.com/wevm/wagmi/commit/11a22a23d88c025cde9c91610e9ddf62cd4fa650) Thanks [@JazzBashara](https://github.com/JazzBashara)! - Replaced SnowTrace with SnowScan for the Etherscan plugin

## 2.1.2

### Patch Changes

- [#3641](https://github.com/wevm/wagmi/pull/3641) [`0a866403`](https://github.com/wevm/wagmi/commit/0a866403182ea6b8ba7f976c45be294e48fb7de8) Thanks [@cmwhited](https://github.com/cmwhited)! - Added Arbitrum Sepolia testnet to Etherscan plugin

- [#3633](https://github.com/wevm/wagmi/pull/3633) [`a1d3d1ab`](https://github.com/wevm/wagmi/commit/a1d3d1ab2b023c61c0dbb5d7bf867a9fca673630) Thanks [@pegahcarter](https://github.com/pegahcarter)! - Added Fraxtal to Etherscan plugin

- [#3616](https://github.com/wevm/wagmi/pull/3616) [`2a9f4473`](https://github.com/wevm/wagmi/commit/2a9f4473adc5bcdddf388389387ed5459583769e) Thanks [@petermazzocco](https://github.com/petermazzocco)! - Added Holesky Testnet to Etherscan Plugin

## 2.1.1

### Patch Changes

- [#3579](https://github.com/wevm/wagmi/pull/3579) [`a057919c`](https://github.com/wevm/wagmi/commit/a057919ca3942adeed90af2e343403dc5274e84c) Thanks [@FaisalAli19](https://github.com/FaisalAli19)! - Added Optimism Sepolia Etherscan support

## 2.1.0

### Minor Changes

- [#3506](https://github.com/wevm/wagmi/pull/3506) [`134eb4a1`](https://github.com/wevm/wagmi/commit/134eb4a1e0e29aab87bd5c7cdf05b06dfd7c4fc4) Thanks [@vmaark](https://github.com/vmaark)! - Added resolution of TypeScript Wagmi CLI config to determine if TypeScript generated output is allowed.

## 2.0.4

### Patch Changes

- [#3462](https://github.com/wevm/wagmi/pull/3462) [`d25573ea`](https://github.com/wevm/wagmi/commit/d25573ea03358f967953e37c176b220a7b341769) Thanks [@cruzdanilo](https://github.com/cruzdanilo)! - Upgraded dependencies

## 2.0.3

### Patch Changes

- [#3410](https://github.com/wevm/wagmi/pull/3410) [`55e31c3e`](https://github.com/wevm/wagmi/commit/55e31c3e96c2cbd1d9eb44e5a89f4365489c8310) Thanks [@o-az](https://github.com/o-az)! - Fixed actions plugin issue where `functionName` was used instead of `eventName` for generated contract event actions.

## 2.0.2

### Patch Changes

- [#3371](https://github.com/wevm/wagmi/pull/3371) [`8294d9e5`](https://github.com/wevm/wagmi/commit/8294d9e5b358018ba869b2018cd7ed95462e021f) Thanks [@iceanddust](https://github.com/iceanddust)! - Fixed prop name when generating contract event watch hooks

## 2.0.1

### Major Changes

- [#3333](https://github.com/wevm/wagmi/pull/3333) [`b3a0baaa`](https://github.com/wevm/wagmi/commit/b3a0baaaee7decf750d376aab2502cd33ca4825a) Thanks [@tmm](https://github.com/tmm)! - Wagmi CLI 2.0.

  [Breaking Changes & Migration Guide](https://wagmi.sh/cli/guides/migrate-from-v1-to-v2)

## 1.5.2

### Patch Changes

- [#3051](https://github.com/wagmi-dev/wagmi/pull/3051) [`4704d351`](https://github.com/wagmi-dev/wagmi/commit/4704d351164d39704a4e375c06525554fcc8340e) Thanks [@oxSaturn](https://github.com/oxSaturn)! - Fixed ESM require issue for prettier

## 1.5.1

### Patch Changes

- [#3035](https://github.com/wagmi-dev/wagmi/pull/3035) [`187bf96c`](https://github.com/wagmi-dev/wagmi/commit/187bf96c9fd31675b9d17a7cb4d4e24eea3fa777) Thanks [@cruzdanilo](https://github.com/cruzdanilo)! - ignore foundry invariant lib

## 1.5.0

### Minor Changes

- [#2956](https://github.com/wevm/wagmi/pull/2956) [`2abeb285`](https://github.com/wevm/wagmi/commit/2abeb285674af3e539cc2550b1f5027b1eb0c895) Thanks [@tmm](https://github.com/tmm)! - Replaced `@wagmi/chains` with `viem/chains`.

## 1.4.1

### Patch Changes

- [#2962](https://github.com/wevm/wagmi/pull/2962) [`8ac5b572`](https://github.com/wevm/wagmi/commit/8ac5b57254f77eeb0e07dd83f7d49f396d4581d8) Thanks [@tmm](https://github.com/tmm)! - Fixed esbuild version

## 1.4.0

### Minor Changes

- [#2946](https://github.com/wevm/wagmi/pull/2946) [`1c3228bf`](https://github.com/wevm/wagmi/commit/1c3228bf3fe99b0900b2c9a223c9b81c70bdcd90) Thanks [@tomquirk](https://github.com/tomquirk)! - Added default chain ID to generated `useContractRead` hook.

### Patch Changes

- [#2547](https://github.com/wevm/wagmi/pull/2547) [`8c3889fe`](https://github.com/wevm/wagmi/commit/8c3889fe82c5a1ddb29e74e3863ea6f4917b777a) Thanks [@Iamshankhadeep](https://github.com/Iamshankhadeep)! - Deterministic CLI output

- [#2958](https://github.com/wevm/wagmi/pull/2958) [`b31f36d5`](https://github.com/wevm/wagmi/commit/b31f36d522a634f53d44349d6a9ea47f59d84d7a) Thanks [@tmm](https://github.com/tmm)! - Removed generated file header

- [#2960](https://github.com/wevm/wagmi/pull/2960) [`5d4c4592`](https://github.com/wevm/wagmi/commit/5d4c4592009568cd0b096906a424f27469721a42) Thanks [@tmm](https://github.com/tmm)! - Updated esbuild version

## 1.3.0

### Minor Changes

- [#2616](https://github.com/wevm/wagmi/pull/2616) [`c282a8f7`](https://github.com/wevm/wagmi/commit/c282a8f786d57fec77c931fe99dc20220e843bc8) Thanks [@portdeveloper](https://github.com/portdeveloper)! - Added sepolia chain id

## 1.2.1

### Patch Changes

- [#2607](https://github.com/wevm/wagmi/pull/2607) [`79335b4c`](https://github.com/wevm/wagmi/commit/79335b4c0fcd5e8152a2a1d28314c634db9d9cbf) Thanks [@roninjin10](https://github.com/roninjin10)! - Fixed opitmism goerli chain id

## 1.2.0

### Minor Changes

- [#2536](https://github.com/wevm/wagmi/pull/2536) [`85e9760a`](https://github.com/wevm/wagmi/commit/85e9760a140cb169ac6236d9466b96e2105dd193) Thanks [@tmm](https://github.com/tmm)! - Changed `Address` type import from ABIType to viem.

## 1.1.0

### Minor Changes

- [#2482](https://github.com/wevm/wagmi/pull/2482) [`8764b54a`](https://github.com/wevm/wagmi/commit/8764b54aab68020063946112e8fe52aff650c99c) Thanks [@tmm](https://github.com/tmm)! - Bumped minimum TypeScript version to v5.0.4.

### Patch Changes

- [#2484](https://github.com/wevm/wagmi/pull/2484) [`3adf1f4f`](https://github.com/wevm/wagmi/commit/3adf1f4feab863cb7b5d52c81ad46f7e4eb56f09) Thanks [@jxom](https://github.com/jxom)! - Updated `abitype` to 0.8.7

- [#2484](https://github.com/wevm/wagmi/pull/2484) [`3adf1f4f`](https://github.com/wevm/wagmi/commit/3adf1f4feab863cb7b5d52c81ad46f7e4eb56f09) Thanks [@jxom](https://github.com/jxom)! - Updated references.

## 1.0.3

### Patch Changes

- [#2441](https://github.com/wevm/wagmi/pull/2441) [`326edee4`](https://github.com/wevm/wagmi/commit/326edee4bc85db84a7a4e3768e33785849ab8d8e) Thanks [@tmm](https://github.com/tmm)! - Fixed internal type issue

## 1.0.2

### Patch Changes

- [#2430](https://github.com/wevm/wagmi/pull/2430) [`71d92029`](https://github.com/wevm/wagmi/commit/71d92029ee4344842cd41698858a330fee95b6e0) Thanks [@tmm](https://github.com/tmm)! - Added message when command is not found.

## 1.0.1

### Patch Changes

- [`ea651cd7`](https://github.com/wevm/wagmi/commit/ea651cd7fc75b7866272605467db11fd6e1d81af) Thanks [@jxom](https://github.com/jxom)! - Downgraded abitype.

## 1.0.0

### Major Changes

- [#2235](https://github.com/wevm/wagmi/pull/2235) [`5be0655c`](https://github.com/wevm/wagmi/commit/5be0655c8e48b25d38009022461fbf611af54349) Thanks [@jxom](https://github.com/jxom)! - Released v1. Read [Migration Guide](https://next.wagmi.sh/react/migration-guide#1xx-breaking-changes).

## 1.0.0-next.7

### Patch Changes

- Fixed react plugin generic.

## 1.0.0-next.6

### Major Changes

- Updated references.

## 1.0.0-next.5

### Major Changes

- Added `config.setConnectors`

## 1.0.0-next.4

### Major Changes

- Updated viem.
  Removed `goerli` export from main entrypoint.

## 1.0.0-next.3

### Major Changes

- Updated references.

## 1.0.0-next.2

### Major Changes

- Updated dependencies

### Patch Changes

- Updated dependencies []:
  - @wagmi/chains@1.0.0-next.0

## 1.0.0-next.1

### Major Changes

- updated viem

## 1.0.0-next.0

### Major Changes

- [`a7dda00c`](https://github.com/wevm/wagmi/commit/a7dda00c5b546f8b2c42b527e4d9ac1b9e9ab1fb) Thanks [@jxom](https://github.com/jxom)! - Released v1.

### Patch Changes

- Updated dependencies [[`a7dda00c`](https://github.com/wevm/wagmi/commit/a7dda00c5b546f8b2c42b527e4d9ac1b9e9ab1fb)]:
  - @wagmi/core@1.0.0-next.0
  - wagmi@1.0.0-next.0

## 0.1.15

### Patch Changes

- [#2145](https://github.com/wevm/wagmi/pull/2145) [`2520743c`](https://github.com/wevm/wagmi/commit/2520743c417a158a00d5edca13a9aa92cefb0cfd) Thanks [@tmm](https://github.com/tmm)! - Fixed issue using Hardhat Plugin with npm.

## 0.1.14

### Patch Changes

- [#2039](https://github.com/wevm/wagmi/pull/2039) [`bac893ab`](https://github.com/wevm/wagmi/commit/bac893ab26012d4d8741c4f80e8b8813aee26f0c) Thanks [@tmm](https://github.com/tmm)! - Updated references.

- [#2039](https://github.com/wevm/wagmi/pull/2039) [`bac893ab`](https://github.com/wevm/wagmi/commit/bac893ab26012d4d8741c4f80e8b8813aee26f0c) Thanks [@tmm](https://github.com/tmm)! - Fixed Actions plugin `overridePackageName` option.

## 0.1.13

### Patch Changes

- [#2000](https://github.com/wevm/wagmi/pull/2000) [`01254765`](https://github.com/wevm/wagmi/commit/01254765eb37b77aca26500c00c721f08a260912) Thanks [@tmm](https://github.com/tmm)! - Fixed React plugin name conflict.

## 0.1.12

### Patch Changes

- [#1992](https://github.com/wevm/wagmi/pull/1992) [`efc93cad`](https://github.com/wevm/wagmi/commit/efc93cadacdb9c9960644dabe4ae837d384df52b) Thanks [@tmm](https://github.com/tmm)! - Refactored internals from ethers to viem.

## 0.1.11

### Patch Changes

- [#1916](https://github.com/wevm/wagmi/pull/1916) [`950490fd`](https://github.com/wevm/wagmi/commit/950490fd132b3fb5b3455e77b58d70f134b8e5c9) Thanks [@technophile-04](https://github.com/technophile-04)! - Updated React plugin to use `Address` type instead of hardcoding `` `0x{string}` ``.

## 0.1.10

### Patch Changes

- [#1892](https://github.com/wevm/wagmi/pull/1892) [`d3d6973b`](https://github.com/wevm/wagmi/commit/d3d6973ba9407e490140d2434eb83aad88d6e10d) Thanks [@greg-schrammel](https://github.com/greg-schrammel)! - Fixed generated read hooks `select` type.

## 0.1.9

### Patch Changes

- [#1886](https://github.com/wevm/wagmi/pull/1886) [`36e119c6`](https://github.com/wevm/wagmi/commit/36e119c6d4bc28a7ae15c9602d0c613bc9681356) Thanks [@roninjin10](https://github.com/roninjin10)! - Fixed package detection for yarn^3

## 0.1.8

### Patch Changes

- [#1884](https://github.com/wevm/wagmi/pull/1884) [`cc03bb44`](https://github.com/wevm/wagmi/commit/cc03bb44268874f95203de67f6d32586e34c0857) Thanks [@roninjin10](https://github.com/roninjin10)! - Added better compatibility for yarn@^3 in `@wagmi/cli`.

## 0.1.7

### Patch Changes

- [#1841](https://github.com/wevm/wagmi/pull/1841) [`cb707f01`](https://github.com/wevm/wagmi/commit/cb707f01cbdcc62a70cf5c8a162d77948d6b6a56) Thanks [@tmm](https://github.com/tmm)! - Added [Sourcify](https://sourcify.dev) CLI plugin.

## 0.1.6

### Patch Changes

- [#1803](https://github.com/wevm/wagmi/pull/1803) [`09b13538`](https://github.com/wevm/wagmi/commit/09b13538abcde879034293cae39551c30cc81445) Thanks [@shotaronowhere](https://github.com/shotaronowhere)! - Swapped deprecated Arbitrum Rinkeby for Arbitrum Goerli URL for Etherscan Plugin.

## 0.1.5

### Patch Changes

- [#1788](https://github.com/wevm/wagmi/pull/1788) [`c3e16d82`](https://github.com/wevm/wagmi/commit/c3e16d82c9c39b8b1c2f3c51037e11d642a20cd6) Thanks [@tmm](https://github.com/tmm)! - Fixed CLI import

## 0.1.4

### Patch Changes

- [#1779](https://github.com/wevm/wagmi/pull/1779) [`97346750`](https://github.com/wevm/wagmi/commit/973467505dc2bb46198a3e9fe6072306170d24c0) Thanks [@tmm](https://github.com/tmm)! - Made `project` optional for Foundry plugin

## 0.1.3

### Patch Changes

- [#1754](https://github.com/wevm/wagmi/pull/1754) [`298728b5`](https://github.com/wevm/wagmi/commit/298728b5918fa15b6b5b082597204a268d4b01f1) Thanks [@tmm](https://github.com/tmm)! - Updated project resolution for Foundry and Hardhat plugins.

- [#1738](https://github.com/wevm/wagmi/pull/1738) [`37c221d0`](https://github.com/wevm/wagmi/commit/37c221d0f4d175084e23a6b172d72f177bfa0c81) Thanks [@roninjin10](https://github.com/roninjin10)! - Added automatic Foundry config detection for artifacts directory.

## 0.1.2

### Patch Changes

- [#1743](https://github.com/wevm/wagmi/pull/1743) [`379315fa`](https://github.com/wevm/wagmi/commit/379315fa359c3118b5d200ec50db3812b0cdd984) Thanks [@kyscott18](https://github.com/kyscott18)! - Add celoscan to `etherscan` plugin

## 0.1.1

### Patch Changes

- [#1736](https://github.com/wevm/wagmi/pull/1736) [`7c43e431`](https://github.com/wevm/wagmi/commit/7c43e431e2eb970610cc6490cee6a4093655a683) Thanks [@tmm](https://github.com/tmm)! - Fixed generated address object key type.

## 0.1.0

### Minor Changes

- [#1732](https://github.com/wevm/wagmi/pull/1732) [`01e21897`](https://github.com/wevm/wagmi/commit/01e2189747a5c22dc758c6d719b4145adc2a643c) Thanks [@tmm](https://github.com/tmm)! - Initial release
