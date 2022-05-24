import {
  arbitrum,
  arbitrumRinkeby,
  goerli,
  hardhat,
  kovan,
  localhost,
  mainnet,
  optimism,
  optimismKovan,
  polygon,
  polygonMumbai,
  rinkeby,
  ropsten,
} from '../chains'
import { Chain } from '../types'

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
} as const

export const allChains = Object.values(chain)

export const defaultChains: Chain[] = [
  chain.mainnet,
  chain.ropsten,
  chain.rinkeby,
  chain.goerli,
  chain.kovan,
]

export const defaultL2Chains: Chain[] = [
  chain.arbitrum,
  chain.arbitrumRinkeby,
  chain.optimism,
  chain.optimismKovan,
]
