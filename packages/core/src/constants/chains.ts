import { Chain } from '../types'
import { etherscanBlockExplorers } from './blockExplorers'
import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from './rpcs'

export const chainId = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  optimism: 10,
  optimismKovan: 69,
  polygon: 137,
  polygonMumbai: 80_001,
  arbitrum: 42_161,
  arbitrumRinkeby: 421_611,
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

export const ropsten: Chain = {
  id: chainId.ropsten,
  name: 'Ropsten',
  network: 'ropsten',
  nativeCurrency: { name: 'Ropsten Ether', symbol: 'ROP', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.ropsten,
    default: publicRpcUrls.ropsten,
    infura: infuraRpcUrls.ropsten,
    public: publicRpcUrls.ropsten,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.ropsten,
    default: etherscanBlockExplorers.ropsten,
  },
  ens: {
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 12063863,
  },
  testnet: true,
}

export const rinkeby: Chain = {
  id: chainId.rinkeby,
  name: 'Rinkeby',
  network: 'rinkeby',
  nativeCurrency: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.rinkeby,
    default: publicRpcUrls.rinkeby,
    infura: infuraRpcUrls.rinkeby,
    public: publicRpcUrls.rinkeby,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.rinkeby,
    default: etherscanBlockExplorers.rinkeby,
  },
  ens: {
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 10299530,
  },
  testnet: true,
}

export const goerli: Chain = {
  id: chainId.goerli,
  name: 'Goerli',
  network: 'goerli',
  nativeCurrency: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
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

export const kovan: Chain = {
  id: chainId.kovan,
  name: 'Kovan',
  network: 'kovan',
  nativeCurrency: { name: 'Kovan Ether', symbol: 'KOV', decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.kovan,
    default: publicRpcUrls.kovan,
    infura: infuraRpcUrls.kovan,
    public: publicRpcUrls.kovan,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.kovan,
    default: etherscanBlockExplorers.kovan,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 30285908,
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

export const optimismKovan: Chain = {
  id: chainId.optimismKovan,
  name: 'Optimism Kovan',
  network: 'optimism-kovan',
  nativeCurrency: {
    name: 'Kovan Ether',
    symbol: 'KOR',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.optimismKovan,
    default: publicRpcUrls.optimismKovan,
    infura: infuraRpcUrls.optimismKovan,
    public: publicRpcUrls.optimismKovan,
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.optimismKovan,
    default: etherscanBlockExplorers.optimismKovan,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 1418387,
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

export const arbitrumRinkeby: Chain = {
  id: chainId.arbitrumRinkeby,
  name: 'Arbitrum Rinkeby',
  network: 'arbitrum-rinkeby',
  nativeCurrency: {
    name: 'Arbitrum Rinkeby Ether',
    symbol: 'ARETH',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.arbitrumRinkeby,
    default: publicRpcUrls.arbitrumRinkeby,
    infura: infuraRpcUrls.arbitrumRinkeby,
    public: publicRpcUrls.arbitrumRinkeby,
  },
  blockExplorers: {
    arbitrum: {
      name: 'Arbitrum Explorer',
      url: 'https://rinkeby-explorer.arbitrum.io',
    },
    etherscan: etherscanBlockExplorers.arbitrumRinkeby,
    default: etherscanBlockExplorers.arbitrumRinkeby,
  },
  multicall: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 10228837,
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
  ropsten,
  rinkeby,
  goerli,
  kovan,
  optimism,
  optimismKovan,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumRinkeby,
  localhost,
  hardhat,
  foundry,
} as const

export const allChains = [
  mainnet,
  ropsten,
  rinkeby,
  goerli,
  kovan,
  optimism,
  optimismKovan,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumRinkeby,
  localhost,
  hardhat,
  foundry,
]

export const defaultChains: Chain[] = [mainnet, ropsten, rinkeby, goerli, kovan]

export const defaultL2Chains: Chain[] = [
  arbitrum,
  arbitrumRinkeby,
  optimism,
  optimismKovan,
]
