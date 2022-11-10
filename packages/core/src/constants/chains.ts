import { Chain } from '../types'
import { etherscanBlockExplorers } from './blockExplorers'
import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from './rpcs'

export const chainId = {
  mainnet: 1,
  goerli: 5,
  sepolia: 11_155_111,
  optimism: 10,
  optimismGoerli: 420,
  polygon: 137,
  polygonMumbai: 80_001,
  arbitrum: 42_161,
  arbitrumGoerli: 421_613,
  localhost: 1_337,
  hardhat: 31_337,
  foundry: 31_337,
} as const
export type ChainName = keyof typeof chainId

export const mainnet: Chain = {
  id: chainId.mainnet,
  name: 'Ethereum',
  network: 'homestead',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.mainnet,
    default: publicRpcUrls.mainnet,
    infura: infuraRpcUrls.mainnet,
    public: publicRpcUrls.mainnet,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.mainnet,
    default: etherscanBlockExplorers.mainnet,
  },
  ens: {
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 14353601,
  },
}

export const goerli: Chain = {
  id: chainId.goerli,
  name: 'Goerli',
  network: 'goerli',
  nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.goerli,
    default: publicRpcUrls.goerli,
    infura: infuraRpcUrls.goerli,
    public: publicRpcUrls.goerli,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.goerli,
    default: etherscanBlockExplorers.goerli,
  },
  ens: {
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 6507670,
  },
  testnet: true,
}

export const sepolia: Chain = {
  id: chainId.sepolia,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: publicRpcUrls.sepolia,
    infura: infuraRpcUrls.sepolia,
    public: publicRpcUrls.sepolia,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.sepolia,
    default: etherscanBlockExplorers.sepolia,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 751532,
  },
  testnet: true,
}

export const optimism: Chain = {
  id: chainId.optimism,
  name: 'Optimism',
  network: 'optimism',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.optimism,
    default: publicRpcUrls.optimism,
    infura: infuraRpcUrls.optimism,
    public: publicRpcUrls.optimism,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.optimism,
    default: etherscanBlockExplorers.optimism,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 4286263,
  },
}

export const optimismGoerli: Chain = {
  id: chainId.optimismGoerli,
  name: 'Optimism Goerli',
  network: 'optimism-goerli',
  nativeCurrency: {
    name: 'Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.optimismGoerli,
    default: publicRpcUrls.optimismGoerli,
    infura: infuraRpcUrls.optimismGoerli,
    public: publicRpcUrls.optimismGoerli,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.optimismGoerli,
    default: etherscanBlockExplorers.optimismGoerli,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 49461,
  },
  testnet: true,
}

export const polygon: Chain = {
  id: chainId.polygon,
  name: 'Polygon',
  network: 'matic',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.polygon,
    default: publicRpcUrls.polygon,
    infura: infuraRpcUrls.polygon,
    public: publicRpcUrls.polygon,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.polygon,
    default: etherscanBlockExplorers.polygon,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 25770160,
  },
}

export const polygonMumbai: Chain = {
  id: chainId.polygonMumbai,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.polygonMumbai,
    default: publicRpcUrls.polygonMumbai,
    infura: infuraRpcUrls.polygonMumbai,
    public: publicRpcUrls.polygonMumbai,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.polygonMumbai,
    default: etherscanBlockExplorers.polygonMumbai,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 25444704,
  },
  testnet: true,
}

export const arbitrum: Chain = {
  id: chainId.arbitrum,
  name: 'Arbitrum One',
  network: 'arbitrum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.arbitrum,
    default: publicRpcUrls.arbitrum,
    infura: infuraRpcUrls.arbitrum,
    public: publicRpcUrls.arbitrum,
  },
  blockExplorers: {
    arbitrum: {
      name: 'Arbitrum Explorer',
      url: 'https://explorer.arbitrum.io',
    },
    etherscan: etherscanBlockExplorers.arbitrum,
    default: etherscanBlockExplorers.arbitrum,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 7654707,
  },
}

export const arbitrumGoerli: Chain = {
  id: chainId.arbitrumGoerli,
  name: 'Arbitrum Goerli',
  network: 'arbitrum-goerli',
  nativeCurrency: {
    name: 'Arbitrum Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.arbitrumGoerli,
    default: publicRpcUrls.arbitrumGoerli,
    infura: infuraRpcUrls.arbitrumGoerli,
    public: publicRpcUrls.arbitrumGoerli,
  },
  blockExplorers: {
    arbitrum: {
      name: 'Arbitrum Explorer',
      url: 'https://goerli-rollup-explorer.arbitrum.io',
    },
    etherscan: etherscanBlockExplorers.arbitrumGoerli,
    default: etherscanBlockExplorers.arbitrumGoerli,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 88114,
  },
  testnet: true,
}

export const localhost: Chain = {
  id: chainId.localhost,
  name: 'Localhost',
  network: 'localhost',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
}

export const hardhat: Chain = {
  id: chainId.hardhat,
  name: 'Hardhat',
  network: 'hardhat',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
}

export const foundry: Chain = {
  id: chainId.foundry,
  name: 'Foundry',
  network: 'foundry',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
}

/**
 * Common chains for convenience
 * Should not contain all possible chains
 */
export const chain = {
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
  localhost,
  hardhat,
  foundry,
} as const

export const allChains = [
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
  localhost,
  hardhat,
  foundry,
]

export const defaultChains: Chain[] = [mainnet, goerli]

export const defaultL2Chains: Chain[] = [
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli,
]
