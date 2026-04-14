<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'

const connectorDependencyVersion = packageJson.peerDependencies['accounts']
</script>

# `dangerous_secp256k1`

Connector for a Secp256k1 EOA.
 
:::warning
NOT RECOMMENDED FOR PRODUCTION USAGE. This connector stores private keys in clear text, and are bound to the session length of the storage used. Instead, use this connector for testing workflows, like end-to-end tests.
:::

## Install

<PackageMetadata package="accounts" repo="tempoxyz/accounts" isOsiLicense licenseUrl="https://github.com/tempoxyz/accounts/blob/main/LICENSE-MIT" />

::: code-group
```bash-vue [pnpm]
pnpm add accounts@{{connectorDependencyVersion}}
```

```bash-vue [npm]
npm install accounts@{{connectorDependencyVersion}}
```

```bash-vue [yarn]
yarn add accounts@{{connectorDependencyVersion}}
```

```bash-vue [bun]
bun add accounts@{{connectorDependencyVersion}}
```
:::

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempo } from 'wagmi/chains'
import { dangerous_secp256k1 } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [dangerous_secp256k1()], // [!code focus]
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

`dangerous_secp256k1` is a thin wagmi wrapper around the root `accounts` package.

## Parameters

### privateKey

- **Type:** `Hex`

Optional fixed private key to expose through the connector. If omitted, the connector generates and persists one for you.
