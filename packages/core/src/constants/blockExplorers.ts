import { ChainName } from './chains'

export type BlockExplorerName = 'etherscan'
export type BlockExplorer = { name: string; url: string }

type EtherscanChains = Extract<
  ChainName,
  | 'mainnet'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'optimism'
  | 'optimismKovan'
  | 'polygon'
  | 'polygonMumbai'
  | 'arbitrum'
  | 'arbitrumRinkeby'
>
export const etherscanBlockExplorers: Record<EtherscanChains, BlockExplorer> = {
  mainnet: {
    name: 'Etherscan',
    url: 'https://etherscan.io',
  },
  ropsten: {
    name: 'Etherscan',
    url: 'https://ropsten.etherscan.io',
  },
  rinkeby: {
    name: 'Etherscan',
    url: 'https://rinkeby.etherscan.io',
  },
  goerli: {
    name: 'Etherscan',
    url: 'https://goerli.etherscan.io',
  },
  kovan: {
    name: 'Etherscan',
    url: 'https://kovan.etherscan.io',
  },
  optimism: {
    name: 'Etherscan',
    url: 'https://optimistic.etherscan.io',
  },
  optimismKovan: {
    name: 'Etherscan',
    url: 'https://kovan-optimistic.etherscan.io',
  },
  polygon: {
    name: 'PolygonScan',
    url: 'https://polygonscan.com',
  },
  polygonMumbai: {
    name: 'PolygonScan',
    url: 'https://mumbai.polygonscan.com',
  },
  arbitrum: { name: 'Arbiscan', url: 'https://arbiscan.io' },
  arbitrumRinkeby: { name: 'Arbiscan', url: 'https://testnet.arbiscan.io' },
} as const
