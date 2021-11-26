import { Chain } from '../connectors'

export const defaultChains: Chain[] = [
  {
    id: 1,
    name: 'Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  {
    id: 3,
    name: 'Ropsten',
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ROP', decimals: 18 },
    rpcUrls: ['https://ropsten.infura.io/v3/'],
    blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    testnet: true,
  },
  {
    id: 4,
    name: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    testnet: true,
  },
  {
    id: 5,
    name: 'Goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    testnet: true,
  },
  {
    id: 42,
    name: 'Kovan',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'KOV', decimals: 18 },
    rpcUrls: ['https://kovan.infura.io/v3/'],
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    testnet: true,
  },
  {
    id: 10,
    name: 'Optimism',
    nativeCurrency: {
      name: 'Optimistic Ether',
      symbol: 'OETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  },
  {
    id: 69,
    name: 'Optimistic Kovan',
    nativeCurrency: {
      name: 'Optimistic kovEther',
      symbol: 'kovOpETH',
      decimals: 18,
    },
    rpcUrls: ['https://kovan.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    testnet: true,
  },
  {
    id: 42161,
    name: 'Arbitrum',
    nativeCurrency: {
      name: 'Arbitrum Ether',
      symbol: 'AETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  {
    id: 421611,
    name: 'Rinkeby Arbitrum',
    nativeCurrency: {
      name: 'Rinkeby ArbEther',
      symbol: 'rinkArbETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/'],
    testnet: true,
  },
]
