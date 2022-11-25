import type { SourceFn } from '../config'
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

type EtherscanConfig = {
  /**
   * Etherscan API key
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
  // TODO: Add baseUrl
  /**
   * Chain id to use for fetching contract interface
   */
  chainId?: ChainId
}

export function etherscan({ apiKey, chainId }: EtherscanConfig): SourceFn {
  return blockExplorer({
    getApiUrl({ address }) {
      if (!chainId)
        throw new Error(
          `"chainId" is required. Either pass it to the source function (e.g. \`etherscan({ chainId: 1 })\`) or the top-level contract config.`,
        )
      const baseUrl = apiUrls[chainId as ChainId]
      if (!baseUrl)
        throw new Error(`No API url found for chain id "${chainId}"`)
      return `${baseUrl}?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    },
    async getAbi({ response }) {
      type EtherscanResponse =
        | { status: '1'; message: 'OK'; result: string }
        | { status: '0'; message: 'NOTOK'; result: string }
      const data = (await response.json()) as EtherscanResponse
      if (data.status === '0') throw new Error(data.result)
      return JSON.parse(data.result)
    },
  })
}
