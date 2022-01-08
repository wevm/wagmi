# wagmi-testing

## 0.1.0

### Minor Changes

- [#52](https://github.com/tmm/wagmi/pull/52) [`da7a3a6`](https://github.com/tmm/wagmi/commit/da7a3a615def2443f65c041999100ce35e9774cc) Thanks [@tmm](https://github.com/tmm)! - Moves connectors to their own entrypoints to reduce bundle size.

  ```ts
  // old - WalletLinkConnector unused, but still in final bundle
  import { InjectedConnector, WalletConnectConnector } from 'wagmi'

  // new - WalletLinkConnector not in final bundle
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
  ```

### Patch Changes

- Updated dependencies [[`da7a3a6`](https://github.com/tmm/wagmi/commit/da7a3a615def2443f65c041999100ce35e9774cc)]:
  - wagmi-private@0.1.0

## 0.0.17

### Patch Changes

- [#25](https://github.com/tmm/wagmi/pull/25) [`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175) Thanks [@tmm](https://github.com/tmm)! - update response types

- Updated dependencies [[`9a7dab7`](https://github.com/tmm/wagmi/commit/9a7dab78b3518658bc7d85dc397990f0d28da175)]:
  - wagmi-private@0.0.17

## 0.0.16

### Patch Changes

- [`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba) Thanks [@tmm](https://github.com/tmm)! - add better type information for contract results

- Updated dependencies [[`d1574cf`](https://github.com/tmm/wagmi/commit/d1574cf5f7a578ccd480889c2e375134145a4aba)]:
  - wagmi-private@0.0.16

## 0.0.15

### Patch Changes

- [`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879) Thanks [@tmm](https://github.com/tmm)! - make contract read and write execute overrides param optional

- Updated dependencies [[`3909624`](https://github.com/tmm/wagmi/commit/39096249c1fa9516beabb11735beb67c94032879)]:
  - wagmi-private@0.0.15

## 0.0.14

### Patch Changes

- [`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408) Thanks [@tmm](https://github.com/tmm)! - add once to contract event

- Updated dependencies [[`63312e2`](https://github.com/tmm/wagmi/commit/63312e2b06b8d835abc2908cba399d941ca79408)]:
  - wagmi-private@0.0.14

## 0.0.13

### Patch Changes

- [`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93) Thanks [@tmm](https://github.com/tmm)! - update readme

- Updated dependencies [[`6f890b0`](https://github.com/tmm/wagmi/commit/6f890b0dabbdbea913ec91cb8bfc970c05ed0a93)]:
  - wagmi-private@0.0.13

## 0.0.12

### Patch Changes

- [#19](https://github.com/tmm/wagmi/pull/19) [`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc) Thanks [@tmm](https://github.com/tmm)! - remove console log from walletlink connector

- Updated dependencies [[`7bc1c47`](https://github.com/tmm/wagmi/commit/7bc1c47875e9ef24e9c79cfafc6b23e7a838b5bc)]:
  - wagmi-private@0.0.12

## 0.0.11

### Patch Changes

- [#17](https://github.com/tmm/wagmi/pull/17) [`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49) Thanks [@tmm](https://github.com/tmm)! - standardize connector provider

- Updated dependencies [[`571648b`](https://github.com/tmm/wagmi/commit/571648b754f7f538536bafc9387bd3104657ea49)]:
  - wagmi-private@0.0.11

## 0.0.10

### Patch Changes

- [#15](https://github.com/tmm/wagmi/pull/15) [`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616) Thanks [@tmm](https://github.com/tmm)! - read and write contract functions

- Updated dependencies [[`5f7675c`](https://github.com/tmm/wagmi/commit/5f7675c3ffd848522d4117c07c1f62b17dfc6616)]:
  - wagmi-private@0.0.10

## 0.0.9

### Patch Changes

- [#13](https://github.com/tmm/wagmi/pull/13) [`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313) Thanks [@tmm](https://github.com/tmm)! - add testing package

- Updated dependencies [[`e5545f5`](https://github.com/tmm/wagmi/commit/e5545f5565cf0bbf5e62ec7ccab3051705b1d313)]:
  - wagmi-private@0.0.9
