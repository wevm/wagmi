import { createConfig, http } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
