import { type Chain } from '@wagmi/core'

export const arbitrumGoerli = {
  id: 421_613,
  name: 'Arbitrum Goerli',
  network: 'arbitrum-goerli',
  nativeCurrency: {
    name: 'Arbitrum Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: {
      http: ['https://arb-goerli.g.alchemy.com/v2'],
      webSocket: ['wss://arb-goerli.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://arbitrum-goerli.infura.io/v3'],
      webSocket: ['wss://arbitrum-goerli.infura.io/ws/v3'],
    },
    default: {
      http: ['https://goerli-rollup.arbitrum.io/rpc'],
    },
    public: {
      http: ['https://goerli-rollup.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    etherscan: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io/' },
    default: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 88114,
    },
  },
  testnet: true,
} as const satisfies Chain
