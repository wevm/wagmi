import { Chain } from '../types'
import { etherscanBlockExplorers } from './blockExplorers'
import { defaultInfuraId } from './keys'
import { alchemyRpcUrls, infuraRpcUrls } from './rpcs'

export type ChainName =
  | 'arbitrum'
  | 'arbitrumRinkeby'
  | 'goerli'
  | 'hardhat'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'polygon'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ropsten'

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
} as const

export const chain: Record<ChainName, Chain> = {
  mainnet: {
    id: chainId.mainnet,
    name: 'Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.mainnet,
      infura: infuraRpcUrls.mainnet,
      default: `${infuraRpcUrls.mainnet}/${defaultInfuraId}`,
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.mainnet,
      default: etherscanBlockExplorers.mainnet,
    },
  },
  ropsten: {
    id: chainId.ropsten,
    name: 'Ropsten',
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.ropsten,
      infura: infuraRpcUrls.ropsten,
      default: `${infuraRpcUrls.ropsten}/${defaultInfuraId}`,
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.ropsten,
      default: etherscanBlockExplorers.ropsten,
    },
    testnet: true,
  },
  rinkeby: {
    id: chainId.rinkeby,
    name: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.rinkeby,
      infura: infuraRpcUrls.rinkeby,
      default: `${infuraRpcUrls.rinkeby}/${defaultInfuraId}`,
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.rinkeby,
      default: etherscanBlockExplorers.rinkeby,
    },
    testnet: true,
  },
  goerli: {
    id: chainId.goerli,
    name: 'Goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'gETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.goerli,
      infura: infuraRpcUrls.goerli,
      default: `${infuraRpcUrls.goerli}/${defaultInfuraId}`,
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.goerli,
      default: etherscanBlockExplorers.goerli,
    },
    testnet: true,
  },
  kovan: {
    id: chainId.kovan,
    name: 'Kovan',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.kovan,
      infura: infuraRpcUrls.kovan,
      default: `${infuraRpcUrls.kovan}/${defaultInfuraId}`,
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.kovan,
      default: etherscanBlockExplorers.kovan,
    },
    testnet: true,
  },
  optimism: {
    id: chainId.optimism,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.optimism,
      infura: infuraRpcUrls.optimism,
      default: ['https://mainnet.optimism.io'],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.optimism,
      default: etherscanBlockExplorers.optimism,
    },
  },
  optimismKovan: {
    id: chainId.optimismKovan,
    name: 'Optimism Kovan',
    nativeCurrency: {
      name: 'Kovan Ether',
      symbol: 'KOR',
      decimals: 18,
    },
    rpcUrls: {
      alchemy: alchemyRpcUrls.optimismKovan,
      infura: infuraRpcUrls.optimismKovan,
      default: ['https://kovan.optimism.io'],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.optimismKovan,
      default: etherscanBlockExplorers.optimismKovan,
    },
    testnet: true,
  },
  polygon: {
    id: chainId.polygon,
    name: 'Polygon Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.polygon,
      infura: infuraRpcUrls.polygon,
      default: [
        'https://polygon-rpc.com',
        'https://rpc-mainnet.matic.network',
        'https://matic-mainnet.chainstacklabs.com',
        'https://rpc-mainnet.maticvigil.com',
        'https://rpc-mainnet.matic.quiknode.pro',
        'https://matic-mainnet-full-rpc.bwarelabs.com',
      ],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.polygon,
      default: etherscanBlockExplorers.polygon,
    },
  },
  polygonMumbai: {
    id: chainId.polygonMumbai,
    name: 'Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: {
      alchemy: alchemyRpcUrls.polygonMumbai,
      infura: infuraRpcUrls.polygonMumbai,
      default: [
        'https://matic-mumbai.chainstacklabs.com',
        'https://rpc-mumbai.maticvigil.com',
        'https://matic-testnet-archive-rpc.bwarelabs.com',
      ],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.polygonMumbai,
      default: etherscanBlockExplorers.polygonMumbai,
    },
    testnet: true,
  },
  arbitrum: {
    id: chainId.arbitrum,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'AETH', decimals: 18 },
    rpcUrls: {
      alchemy: alchemyRpcUrls.arbitrum,
      infura: infuraRpcUrls.arbitrum,
      default: ['https://arb1.arbitrum.io/rpc'],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.arbitrum,
      default: [
        etherscanBlockExplorers.arbitrum,
        {
          name: 'Arbitrum Explorer',
          url: 'https://explorer.arbitrum.io',
        },
      ],
    },
  },
  arbitrumRinkeby: {
    id: chainId.arbitrumRinkeby,
    name: 'Arbitrum Rinkeby',
    nativeCurrency: {
      name: 'Arbitrum Rinkeby Ether',
      symbol: 'ARETH',
      decimals: 18,
    },
    rpcUrls: {
      alchemy: alchemyRpcUrls.arbitrumRinkeby,
      infura: infuraRpcUrls.arbitrumRinkeby,
      default: ['https://rinkeby.arbitrum.io/rpc'],
    },
    blockExplorers: {
      etherscan: etherscanBlockExplorers.arbitrumRinkeby,
      default: [
        etherscanBlockExplorers.arbitrumRinkeby,
        {
          name: 'Arbitrum Explorer',
          url: 'https://rinkeby-explorer.arbitrum.io',
        },
      ],
    },
    testnet: true,
  },
  localhost: {
    id: chainId.localhost,
    name: 'Localhost',
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
  },
  hardhat: {
    id: chainId.hardhat,
    name: 'Hardhat',
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
  },
}

export const allChains: Chain[] = Object.values(chain)

export const defaultChains: Chain[] = [
  chain.mainnet,
  chain.ropsten,
  chain.rinkeby,
  chain.goerli,
  chain.kovan,
]
