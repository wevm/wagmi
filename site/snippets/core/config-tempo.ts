import { createConfig, http } from '@wagmi/core'
import { tempoTestnet } from '@wagmi/core/chains'
import { tempoWallet } from '@wagmi/core/tempo'

export const config = createConfig({
  connectors: [tempoWallet()],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
