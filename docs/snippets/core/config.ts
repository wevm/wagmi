import { mainnet, sepolia } from '@wagmi/chains'
import { createConfig } from '@wagmi/core'
import { http } from 'viem'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
