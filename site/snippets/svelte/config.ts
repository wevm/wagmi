import { http, createConfig } from '@wagmi/svelte'
import { mainnet, sepolia } from '@wagmi/svelte/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
