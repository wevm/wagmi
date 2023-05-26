import { type Chain } from '@wagmi/core'

export const skaleNebulaTestnet = {
  id: 503_129_905,
  name: 'SKALE | Nebula Gaming Hub Testnet',
  network: 'skale-nebula-testnet',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird'],
    },
    public: {
      http: ['https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com',
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain
