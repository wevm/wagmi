import { type Chain } from '@wagmi/core'

export const filecoinHyperspace = {
  id: 314_1,
  name: 'Filecoin Hyperspace',
  network: 'filecoin-hyperspace',
  nativeCurrency: {
    decimals: 18,
    name: 'testnet filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: { http: ['https://api.hyperspace.node.glif.io/rpc/v1'] },
    public: { http: ['https://api.hyperspace.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://hyperspace.filfox.info/en' },
    filscan: { name: 'Filscan', url: 'https://hyperspace.filscan.io' },
  },
} as const satisfies Chain
