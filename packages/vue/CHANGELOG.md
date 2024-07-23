# @wagmi/vue

## 0.0.32

### Patch Changes

- [#4162](https://github.com/wevm/wagmi/pull/4162) [`a73a7737b756886b388f120ae423e72cca53e8a0`](https://github.com/wevm/wagmi/commit/a73a7737b756886b388f120ae423e72cca53e8a0) Thanks [@jxom](https://github.com/jxom)! - Added functionality for consumer-defined RPC URLs (`config.transports`) to be propagated to the WalletConnect & MetaMask Connectors.

- Updated dependencies [[`a73a7737b756886b388f120ae423e72cca53e8a0`](https://github.com/wevm/wagmi/commit/a73a7737b756886b388f120ae423e72cca53e8a0)]:
  - @wagmi/connectors@6.0.0
  - @wagmi/core@2.13.0

## 0.0.31

### Patch Changes

- [#4124](https://github.com/wevm/wagmi/pull/4124) [`26616462db2e0140025f22c505c4541cfecb9308`](https://github.com/wevm/wagmi/commit/26616462db2e0140025f22c505c4541cfecb9308) Thanks [@t0rbik](https://github.com/t0rbik)! - Updated `useConnectorClient` to be enabled when status is `'reconnecting'` or `'connected'` (previously was also enabled when status was `'connecting'`).

## 0.0.30

### Patch Changes

- Updated dependencies [[`5bc8c8877810b2eec24a829df87dce40a51e6f20`](https://github.com/wevm/wagmi/commit/5bc8c8877810b2eec24a829df87dce40a51e6f20), [`8d81df5cc884d0a210dedd3c1ea0e2e9e52b83c5`](https://github.com/wevm/wagmi/commit/8d81df5cc884d0a210dedd3c1ea0e2e9e52b83c5)]:
  - @wagmi/core@2.12.2
  - @wagmi/connectors@5.0.26

## 0.0.29

### Patch Changes

- [#4146](https://github.com/wevm/wagmi/pull/4146) [`cc996e08e930c9e88cf753a1e874652059e81a3b`](https://github.com/wevm/wagmi/commit/cc996e08e930c9e88cf753a1e874652059e81a3b) Thanks [@jxom](https://github.com/jxom)! - Updated `@safe-global/safe-apps-sdk` + `@safe-global/safe-apps-provider` dependencies.

- Updated dependencies [[`cc996e08e930c9e88cf753a1e874652059e81a3b`](https://github.com/wevm/wagmi/commit/cc996e08e930c9e88cf753a1e874652059e81a3b)]:
  - @wagmi/connectors@5.0.25
  - @wagmi/core@2.12.1

## 0.0.28

### Patch Changes

- [`b6cb1477e3e87984917b172a909f1968e0d77dc9`](https://github.com/wevm/wagmi/commit/b6cb1477e3e87984917b172a909f1968e0d77dc9) Thanks [@tmm](https://github.com/tmm)! - Added `useBytecode` composable.

- Updated dependencies [[`5581a810ef70308e99c6f8b630cd4bca59f64afc`](https://github.com/wevm/wagmi/commit/5581a810ef70308e99c6f8b630cd4bca59f64afc)]:
  - @wagmi/core@2.12.0
  - @wagmi/connectors@6.0.0

## 0.0.27

### Patch Changes

- [`d3814ab4b88f9f0e052b53bc3d458df87b43f01d`](https://github.com/wevm/wagmi/commit/d3814ab4b88f9f0e052b53bc3d458df87b43f01d) Thanks [@jxom](https://github.com/jxom)! - Updated `mipd` dependency.

- Updated dependencies [[`b08013eaa9ce97c02f8a7128ea400e3da7ef74bb`](https://github.com/wevm/wagmi/commit/b08013eaa9ce97c02f8a7128ea400e3da7ef74bb), [`d3814ab4b88f9f0e052b53bc3d458df87b43f01d`](https://github.com/wevm/wagmi/commit/d3814ab4b88f9f0e052b53bc3d458df87b43f01d)]:
  - @wagmi/core@2.11.8
  - @wagmi/connectors@5.0.23

## 0.0.26

### Patch Changes

- Updated dependencies [[`0bb8b562ae04ecfeb2d6b2f1b980ebae31dc127e`](https://github.com/wevm/wagmi/commit/0bb8b562ae04ecfeb2d6b2f1b980ebae31dc127e)]:
  - @wagmi/connectors@5.0.22
  - @wagmi/core@2.11.7

## 0.0.25

### Patch Changes

- [#4060](https://github.com/wevm/wagmi/pull/4060) [`95965c1f19d480b97f2b297a077a9e607dee32ad`](https://github.com/wevm/wagmi/commit/95965c1f19d480b97f2b297a077a9e607dee32ad) Thanks [@dalechyn](https://github.com/dalechyn)! - Bumped Tanstack Query dependencies to fix typing issues between exported Wagmi query options and TanStack Query suspense query methods (due to [`direction` property in `QueryFunctionContext` being deprecated](https://github.com/TanStack/query/pull/7410)).

- Updated dependencies [[`ff0760b5900114bcfdf420a9fba3cc278ac95afe`](https://github.com/wevm/wagmi/commit/ff0760b5900114bcfdf420a9fba3cc278ac95afe), [`95965c1f19d480b97f2b297a077a9e607dee32ad`](https://github.com/wevm/wagmi/commit/95965c1f19d480b97f2b297a077a9e607dee32ad)]:
  - @wagmi/connectors@5.0.21
  - @wagmi/core@2.11.6

## 0.0.24

### Patch Changes

- Updated dependencies [[`43fa971d34cac57fa5a2898ad4d839b95d7af37c`](https://github.com/wevm/wagmi/commit/43fa971d34cac57fa5a2898ad4d839b95d7af37c)]:
  - @wagmi/connectors@5.0.20

## 0.0.23

### Patch Changes

- Updated dependencies [[`b7ad208030d9f2e3f89912ff76b16cdbd848feda`](https://github.com/wevm/wagmi/commit/b7ad208030d9f2e3f89912ff76b16cdbd848feda)]:
  - @wagmi/connectors@5.0.19

## 0.0.22

### Patch Changes

- Updated dependencies [[`44d24620c9e3957f3245d14d6a042736371df70b`](https://github.com/wevm/wagmi/commit/44d24620c9e3957f3245d14d6a042736371df70b)]:
  - @wagmi/connectors@5.0.18

## 0.0.21

### Patch Changes

- Updated dependencies [[`04f2b846b113f3d300d82c9fa75212f1805817c5`](https://github.com/wevm/wagmi/commit/04f2b846b113f3d300d82c9fa75212f1805817c5)]:
  - @wagmi/core@2.11.5
  - @wagmi/connectors@5.0.17

## 0.0.20

### Patch Changes

- Updated dependencies [[`9e8345cd56186b997b5e56deaa2cfc69b30d15f6`](https://github.com/wevm/wagmi/commit/9e8345cd56186b997b5e56deaa2cfc69b30d15f6), [`02c38c28d1aa0ad7a61c33775de603ed974c5c1b`](https://github.com/wevm/wagmi/commit/02c38c28d1aa0ad7a61c33775de603ed974c5c1b)]:
  - @wagmi/core@2.11.4
  - @wagmi/connectors@5.0.16

## 0.0.19

### Patch Changes

- Updated dependencies [[`8974e6269bb5d7bfaa90db0246bc7d13e8bff798`](https://github.com/wevm/wagmi/commit/8974e6269bb5d7bfaa90db0246bc7d13e8bff798)]:
  - @wagmi/core@2.11.3
  - @wagmi/connectors@5.0.15

## 0.0.18

### Patch Changes

- Updated dependencies [[`b4d9ef79deb554ee20fed6666a474be5e7cdd522`](https://github.com/wevm/wagmi/commit/b4d9ef79deb554ee20fed6666a474be5e7cdd522)]:
  - @wagmi/core@2.11.2
  - @wagmi/connectors@5.0.14

## 0.0.17

### Patch Changes

- Updated dependencies [[`9c862d8d63e3d692a22cef2a90782b74a9103f17`](https://github.com/wevm/wagmi/commit/9c862d8d63e3d692a22cef2a90782b74a9103f17)]:
  - @wagmi/connectors@5.0.13
  - @wagmi/core@2.11.1

## 0.0.16

### Patch Changes

- Updated dependencies [[`06bb598a7f04c7b167f5b7ff6d46bd15886a6a14`](https://github.com/wevm/wagmi/commit/06bb598a7f04c7b167f5b7ff6d46bd15886a6a14), [`24a45b269bd0214a29d6f82a84ac66ef8c3f3822`](https://github.com/wevm/wagmi/commit/24a45b269bd0214a29d6f82a84ac66ef8c3f3822)]:
  - @wagmi/core@2.11.0
  - @wagmi/connectors@6.0.0

## 0.0.15

### Patch Changes

- Updated dependencies [[`f2a7cefab96691ebed8b8e45ffde071c47b58dbe`](https://github.com/wevm/wagmi/commit/f2a7cefab96691ebed8b8e45ffde071c47b58dbe), [`f0ea0b2a7fe193dadfeb49a4c8031ee451c638b5`](https://github.com/wevm/wagmi/commit/f0ea0b2a7fe193dadfeb49a4c8031ee451c638b5), [`e3b124ce414b8fd1b2214e2c5a28dc72158a13d1`](https://github.com/wevm/wagmi/commit/e3b124ce414b8fd1b2214e2c5a28dc72158a13d1)]:
  - @wagmi/core@2.10.6
  - @wagmi/connectors@5.0.11

## 0.0.14

### Patch Changes

- Updated dependencies [[`560952acd4bfe33db6c7c07b35c613cef278677c`](https://github.com/wevm/wagmi/commit/560952acd4bfe33db6c7c07b35c613cef278677c)]:
  - @wagmi/connectors@5.0.10

## 0.0.13

### Patch Changes

- Updated dependencies [[`32cdd7b7dc5aff916c040628519562c3a99d418d`](https://github.com/wevm/wagmi/commit/32cdd7b7dc5aff916c040628519562c3a99d418d)]:
  - @wagmi/connectors@5.0.9

## 0.0.12

### Patch Changes

- Updated dependencies [[`c1952d1ff7f0a491dc88595a49159451b07b5621`](https://github.com/wevm/wagmi/commit/c1952d1ff7f0a491dc88595a49159451b07b5621)]:
  - @wagmi/connectors@5.0.8

## 0.0.11

### Patch Changes

- Updated dependencies [[`030c7c2cb380dfd67a2182f62e2aa7a6e1601898`](https://github.com/wevm/wagmi/commit/030c7c2cb380dfd67a2182f62e2aa7a6e1601898)]:
  - @wagmi/core@2.10.5
  - @wagmi/connectors@5.0.7

## 0.0.10

### Patch Changes

- Updated dependencies [[`51fde8a0433b4fff357c1a8d7e08b41b4c86c968`](https://github.com/wevm/wagmi/commit/51fde8a0433b4fff357c1a8d7e08b41b4c86c968)]:
  - @wagmi/core@2.10.4
  - @wagmi/connectors@5.0.6

## 0.0.9

### Patch Changes

- Updated dependencies [[`70dd28669dd8d2ce08217cd02e29a8fbba7a08d4`](https://github.com/wevm/wagmi/commit/70dd28669dd8d2ce08217cd02e29a8fbba7a08d4)]:
  - @wagmi/connectors@5.0.5

## 0.0.8

### Patch Changes

- Updated dependencies [[`be9e1b8a9818b92eb0654a20d9471e9e39329e7e`](https://github.com/wevm/wagmi/commit/be9e1b8a9818b92eb0654a20d9471e9e39329e7e)]:
  - @wagmi/connectors@5.0.4

## 0.0.7

### Patch Changes

- Updated dependencies [[`2804a8a583b1874271154898b4bae38756ef581c`](https://github.com/wevm/wagmi/commit/2804a8a583b1874271154898b4bae38756ef581c), [`2804a8a583b1874271154898b4bae38756ef581c`](https://github.com/wevm/wagmi/commit/2804a8a583b1874271154898b4bae38756ef581c)]:
  - @wagmi/connectors@5.0.3
  - @wagmi/core@2.10.3

## 0.0.6

### Patch Changes

- [`ec2f63f106fd468f28b43d3b88ab3e89aaf5e81a`](https://github.com/wevm/wagmi/commit/ec2f63f106fd468f28b43d3b88ab3e89aaf5e81a) Thanks [@tmm](https://github.com/tmm)! - Fixed `useSwitchChain` `chains` typing.

## 0.0.5

### Patch Changes

- [#3940](https://github.com/wevm/wagmi/pull/3940) [`a5071f581dfdfb961718873643a2fc629101c72a`](https://github.com/wevm/wagmi/commit/a5071f581dfdfb961718873643a2fc629101c72a) Thanks [@jxom](https://github.com/jxom)! - Fixed usage of `metaMask` connector in Vite environments.

- Updated dependencies [[`a5071f581dfdfb961718873643a2fc629101c72a`](https://github.com/wevm/wagmi/commit/a5071f581dfdfb961718873643a2fc629101c72a)]:
  - @wagmi/connectors@5.0.2
  - @wagmi/core@2.10.2

## 0.0.4

### Patch Changes

- Updated dependencies []:
  - @wagmi/connectors@5.0.1
  - @wagmi/core@2.10.1

## 0.0.3

### Patch Changes

- Updated dependencies [[`3117e71825f9c58a0d718f3d1686f1a191fa9cb1`](https://github.com/wevm/wagmi/commit/3117e71825f9c58a0d718f3d1686f1a191fa9cb1), [`3117e71825f9c58a0d718f3d1686f1a191fa9cb1`](https://github.com/wevm/wagmi/commit/3117e71825f9c58a0d718f3d1686f1a191fa9cb1)]:
  - @wagmi/connectors@5.0.0
  - @wagmi/core@2.10.0

## 0.0.2

### Patch Changes

- [#3906](https://github.com/wevm/wagmi/pull/3906) [`32fcb4a31dde6b0206961d8ffe9c651f8a459c67`](https://github.com/wevm/wagmi/commit/32fcb4a31dde6b0206961d8ffe9c651f8a459c67) Thanks [@tmm](https://github.com/tmm)! - Added support for Vue.

- Updated dependencies [[`32fcb4a31dde6b0206961d8ffe9c651f8a459c67`](https://github.com/wevm/wagmi/commit/32fcb4a31dde6b0206961d8ffe9c651f8a459c67)]:
  - @wagmi/connectors@4.3.10
  - @wagmi/core@2.9.8
