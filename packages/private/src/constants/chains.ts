import { Chain } from '../connectors'

type ChainName =
  | 'arbitrumOne'
  | 'arbitrumRinkeby'
  | 'goerli'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimisticEthereum'
  | 'optimisticKovan'
  | 'polygonMainnet'
  | 'polygonTestnetMumbai'
  | 'rinkeby'
  | 'ropsten'

export const chain: Record<ChainName, Chain> = {
  mainnet: {
    id: 1,
    name: 'Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    ],
  },
  ropsten: {
    id: 3,
    name: 'Ropsten',
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ROP', decimals: 18 },
    rpcUrls: ['https://ropsten.infura.io/v3'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://ropsten.etherscan.io',
      },
    ],
    testnet: true,
  },
  rinkeby: {
    id: 4,
    name: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://rinkeby.etherscan.io',
      },
    ],
    testnet: true,
  },
  goerli: {
    id: 5,
    name: 'Goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://rinkeby.etherscan.io',
      },
    ],
    testnet: true,
  },
  kovan: {
    id: 42,
    name: 'Kovan',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'KOV', decimals: 18 },
    rpcUrls: ['https://kovan.infura.io/v3'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://kovan.etherscan.io',
      },
    ],
    testnet: true,
  },
  optimisticEthereum: {
    id: 10,
    name: 'Optimistic Ethereum',
    nativeCurrency: { name: 'Optimistic Ether', symbol: 'OETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io',
      },
    ],
  },
  optimisticKovan: {
    id: 69,
    name: 'Optimistic Kovan',
    nativeCurrency: {
      name: 'Kovan Ether',
      symbol: 'KOR',
      decimals: 18,
    },
    rpcUrls: ['https://kovan.optimism.io'],
    blockExplorers: [
      {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io',
      },
    ],
    testnet: true,
  },
  polygonMainnet: {
    id: 137,
    name: 'Polygon Mainnet',
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    rpcUrls: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://polygonscan.com',
      },
    ],
  },
  polygonTestnetMumbai: {
    id: 80001,
    name: 'Polygon Testnet Mumbai',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpc.bwarelabs.com',
    ],
    blockExplorers: [
      {
        name: 'Polygonscan',
        url: 'https://mumbai.polygonscan.com',
      },
    ],
    testnet: true,
  },
  arbitrumOne: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'AETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: [
      { name: 'Arbiscan', url: 'https://arbiscan.io' },
      {
        name: 'Arbitrum Explorer',
        url: 'https://explorer.arbitrum.io',
      },
    ],
  },
  arbitrumRinkeby: {
    id: 421611,
    name: 'Rinkeby Arbitrum',
    nativeCurrency: {
      name: 'Rinkeby ArbEther',
      symbol: 'rinkArbETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorers: [
      {
        name: 'Arbitrum Explorer',
        url: 'https://rinkeby-explorer.arbitrum.io',
      },
    ],
    testnet: true,
  },
  localhost: {
    id: 1337,
    name: 'Localhost',
    rpcUrls: ['https://127.0.0.1:8545'],
  },
}

export const defaultChains: Chain[] = [
  chain.mainnet,
  chain.ropsten,
  chain.rinkeby,
  chain.goerli,
  chain.kovan,
]

export const defaultL2Chains: Chain[] = [
  chain.optimisticEthereum,
  chain.optimisticKovan,
  chain.polygonMainnet,
  chain.polygonTestnetMumbai,
  chain.arbitrumOne,
  chain.arbitrumRinkeby,
]

export const developmentChains: Chain[] = [chain.localhost]
