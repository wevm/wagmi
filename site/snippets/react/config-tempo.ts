import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { tempoWallet } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [tempoWallet()],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
