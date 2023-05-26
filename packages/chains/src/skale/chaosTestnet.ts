import { type Chain } from '@wagmi/core'

export const skaleChaosTestnet = {
  id: 1_351_057_110,
  name: 'SKALE | Chaos Testnet',
  network: 'skale-chaos-testnet',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix',
      ],
    },
    public: {
      http: [
        'https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix',
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com',
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain
