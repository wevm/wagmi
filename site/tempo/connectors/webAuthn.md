# `webAuthn`

Connector for a WebAuthn EOA via the [Accounts SDK](https://docs.tempo.xyz/accounts).

## Install

::: code-group
```bash-vue [pnpm]
pnpm add accounts
```

```bash-vue [npm]
npm install accounts
```

```bash-vue [yarn]
yarn add accounts
```

```bash-vue [bun]
bun add accounts
```
:::

## Import

::: code-group
```ts [React]
import { webAuthn } from 'wagmi/tempo'
```

```ts [Core]
import { webAuthn } from '@wagmi/core/tempo'
```
:::

## Usage

::: code-group
```ts [React]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn()], // [!code focus]
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

```ts [Core]
import { createConfig, http } from '@wagmi/core'
import { tempoTestnet } from '@wagmi/core/chains'
import { webAuthn } from '@wagmi/core/tempo' // [!code focus]

export const config = createConfig({
  connectors: [webAuthn()], // [!code focus]
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```
:::

## Parameters

::: code-group
```ts [React]
import { type WebAuthnParameters } from 'wagmi/tempo'
```

```ts [Core]
import { type WebAuthnParameters } from '@wagmi/core/tempo'
```
:::

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts/wagmi/webAuthn) for setup and parameters.
