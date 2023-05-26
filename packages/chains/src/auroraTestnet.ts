import { type Chain } from '@wagmi/core'

export const auroraTestnet = {
  id: 1313161555,
  name: 'Aurora Testnet',
  network: 'aurora-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    infura: { http: ['https://aurora-testnet.infura.io/v3'] },
    default: { http: ['https://testnet.aurora.dev'] },
    public: { http: ['https://testnet.aurora.dev'] },
  },
  blockExplorers: {
    etherscan: { name: 'Aurorascan', url: 'https://testnet.aurorascan.dev' },
    default: { name: 'Aurorascan', url: 'https://testnet.aurorascan.dev' },
  },
  testnet: true,
} as const satisfies Chain
