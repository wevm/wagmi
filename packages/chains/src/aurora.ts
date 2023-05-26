import { type Chain } from '@wagmi/core'

export const aurora = {
  id: 1313161554,
  name: 'Aurora',
  network: 'aurora',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    infura: { http: ['https://aurora-mainnet.infura.io/v3'] },
    default: { http: ['https://mainnet.aurora.dev'] },
    public: { http: ['https://mainnet.aurora.dev'] },
  },
  blockExplorers: {
    etherscan: { name: 'Aurorascan', url: 'https://aurorascan.dev' },
    default: { name: 'Aurorascan', url: 'https://aurorascan.dev' },
  },
} as const satisfies Chain
