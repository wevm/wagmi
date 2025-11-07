---
title: Migrate from v2 to v3
description: Guide for migrating from Wagmi v2 to v3.
---

<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'
</script>

# Migrate from v2 to v3

## Overview

Wagmi v3 gives you total control over connector dependencies. Since Wagmi's initial release, Wagmi included required connector dependencies as part of its package to eliminate the need to manage multiple third-party dependencies.

This worked worked well in the early years as a "batteries-included" approach, but didn't allow for more fine-grained control over your dependency tree. By giving you control over connector dependencies, you can decide to only install what you need, manage version bumps at your own pace, and have total control over what third-party code and licenses you bring into your project

To get started, install the latest version of Wagmi.

::: code-group
```bash [pnpm]
pnpm add wagmi@3
```

```bash [npm]
npm install wagmi@3
```

```bash [yarn]
yarn add wagmi@3
```

```bash [bun]
bun add wagmi@3
```
:::

::: info Not ready to migrate yet?
The Wagmi v2 docs are still available at [2.x.wagmi.sh/react](https://2.x.wagmi.sh/react).
:::

## Install Connector Dependencies

All connector dependencies are now optional peer dependencies. This means that if you want to use a specific connector, you need to install its required dependencies. 

For example, if you are using the [`porto`](/react/api/connectors/porto) connector, you also need to install the `porto` npm package. Required connector dependencies are listed below (along with links to npm, GitHub, Socket, and license information) and on docs pages under the "Install" section.

<!-- TODO: Recommend ways to protect from supplychain attacks and get updates on security issues, etc. -->

### baseAccount

[`baseAccount`](/react/api/connectors/baseAccount) requires `@base-org/account` be installed.

<PackageMetadata package="@base-org/account" repo="base/account-sdk" isOsiLicense licenseUrl="https://github.com/base/account-sdk/blob/master/packages/account-sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @base-org/account@{{packageJson.peerDependencies['@base-org/account']}}
```

```bash-vue [npm]
npm install @base-org/account@{{packageJson.peerDependencies['@base-org/account']}}
```

```bash-vue [yarn]
yarn add @base-org/account@{{packageJson.peerDependencies['@base-org/account']}}
```

```bash-vue [bun]
bun add @base-org/account@{{packageJson.peerDependencies['@base-org/account']}}
```
:::

### coinbaseWallet

[`coinbaseWallet`](/react/api/connectors/coinbaseWallet) requires `@coinbase/wallet-sdk` be installed.

<PackageMetadata package="@coinbase/wallet-sdk" repo="coinbase/coinbase-wallet-sdk" isOsiLicense licenseUrl="https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @coinbase/wallet-sdk@{{packageJson.peerDependencies['@coinbase/wallet-sdk']}}
```

```bash-vue [npm]
npm install @coinbase/wallet-sdk@{{packageJson.peerDependencies['@coinbase/wallet-sdk']}}
```

```bash-vue [yarn]
yarn add @coinbase/wallet-sdk@{{packageJson.peerDependencies['@coinbase/wallet-sdk']}}
```

```bash-vue [bun]
bun add @coinbase/wallet-sdk@{{packageJson.peerDependencies['@coinbase/wallet-sdk']}}
```
:::

### gemini

[`gemini`](/react/api/connectors/gemini) requires `@gemini-wallet/core` be installed.

<PackageMetadata package="@gemini-wallet/core" repo="gemini/gemini-wallet-core" isOsiLicense licenseUrl="https://github.com/gemini/gemini-wallet-core/blob/main/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @gemini-wallet/core@{{packageJson.peerDependencies['@gemini-wallet/core']}}
```

```bash-vue [npm]
npm install @gemini-wallet/core@{{packageJson.peerDependencies['@gemini-wallet/core']}}
```

```bash-vue [yarn]
yarn add @gemini-wallet/core@{{packageJson.peerDependencies['@gemini-wallet/core']}}
```

```bash-vue [bun]
bun add @gemini-wallet/core@{{packageJson.peerDependencies['@gemini-wallet/core']}}
```
:::

### metaMask

[`metaMask`](/react/api/connectors/metaMask) requires `@metamask/sdk` be installed.

<PackageMetadata package="@metamask/sdk" repo="MetaMask/metamask-sdk" licenseUrl="https://github.com/MetaMask/metamask-sdk/blob/main/packages/sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @metamask/sdk@{{packageJson.peerDependencies['@metamask/sdk']}}
```

```bash-vue [npm]
npm install @metamask/sdk@{{packageJson.peerDependencies['@metamask/sdk']}}
```

```bash-vue [yarn]
yarn add @metamask/sdk@{{packageJson.peerDependencies['@metamask/sdk']}}
```

```bash-vue [bun]
bun add @metamask/sdk@{{packageJson.peerDependencies['@metamask/sdk']}}
```
:::

### porto

[`porto`](/react/api/connectors/porto) requires `porto` be installed.

<PackageMetadata package="porto" repo="ithacaxyz/porto" isOsiLicense licenseUrl="TODO" />

::: code-group
```bash-vue [pnpm]
pnpm add porto@{{packageJson.peerDependencies['porto']}}
```

```bash-vue [npm]
npm install porto@{{packageJson.peerDependencies['porto']}}
```

```bash-vue [yarn]
yarn add porto@{{packageJson.peerDependencies['porto']}}
```

```bash-vue [bun]
bun add porto@{{packageJson.peerDependencies['porto']}}
```
:::

### safe

[`safe`](/react/api/connectors/safe) requires `@safe-global/safe-apps-provider` and `@safe-global/safe-apps-sdk` be installed.

<PackageMetadata package="@safe-global/safe-apps-provider" repo="safe-global/safe-apps-sdk/tree/main/packages/safe-apps-provider" isOsiLicense showName licenseUrl="https://github.com/safe-global/safe-apps-sdk/blob/main/LICENSE.md" />
<PackageMetadata package="@safe-global/safe-apps-sdk" repo="safe-global/safe-apps-sdk/tree/main/packages/safe-apps-sdk" isOsiLicense showName licenseUrl="https://github.com/safe-global/safe-apps-sdk/blob/main/LICENSE.md" />

::: code-group
```bash-vue [pnpm]
pnpm add @safe-global/safe-apps-provider@{{packageJson.peerDependencies['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson.peerDependencies['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [npm]
npm install @safe-global/safe-apps-provider@{{packageJson.peerDependencies['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson.peerDependencies['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [yarn]
yarn add @safe-global/safe-apps-provider@{{packageJson.peerDependencies['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson.peerDependencies['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [bun]
bun add @safe-global/safe-apps-provider@{{packageJson.peerDependencies['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson.peerDependencies['@safe-global/safe-apps-sdk']}} 
```
:::

### walletConnect

[`walletConnect`](/react/api/connectors/walletConnect) requires `@walletconnect/ethereum-provider` be installed.

<PackageMetadata package="@walletconnect/ethereum-provider" repo="WalletConnect/walletconnect-monorepo" licenseUrl="https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/providers/ethereum-provider/LICENSE.md" />

::: code-group
```bash-vue [pnpm]
pnpm add @walletconnect/ethereum-provider@{{packageJson.peerDependencies['@walletconnect/ethereum-provider']}}
```

```bash-vue [npm]
npm install @walletconnect/ethereum-provider@{{packageJson.peerDependencies['@walletconnect/ethereum-provider']}}
```

```bash-vue [yarn]
yarn add @walletconnect/ethereum-provider@{{packageJson.peerDependencies['@walletconnect/ethereum-provider']}}
```

```bash-vue [bun]
bun add @walletconnect/ethereum-provider@{{packageJson.peerDependencies['@walletconnect/ethereum-provider']}}
```
:::

