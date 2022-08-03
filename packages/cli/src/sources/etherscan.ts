import fetch from 'node-fetch'

import { SourceFn } from '../config'
import { ContractInterface } from '../types'

const apiUrls = {
  // Mainnet
  [1]: 'https://api.etherscan.io/api',
  [3]: 'https://api-ropsten.etherscan.io/api',
  [4]: 'https://api-rinkeby.etherscan.io/api',
  [5]: 'https://api-goerli.etherscan.io/api',
  [42]: 'https://api-kovan.etherscan.io/api',
  // Optimism
  [10]: 'https://api-optimistic.etherscan.io/api',
  [69]: 'https://api-kovan-optimistic.etherscan.io/api',
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
   * API keys are specific per network (e.g. Mainnet) and include testnets (e.g. Goerli). Create or manage keys:
   * - [Mainnet](https://etherscan.io/myapikey)
   * - [Arbitrum](https://arbiscan.io/myapikey)
   * - [Avalanche](https://snowtrace.io/myapikey)
   * - [BNB Smart Chain](https://bscscan.com/myapikey)
   * - [Fantom](https://ftmscan.com/myapikey)
   * - [Heco Chain](https://hecoinfo.com/myapikey)
   * - [Optimism](https://optimistic.etherscan.io/myapikey)
   * - [Polygon](https://polygonscan.com/myapikey)
   */
  apiKey?: string
  /**
   * Chain id to use for fetching contract interface
   */
  chainId: ChainId
}

export function etherscan({ apiKey, chainId }: EtherscanConfig): SourceFn {
  const cache: Record<string, ContractInterface> = {}
  return async ({ address }) => {
    const baseUrl = apiUrls[chainId]
    if (!baseUrl) throw new Error(`No API url found for chain id "${chainId}"`)

    const apiUrl = `${baseUrl}?module=contract&action=getabi&address=${address}${
      apiKey ? `&apikey=${apiKey}` : ''
    }`
    if (cache[apiUrl]) return cache[apiUrl] as ContractInterface

    type EtherscanResponse =
      | { status: '1'; message: 'OK'; result: string }
      | { status: '0'; message: 'NOTOK'; result: string }
    const response = await fetch(apiUrl)
    const data = (await response.json()) as EtherscanResponse
    if (data.status === '0') throw new Error(data.result)

    const contractInterface = JSON.parse(data.result) as ContractInterface
    cache[apiUrl] = contractInterface
    return contractInterface
  }
}
