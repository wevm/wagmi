# `tempoWallet`

Connector for Tempo Wallet via the [Accounts SDK](https://docs.tempo.xyz/accounts).

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
import { tempoWallet } from 'wagmi/tempo'
```

```ts [Core]
import { tempoWallet } from '@wagmi/core/tempo'
```
:::

## Usage

::: code-group
```ts [React]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { tempoWallet } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [tempoWallet()], // [!code focus]
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
import { tempoWallet } from '@wagmi/core/tempo' // [!code focus]

export const config = createConfig({
  connectors: [tempoWallet()], // [!code focus]
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
import { type TempoWalletParameters } from 'wagmi/tempo'
```

```ts [Core]
import { type TempoWalletParameters } from '@wagmi/core/tempo'
```
:::

See the [Accounts SDK docs](https://docs.tempo.xyz/accounts) for more info.
