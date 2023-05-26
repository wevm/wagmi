import { type Chain } from '@wagmi/core'

export const skaleCryptoColosseum = {
  id: 2_046_399_126,
  name: 'SKALE | Crypto Colosseum',
  network: 'skale-crypto-coloseeum',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/haunting-devoted-deneb'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/haunting-devoted-deneb'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
