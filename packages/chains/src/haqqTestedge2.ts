import { type Chain } from '@wagmi/core'

export const haqqTestedge2 = {
  id: 54211,
  name: 'HAQQ Testedge 2',
  network: 'haqq-testedge-2',
  nativeCurrency: {
    decimals: 18,
    name: 'Islamic Coin',
    symbol: 'ISLMT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.eth.testedge2.haqq.network'],
    },
    public: {
      http: ['https://rpc.eth.testedge2.haqq.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HAQQ Explorer',
      url: 'https://explorer.testedge2.haqq.network',
    },
  },
} as const satisfies Chain
