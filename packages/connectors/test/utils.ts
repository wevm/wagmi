import { mainnet } from '@wagmi/chains'
import { createConfig } from '@wagmi/core'
import { http } from 'viem'

export const config = createConfig({
  chains: [mainnet],
  connectors: [],
  reconnectOnMount: false,
  storage: null,
  transports: {
    [mainnet.id]: http(),
  },
})
