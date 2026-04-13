import { createConfig, http } from '@wagmi/core'
import { tempoTestnet } from '@wagmi/core/chains'
import { webAuthn } from '@wagmi/core/tempo'

export const config = createConfig({
  connectors: [webAuthn()],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
