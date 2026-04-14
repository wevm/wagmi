import { createConfig, http } from '@wagmi/core'
import { tempo } from '@wagmi/core/chains'
import { tempoWallet } from '@wagmi/core/tempo'

export const config = createConfig({
  connectors: [tempoWallet()],
  chains: [tempo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempo.id]: http(),
  },
})
