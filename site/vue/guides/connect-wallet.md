# Connect Wallet

The ability for a user to connect their wallet is a core function for any Dapp. It allows users to perform tasks such as: writing to contracts, signing messages, or sending transactions.

Wagmi contains everything you need to get started with building a Connect Wallet module. To get started, follow the [build your own](#build-your-own) walkthrough.

## Build Your Own

Wagmi provides you with the Composables to get started building your own Connect Wallet module. 

It takes less than five minutes to get up and running with Browser Wallets, WalletConnect, and Coinbase Wallet.

### 1. Configure Wagmi

Before we get started with building the functionality of the Connect Wallet module, we will need to set up the Wagmi configuration.

Let's create a `config.ts` file and export a `config` object.

::: code-group

```tsx [config.ts]
import { http, createConfig } from '@wagmi/vue'
import { base, mainnet, optimism } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

In the above configuration, we want to set up connectors for Injected (browser), WalletConnect (browser + mobile), MetaMask, and Safe wallets. This configuration uses the **Mainnet** and **Base** chains, but you can use whatever you want.

::: warning

Make sure to replace the `projectId` with your own WalletConnect Project ID, if you wish to use WalletConnect! 

[Get your Project ID](https://cloud.walletconnect.com/)

:::

### 2. Inject the WagmiPlugin onto your App

Next, we will need to inject our App with plugins so that our application is aware of Wagmi & Vue Query's reactive state and in-memory caching.

::: code-group

```ts [main.ts]
// 1. Import modules.
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import App from './App.vue'
import { config } from './wagmi'

createApp(App)
  // 2. Inject the Wagmi plugin.
  .use(WagmiPlugin, { config })
  // 3. Inject the Vue Query plugin.
  .use(VueQueryPlugin, {})
  .mount('#app')
```

```vue [App.vue]
<script setup lang="ts">
</script>

<template>
</template>
```

```ts [config.ts]
import { http, createConfig } from '@wagmi/vue'
import { base, mainnet, optimism } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

### 3. Display Wallet Options

After that, we will create a `Connect` component that will display our connectors. This will allow users to select a wallet and connect.

Below, we are rendering a list of `connectors` retrieved from `useConnect`. When the user clicks on a connector, the `connect` function will connect the users' wallet.

::: code-group

```vue [Connect.vue]
<script setup lang="ts">
import { useChainId, useConnect, useConnectors } from '@wagmi/vue'

const chainId = useChainId()
const { connect } = useConnect()
const connectors = useConnectors()
</script>

<template>
  <button
    v-for="connector in connectors"
    @click="connect({ connector, chainId })"
  >
    {{ connector.name }}
  </button>
</template>
```

```vue [App.vue]
<script setup lang="ts">
</script>

<template>
</template>
```

```ts [main.ts]
// 1. Import modules.
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import App from './App.vue'
import { config } from './wagmi'

createApp(App)
  // 2. Inject the Wagmi plugin.
  .use(WagmiPlugin, { config })
  // 3. Inject the Vue Query plugin.
  .use(VueQueryPlugin, {})
  .mount('#app')
```

```ts [config.ts]
import { http, createConfig } from '@wagmi/vue'
import { base, mainnet, optimism } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

### 4. Display Connection

Lastly, if an connection is made, we want to show some basic information, like the connected address and ENS name and avatar.

Below, we are using hooks like `useConnection`, `useEnsAvatar` and `useEnsName` to extract this information.

We are also utilizing `useDisconnect` to show a "Disconnect" button so a user can disconnect their wallet.

::: code-group

```vue [Connection.vue]
<script setup lang="ts">
import { useConnection, useDisconnect } from '@wagmi/vue'

const { address, connector } = useConnection()
const { disconnect } = useDisconnect()
</script>

<template>
  <div>Address: {{ address }}</div>
  <div>Connected to {{ connector?.name }} Connector.</div>
  <button @click="disconnect()">Disconnect</button>
</template>
```

```vue [Connect.vue]
<script setup lang="ts">
import { useChainId, useConnect, useConnectors } from '@wagmi/vue'

const chainId = useChainId()
const { connect } = useConnect()
const connectors = useConnectors()
</script>

<template>
  <button
    v-for="connector in connectors"
    @click="connect({ connector, chainId })"
  >
    {{ connector.name }}
  </button>
</template>
```

```vue [App.vue]
<script setup lang="ts">
</script>

<template>
</template>
```

```ts [main.ts]
// 1. Import modules.
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import App from './App.vue'
import { config } from './wagmi'

createApp(App)
  // 2. Inject the Wagmi plugin.
  .use(WagmiPlugin, { config })
  // 3. Inject the Vue Query plugin.
  .use(VueQueryPlugin, {})
  .mount('#app')
```

```ts [config.ts]
import { http, createConfig } from '@wagmi/vue'
import { base, mainnet, optimism } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

### 5. Wire it up!

Finally, we can wire up our Connect and Connection components to our application's entrypoint.

::: code-group

```vue [App.vue]
<script setup lang="ts">
import { useConnection } from '@wagmi/vue'
import Connection from './Connection.vue' // [!code ++]
import Connect from './Connect.vue' // [!code ++]

const { isConnected } = useConnection()
</script>

<template>
  <Connection v-if="isConnected" /> // [!code ++]
  <Connect v-else /> // [!code ++]
</template>

```

```vue [Connection.vue]
<script setup lang="ts">
import { useConnection, useDisconnect } from '@wagmi/vue'

const { address, connector } = useConnection()
const { disconnect } = useDisconnect()
</script>

<template>
  <div>Address: {{ address }}</div>
  <div>Connected to {{ connector?.name }} Connector.</div>
  <button @click="disconnect()">Disconnect</button>
</template>
```

```vue [Connect.vue]
<script setup lang="ts">
import { useChainId, useConnect, useConnectors } from '@wagmi/vue'

const chainId = useChainId()
const { connect } = useConnect()
const connectors = useConnectors()
</script>

<template>
  <button
    v-for="connector in connectors"
    @click="connect({ connector, chainId })"
  >
    {{ connector.name }}
  </button>
</template>
```

```ts [main.ts]
// 1. Import modules.
import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import App from './App.vue'
import { config } from './wagmi'

createApp(App)
  // 2. Inject the Wagmi plugin.
  .use(WagmiPlugin, { config })
  // 3. Inject the Vue Query plugin.
  .use(VueQueryPlugin, {})
  .mount('#app')
```

```ts [config.ts]
import { http, createConfig } from '@wagmi/vue'
import { base, mainnet, optimism } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

### Playground

Want to see the above steps all wired up together in an end-to-end example? Check out the below StackBlitz playground.

<br/>

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/edit/vitejs-vite-mf6dgb?embed=1&file=src%2FApp.vue&hideExplorer=1&view=preview"></iframe>
