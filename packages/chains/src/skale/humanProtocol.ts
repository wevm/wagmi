import { type Chain } from '@wagmi/core'

export const skaleHumanProtocol = {
  id: 1_273_227_453,
  name: 'SKALE | Human Protocol',
  network: 'skale-human-protocol',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/wan-red-ain'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/wan-red-ain'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://wan-red-ain.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://wan-red-ain.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
