import { type Chain } from '@wagmi/core'

export const fuse = {
  id: 122,
  name: 'Fuse',
  network: 'fuse',
  nativeCurrency: { name: 'Fuse', symbol: 'FUSE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.fuse.io'] },
    public: { http: ['https://fuse-mainnet.chainstacklabs.com'] },
  },
  blockExplorers: {
    default: { name: 'Fuse Explorer', url: 'https://explorer.fuse.io' },
  },
} as const satisfies Chain
