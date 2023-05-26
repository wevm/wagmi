import { type Chain } from '@wagmi/core'

export const zkSyncTestnet = {
  id: 280,
  name: 'zkSync Era Testnet',
  network: 'zksync-era-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.era.zksync.dev'],
      webSocket: ['wss://testnet.era.zksync.dev/ws'],
    },
    public: {
      http: ['https://testnet.era.zksync.dev'],
      webSocket: ['wss://testnet.era.zksync.dev/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'zkExplorer',
      url: 'https://goerli.explorer.zksync.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0x89e4EDbEC85362a285d7a1D5D255ccD2b8106be2',
    },
  },
  testnet: true,
} as const satisfies Chain
