import { z } from 'zod'

import type { Contract } from '../config'

import { type BlockExplorerConfig, blockExplorer } from './blockExplorer'

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

type EtherscanConfig = Pick<BlockExplorerConfig, 'contracts'> & {
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
  chainId: ChainId
}

const EtherscanResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('1'),
    message: z.literal('OK'),
    result: z.string().transform((val) => JSON.parse(val) as Contract['abi']),
  }),
  z.object({
    status: z.literal('0'),
    message: z.literal('NOTOK'),
    result: z.string(),
  }),
])

export function etherscan({ apiKey, chainId, contracts }: EtherscanConfig) {
  return blockExplorer({
    contracts,
    name: 'Etherscan',
    async parse({ response }) {
      const json = await response.json()
      const parsed = await EtherscanResponse.safeParseAsync(json)
      if (!parsed.success) throw new Error(parsed.error.message)
      if (parsed.data.status === '0') throw new Error(parsed.data.result)
      return parsed.data.result
    },
    url({ address }) {
      if (!address) throw new Error('address is required')
      const baseUrl = apiUrls[chainId as ChainId]
      if (!baseUrl)
        throw new Error(`No API URL found for chain id "${chainId}"`)
      const contractAddress =
        typeof address === 'string' ? address : address[chainId]
      if (!contractAddress)
        throw new Error(`No address found for chainId "${chainId}"`)
      return `${baseUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
    },
  })
}
