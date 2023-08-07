import { injected } from '@wagmi/connectors'
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
