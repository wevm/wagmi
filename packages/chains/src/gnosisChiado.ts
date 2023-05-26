import { type Chain } from '@wagmi/core'

export const gnosisChiado = {
  id: 10_200,
  name: 'Gnosis Chiado',
  network: 'chiado',
  nativeCurrency: {
    decimals: 18,
    name: 'Gnosis',
    symbol: 'xDAI',
  },
  rpcUrls: {
    default: { http: ['https://rpc.chiadochain.net'] },
    public: { http: ['https://rpc.chiadochain.net'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://blockscout.chiadochain.net',
    },
  },
} as const satisfies Chain
