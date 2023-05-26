import { type Chain } from '@wagmi/core'

export const optimismGoerli = {
  id: 420,
  name: 'Optimism Goerli',
  network: 'optimism-goerli',
  nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://opt-goerli.g.alchemy.com/v2'],
      webSocket: ['wss://opt-goerli.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://optimism-goerli.infura.io/v3'],
      webSocket: ['wss://optimism-goerli.infura.io/ws/v3'],
    },
    default: {
      http: ['https://goerli.optimism.io'],
    },
    public: {
      http: ['https://goerli.optimism.io'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://goerli-optimism.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://goerli-optimism.etherscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 49461,
    },
  },
  testnet: true,
} as const satisfies Chain
