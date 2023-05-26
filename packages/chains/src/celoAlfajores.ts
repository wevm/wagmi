import { type Chain } from '@wagmi/core'

export const celoAlfajores = {
  id: 44_787,
  name: 'Alfajores',
  network: 'celo-alfajores',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'A-CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://alfajores-forno.celo-testnet.org'],
    },
    infura: {
      http: ['https://celo-alfajores.infura.io/v3'],
    },
    public: {
      http: ['https://alfajores-forno.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Explorer',
      url: 'https://explorer.celo.org/alfajores',
    },
    etherscan: { name: 'CeloScan', url: 'https://alfajores.celoscan.io/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 14569001,
    },
  },
  testnet: true,
} as const satisfies Chain
