<!--
<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'
const docsPath = 'react'
</script>
-->

## Install Connector Dependencies

All connector dependencies are now optional peer dependencies. This means that if you want to use a specific connector, you need to install its required dependencies. 

For example, if you are using the <a :href="`/${docsPath}/api/connectors/porto`">`porto`</a> connector, you also need to install the `porto` npm package. Required connector dependencies are listed below (along with links to npm, GitHub, [Socket](https://socket.dev), and licenses) and on docs pages under the "Install" section.

:::tip Secure your supply-chain
Since you are now responsible for managing connector dependencies, take a look at Wagmi's <a :href="`/${docsPath}/installation#security`">Security Getting Started</a> section to brush up on some best practices.
:::

:::tip Building a developer tool on top of Wagmi?
If you are developing a library with Wagmi, you should decide if you want to install connector dependencies as part of your library ("batteries-included" approach) or pass the responsibility onto your users (more flexibility and control).
:::

### baseAccount

<a :href="`/${docsPath}/api/connectors/baseAccount`">`baseAccount`</a> requires `@base-org/account`

<PackageMetadata package="@base-org/account" repo="base/account-sdk" isOsiLicense licenseUrl="https://github.com/base/account-sdk/blob/master/packages/account-sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @base-org/account@{{packageJson?.peerDependencies?.['@base-org/account']}}
```

```bash-vue [npm]
npm install @base-org/account@{{packageJson?.peerDependencies?.['@base-org/account']}}
```

```bash-vue [yarn]
yarn add @base-org/account@{{packageJson?.peerDependencies?.['@base-org/account']}}
```

```bash-vue [bun]
bun add @base-org/account@{{packageJson?.peerDependencies?.['@base-org/account']}}
```
:::

### coinbaseWallet

<a :href="`/${docsPath}/api/connectors/coinbaseWallet`">`coinbaseWallet`</a> requires `@coinbase/wallet-sdk`

<PackageMetadata package="@coinbase/wallet-sdk" repo="coinbase/coinbase-wallet-sdk" isOsiLicense licenseUrl="https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @coinbase/wallet-sdk@{{packageJson?.peerDependencies?.['@coinbase/wallet-sdk']}}
```

```bash-vue [npm]
npm install @coinbase/wallet-sdk@{{packageJson?.peerDependencies?.['@coinbase/wallet-sdk']}}
```

```bash-vue [yarn]
yarn add @coinbase/wallet-sdk@{{packageJson?.peerDependencies?.['@coinbase/wallet-sdk']}}
```

```bash-vue [bun]
bun add @coinbase/wallet-sdk@{{packageJson?.peerDependencies?.['@coinbase/wallet-sdk']}}
```
:::

### metaMask

<a :href="`/${docsPath}/api/connectors/metaMask`">`metaMask`</a> requires `@metamask/sdk`

<PackageMetadata package="@metamask/sdk" repo="MetaMask/metamask-sdk" licenseUrl="https://github.com/MetaMask/metamask-sdk/blob/main/packages/sdk/LICENSE" />

::: code-group
```bash-vue [pnpm]
pnpm add @metamask/sdk@{{packageJson?.peerDependencies?.['@metamask/sdk']}}
```

```bash-vue [npm]
npm install @metamask/sdk@{{packageJson?.peerDependencies?.['@metamask/sdk']}}
```

```bash-vue [yarn]
yarn add @metamask/sdk@{{packageJson?.peerDependencies?.['@metamask/sdk']}}
```

```bash-vue [bun]
bun add @metamask/sdk@{{packageJson?.peerDependencies?.['@metamask/sdk']}}
```
:::

### porto

<a :href="`/${docsPath}/api/connectors/porto`">`porto`</a> requires `porto`

<PackageMetadata package="porto" repo="ithacaxyz/porto" isOsiLicense licenseUrl="https://github.com/ithacaxyz/porto/blob/main/LICENSE-MIT" />

::: code-group
```bash-vue [pnpm]
pnpm add porto@{{packageJson?.peerDependencies?.['porto']}}
```

```bash-vue [npm]
npm install porto@{{packageJson?.peerDependencies?.['porto']}}
```

```bash-vue [yarn]
yarn add porto@{{packageJson?.peerDependencies?.['porto']}}
```

```bash-vue [bun]
bun add porto@{{packageJson?.peerDependencies?.['porto']}}
```
:::

### safe

<a :href="`/${docsPath}/api/connectors/safe`">`safe`</a> requires `@safe-global/safe-apps-provider` and `@safe-global/safe-apps-sdk`

<PackageMetadata package="@safe-global/safe-apps-provider" repo="safe-global/safe-apps-sdk/tree/main/packages/safe-apps-provider" isOsiLicense showName licenseUrl="https://github.com/safe-global/safe-apps-sdk/blob/main/LICENSE.md" />
<PackageMetadata package="@safe-global/safe-apps-sdk" repo="safe-global/safe-apps-sdk/tree/main/packages/safe-apps-sdk" isOsiLicense showName licenseUrl="https://github.com/safe-global/safe-apps-sdk/blob/main/LICENSE.md" />

::: code-group
```bash-vue [pnpm]
pnpm add @safe-global/safe-apps-provider@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [npm]
npm install @safe-global/safe-apps-provider@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [yarn]
yarn add @safe-global/safe-apps-provider@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-sdk']}} 
```

```bash-vue [bun]
bun add @safe-global/safe-apps-provider@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-provider']}} @safe-global/safe-apps-sdk@{{packageJson?.peerDependencies?.['@safe-global/safe-apps-sdk']}} 
```
:::

### walletConnect

<a :href="`/${docsPath}/api/connectors/walletConnect`">`walletConnect`</a> requires `@walletconnect/ethereum-provider`

<PackageMetadata package="@walletconnect/ethereum-provider" repo="WalletConnect/walletconnect-monorepo" licenseUrl="https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/providers/ethereum-provider/LICENSE.md" />

::: code-group
```bash-vue [pnpm]
pnpm add @walletconnect/ethereum-provider@{{packageJson?.peerDependencies?.['@walletconnect/ethereum-provider']}}
```

```bash-vue [npm]
npm install @walletconnect/ethereum-provider@{{packageJson?.peerDependencies?.['@walletconnect/ethereum-provider']}}
```

```bash-vue [yarn]
yarn add @walletconnect/ethereum-provider@{{packageJson?.peerDependencies?.['@walletconnect/ethereum-provider']}}
```

```bash-vue [bun]
bun add @walletconnect/ethereum-provider@{{packageJson?.peerDependencies?.['@walletconnect/ethereum-provider']}}
```
:::


## Bumped Minimum TypeScript Version

The minimum supported TypeScript version is now `5.7.3` instead of `5.0.4`. Older versions of TypeScript should continue to work, but since [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) we recommend you update to at least `5.7.3`. This should be relatively simple as there haven't been any breaking changes since `5.0.4`.

## Migrate v2 Deprecations

<a :href="`/${docsPath}/guides/migrate-from-v1-to-v2#deprecations`">v2 deprecations</a> Review the <a :href="`/${docsPath}/guides/migrate-from-v1-to-v2#deprecations`">v2 migration guide</a> for more information.
