import { http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
