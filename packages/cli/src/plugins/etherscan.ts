import type { ContractConfig } from '../config.js'
import type { Compute } from '../types.js'
import { blockExplorer } from './blockExplorer.js'

const apiUrls = {
  // Ethereum
  [1]: 'https://api.etherscan.io/api',
  [5]: 'https://api-goerli.etherscan.io/api',
  [17_000]: 'https://api-holesky.etherscan.io/api',
  [11_155_111]: 'https://api-sepolia.etherscan.io/api',
  // Optimism
  [10]: 'https://api-optimistic.etherscan.io/api',
  [420]: 'https://api-goerli-optimistic.etherscan.io/api',
  [11_155_420]: 'https://api-sepolia-optimistic.etherscan.io/api',
  // Base
  [84532]: 'https://api-sepolia.basescan.org/api',
  [8453]: 'https://api.basescan.org/api',
  // Polygon
  [137]: 'https://api.polygonscan.com/api',
  [80_001]: 'https://api-testnet.polygonscan.com/api',
  [80_002]: 'https://api-amoy.polygonscan.com/api',
  // Arbitrum
  [42_161]: 'https://api.arbiscan.io/api',
  [421_613]: 'https://api-goerli.arbiscan.io/api',
  [421_614]: 'https://api-sepolia.arbiscan.io/api',
  // BNB Smart Chain
  [56]: 'https://api.bscscan.com/api',
  [97]: 'https://api-testnet.bscscan.com/api',
  // Heco Chain
  [128]: 'https://api.hecoinfo.com/api',
  [256]: 'https://api-testnet.hecoinfo.com/api',
  // Sonic
  [146]: 'https://api.sonicscan.org/api',
  // Fantom
  [250]: 'https://api.ftmscan.com/api',
  [4_002]: 'https://api-testnet.ftmscan.com/api',
  // Avalanche
  [43_114]: 'https://api.snowscan.xyz/api',
  [43_113]: 'https://api-testnet.snowscan.xyz/api',
  // Celo
  [42_220]: 'https://api.celoscan.io/api',
  [44_787]: 'https://api-alfajores.celoscan.io/api',
  // Fraxtal
  [252]: 'https://api.fraxscan.com/api',
  [2_522]: 'https://api-holesky.fraxscan.com/api',
  // Gnosis
  [100]: 'https://api.gnosisscan.io/api',
  // Blast
  [81_457]: 'https://api.blastscan.io/api',
}
type ChainId = keyof typeof apiUrls

export type EtherscanConfig<chainId extends number> = {
  /**
   * Etherscan API key.
   *
   * API keys are specific per network and include testnets (e.g. Ethereum Mainnet and Goerli share same API key). Create or manage keys:
   * - [__Ethereum__](https://etherscan.io/myapikey)
   * - [__Arbitrum__](https://arbiscan.io/myapikey)
   * - [__Avalanche__](https://snowscan.xyz/myapikey)
   * - [__BNB Smart Chain__](https://bscscan.com/myapikey)
   * - [__Base__](https://basescan.org/myapikey)
   * - [__Blast__](https://blastscan.io/myapikey)
   * - [__Celo__](https://celoscan.io/myapikey)
   * - [__Fantom__](https://ftmscan.com/myapikey)
   * - [__Fraxtal__](https://fraxscan.com/myapikey)
   * - [__Gnosis__](https://gnosisscan.io/myapikey)
   * - [__Heco Chain__](https://hecoinfo.com/myapikey)
   * - [__Optimism__](https://optimistic.etherscan.io/myapikey)
   * - [__Polygon__](https://polygonscan.com/myapikey)
   * - [__Sonic__](https://sonicscan.org/myapikey)
   */
  apiKey: string
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   */
  chainId: chainId
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig<ChainId, chainId>, 'abi'>>[]
}

/**
 * Fetches contract ABIs from Etherscan.
 */
export function etherscan<chainId extends ChainId>(
  config: EtherscanConfig<chainId>,
) {
  const { apiKey, cacheDuration, chainId } = config

  const contracts = config.contracts.map((x) => ({
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
