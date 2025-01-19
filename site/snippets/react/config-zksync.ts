import { http, createConfig } from 'wagmi'
import { zksync, zksyncSepoliaTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [zksync, zksyncSepoliaTestnet],
  transports: {
    [zksync.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})
