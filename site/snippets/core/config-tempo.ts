import { createConfig, http } from '@wagmi/core'
import { tempoTestnet } from '@wagmi/core/chains'
import { KeyManager, webAuthn } from '@wagmi/core/tempo'

export const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
