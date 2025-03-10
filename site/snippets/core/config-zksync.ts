import { http, createConfig } from '@wagmi/core'
import { zksync, zksyncSepoliaTestnet } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [zksync, zksyncSepoliaTestnet],
  transports: {
    [zksync.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})
