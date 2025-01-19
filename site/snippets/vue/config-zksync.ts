import { http, createConfig } from '@wagmi/vue'
import { zksync, zksyncSepoliaTestnet } from '@wagmi/vue/chains'

export const config = createConfig({
  chains: [zksync, zksyncSepoliaTestnet],
  transports: {
    [zksync.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})
