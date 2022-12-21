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
  [421_611]: 'https://api-testnet.arbiscan.io/api',
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
}
type ChainId = keyof typeof apiUrls

type EtherscanConfig<TChainId extends number> = {
  /**
   * Etherscan API key.
   *
   * API keys are specific per network and include testnets (e.g. Ethereum Mainnet and Goerli share same API key). Create or manage keys:
   * - [Ethereum](https://etherscan.io/myapikey)
   * - [Arbitrum](https://arbiscan.io/myapikey)
   * - [Avalanche](https://snowtrace.io/myapikey)
   * - [BNB Smart Chain](https://bscscan.com/myapikey)
   * - [Fantom](https://ftmscan.com/myapikey)
   * - [Heco Chain](https://hecoinfo.com/myapikey)
   * - [Optimism](https://optimistic.etherscan.io/myapikey)
   * - [Polygon](https://polygonscan.com/myapikey)
   */
  apiKey: string
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
  chainId,
  contracts,
}: EtherscanConfig<TChainId>) {
  return blockExplorer({
    apiKey,
    baseUrl: apiUrls[chainId as ChainId],
    contracts: contracts as Omit<ContractConfig, 'abi'>[],
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
