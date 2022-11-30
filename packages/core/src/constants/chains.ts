import type { Chain } from '@wagmi/chains'
import {
  arbitrum,
  arbitrumGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/chains'

export const localhost: Chain = {
  id: 1_337,
  name: 'Localhost',
  network: 'localhost',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}

export const hardhat: Chain = {
  id: 31_337,
  name: 'Hardhat',
  network: 'hardhat',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}

export const foundry: Chain = {
  id: 31_337,
  name: 'Foundry',
  network: 'foundry',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
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
