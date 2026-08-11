<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'

const connectorDependencyVersion = packageJson.peerDependencies['accounts']
</script>

# `webAuthn`

Connector for a WebAuthn EOA.

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
import { webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn()], // [!code focus]
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
```

Use `webAuthn({ authUrl: '/api/webauthn' })` if you want registration and authentication challenges to come from a server endpoint instead of the default local browser ceremony.

`webAuthn` is a thin wagmi wrapper around the root `accounts` package.

## Parameters

### authUrl (optional)

- **Type:** `string`

URL of a server-backed WebAuthn handler.

### ceremony (optional)

- **Type:** `WebAuthnCeremony`

Custom WebAuthn ceremony implementation.

### icon (optional)

- **Type:** `` `data:image/${string}` ``

Optional connector icon override.

### name (optional)

- **Type:** `string`

Optional connector display name.

### rdns (optional)

- **Type:** `string`

Optional reverse-DNS identifier.

### authorizeAccessKey (optional)

- **Type:** `() => { expiry: number, ... }`

Default access-key authorization parameters to attach to `wallet_connect`.
