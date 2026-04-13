import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [webAuthn()],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
