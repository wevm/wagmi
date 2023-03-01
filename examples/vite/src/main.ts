import { configureChains, createClient } from '@wagmi/vue'
import { avalanche, goerli, mainnet, optimism } from '@wagmi/vue/chains'

import { MetaMaskConnector } from '@wagmi/vue/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/vue/connectors/walletConnect'

import { alchemyProvider } from '@wagmi/vue/providers/alchemy'
import { infuraProvider } from '@wagmi/vue/providers/infura'
import { publicProvider } from '@wagmi/vue/providers/public'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, optimism, avalanche],
  [
    alchemyProvider({ apiKey: '' }),
    infuraProvider({ apiKey: '' }),
    publicProvider(),
  ],
  { targetQuorum: 1 },
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
})

app.use(client)

app.mount('#app')
