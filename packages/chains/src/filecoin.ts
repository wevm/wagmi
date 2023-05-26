import { type Chain } from '@wagmi/core'

export const filecoin = {
  id: 314,
  name: 'Filecoin Mainnet',
  network: 'filecoin-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'filecoin',
    symbol: 'FIL',
  },
  rpcUrls: {
    default: { http: ['https://api.node.glif.io/rpc/v1'] },
    public: { http: ['https://api.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://filfox.info/en' },
    filscan: { name: 'Filscan', url: 'https://filscan.io' },
    filscout: { name: 'Filscout', url: 'https://filscout.io/en' },
    glif: { name: 'Glif', url: 'https://explorer.glif.io' },
  },
} as const satisfies Chain
