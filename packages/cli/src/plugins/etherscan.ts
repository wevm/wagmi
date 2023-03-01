import type { ContractConfig } from '../config'
import { blockExplorer } from './blockExplorer'

const apiUrls = {
  // Ethereum
  [1]: 'https://api.etherscan.io/api',
  [5]: 'https://api-goerli.etherscan.io/api',
  // Optimism
  [10]: 'https://api-optimistic.etherscan.io/api',
  [69]: 'https://api-goerli-optimistic.etherscan.io/api',
  // Polygon
  [137]: 'https://api.polygonscan.com/api',
  [80_001]: 'https://api-testnet.polygonscan.com/api',
  // Arbitrum
  [42_161]: 'https://api.arbiscan.io/api',
  [421_613]: 'https://api-goerli.arbiscan.io/api',
  // BNB Smart Chain
  [56]: 'https://api.bscscan.com/api',
  [97]: 'https://api-testnet.bscscan.com/api',
  // Heco Chain
  [128]: 'https://api.hecoinfo.com/api',
  [256]: 'https://api-testnet.hecoinfo.com/api',
  // Fantom
  [250]: 'https://api.ftmscan.com/api',
  [4002]: 'https://api-testnet.ftmscan.com/api',
  // Avalanche
  [43114]: 'https://api.snowtrace.io/api',
  [43113]: 'https://api-testnet.snowtrace.io/api',
  // Celo
  [42220]: 'https://api.celoscan.io/api',
  [44787]: 'https://api-alfajores.celoscan.io/api',
}
type ChainId = keyof typeof apiUrls

type EtherscanConfig<TChainId extends number> = {
  /**
   * Etherscan API key.
   *
   * API keys are specific per network and include testnets (e.g. Ethereum Mainnet and Goerli share same API key). Create or manage keys:
   * - [__Ethereum__](https://etherscan.io/myapikey)
   * - [__Arbitrum__](https://arbiscan.io/myapikey)
   * - [__Avalanche__](https://snowtrace.io/myapikey)
   * - [__BNB Smart Chain__](https://bscscan.com/myapikey)
   * - [__Celo__](https://celoscan.io/myapikey)
   * - [__Fantom__](https://ftmscan.com/myapikey)
   * - [__Heco Chain__](https://hecoinfo.com/myapikey)
   * - [__Optimism__](https://optimistic.etherscan.io/myapikey)
   * - [__Polygon__](https://polygonscan.com/myapikey)
   */
  apiKey: string
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   */
  chainId: TChainId
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Omit<ContractConfig<ChainId, TChainId>, 'abi'>[]
}

/**
 * Fetches contract ABIs from Etherscan.
 */
export function etherscan<TChainId extends ChainId>({
  apiKey,
  cacheDuration,
  chainId,
  contracts: contracts_,
}: EtherscanConfig<TChainId>) {
  const contracts = contracts_.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]
  return blockExplorer({
    apiKey,
    baseUrl: apiUrls[chainId as ChainId],
    cacheDuration,
    contracts,
    getAddress({ address }) {
      if (!address) throw new Error('address is required')
      if (typeof address === 'string') return address
      const contractAddress = address[chainId]
      if (!contractAddress)
        throw new Error(
          `No address found for chainId "${chainId}". Make sure chainId "${chainId}" is set as an address.`,
        )
      return contractAddress
    },
    name: 'Etherscan',
  })
}
