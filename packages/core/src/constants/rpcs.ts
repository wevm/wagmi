import { ChainName } from './chains'

export const defaultAlchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC'
export const defaultInfuraId = '84842078b09946638c03157f83405213'

export type RpcProviderName = 'alchemy' | 'infura'

type AlchemyChains = Extract<
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
export const alchemyRpcUrls: Record<AlchemyChains, string> = {
  mainnet: 'https://eth-mainnet.alchemyapi.io/v2',
  ropsten: 'https://eth-ropsten.alchemyapi.io/v2',
  rinkeby: 'https://eth-rinkeby.alchemyapi.io/v2',
  goerli: 'https://eth-goerli.alchemyapi.io/v2',
  kovan: 'https://eth-kovan.alchemyapi.io/v2',
  optimism: 'https://opt-mainnet.g.alchemy.com/v2',
  optimismKovan: 'https://opt-kovan.g.alchemy.com/v2',
  polygon: 'https://polygon-mainnet.g.alchemy.com/v2',
  polygonMumbai: 'https://polygon-mumbai.g.alchemy.com/v2',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2',
  arbitrumRinkeby: 'https://arb-rinkeby.g.alchemy.com/v2',
} as const

type InfuraChains = Extract<
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
export const infuraRpcUrls: Record<InfuraChains, string> = {
  mainnet: 'https://mainnet.infura.io/v3',
  ropsten: 'https://ropsten.infura.io/v3',
  rinkeby: 'https://rinkeby.infura.io/v3',
  goerli: 'https://goerli.infura.io/v3',
  kovan: 'https://kovan.infura.io/v3',
  optimism: 'https://optimism-mainnet.infura.io/v3',
  optimismKovan: 'https://optimism-kovan.infura.io/v3',
  polygon: 'https://polygon-mainnet.infura.io/v3',
  polygonMumbai: 'https://polygon-mumbai.infura.io/v3',
  arbitrum: 'https://arbitrum-mainnet.infura.io/v3',
  arbitrumRinkeby: 'https://arbitrum-rinkeby.infura.io/v3',
} as const
