import { ChainName } from './chains'

export type RpcProviderName = 'alchemy' | 'infura' | 'public'

type AlchemyChains = Extract<
  ChainName,
  | 'mainnet'
  | 'goerli'
  | 'optimism'
  | 'optimismGoerli'
  | 'polygon'
  | 'polygonMumbai'
  | 'arbitrum'
  | 'arbitrumGoerli'
>
export const alchemyRpcUrls: Record<AlchemyChains, string> = {
  mainnet: 'https://eth-mainnet.alchemyapi.io/v2',
  goerli: 'https://eth-goerli.alchemyapi.io/v2',
  optimism: 'https://opt-mainnet.g.alchemy.com/v2',
  optimismGoerli: 'https://opt-goerli.g.alchemy.com/v2',
  polygon: 'https://polygon-mainnet.g.alchemy.com/v2',
  polygonMumbai: 'https://polygon-mumbai.g.alchemy.com/v2',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2',
  arbitrumGoerli: 'https://arb-goerli.g.alchemy.com/v2',
} as const

type InfuraChains = Extract<
  ChainName,
  | 'mainnet'
  | 'goerli'
  | 'sepolia'
  | 'optimism'
  | 'optimismGoerli'
  | 'polygon'
  | 'polygonMumbai'
  | 'arbitrum'
  | 'arbitrumGoerli'
>
export const infuraRpcUrls: Record<InfuraChains, string> = {
  mainnet: 'https://mainnet.infura.io/v3',
  goerli: 'https://goerli.infura.io/v3',
  sepolia: 'https://sepolia.infura.io/v3',
  optimism: 'https://optimism-mainnet.infura.io/v3',
  optimismGoerli: 'https://optimism-goerli.infura.io/v3',
  polygon: 'https://polygon-mainnet.infura.io/v3',
  polygonMumbai: 'https://polygon-mumbai.infura.io/v3',
  arbitrum: 'https://arbitrum-mainnet.infura.io/v3',
  arbitrumGoerli: 'https://arbitrum-goerli.infura.io/v3',
} as const

type PublicChains = Extract<
  ChainName,
  | 'mainnet'
  | 'goerli'
  | 'sepolia'
  | 'optimism'
  | 'optimismGoerli'
  | 'polygon'
  | 'polygonMumbai'
  | 'arbitrum'
  | 'arbitrumGoerli'
>
export const publicRpcUrls: Record<PublicChains, string> = {
  mainnet: 'https://cloudflare-eth.com',
  goerli: 'https://rpc.ankr.com/eth_goerli',
  sepolia: 'https://rpc.sepolia.org',
  optimism: 'https://mainnet.optimism.io',
  optimismGoerli: 'https://goerli.optimism.io',
  polygon: 'https://polygon-rpc.com',
  polygonMumbai: 'https://matic-mumbai.chainstacklabs.com',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  arbitrumGoerli: 'https://goerli-rollup.arbitrum.io/rpc',
} as const
