import { chainId } from '@wagmi/core'
import fetch from 'node-fetch'

import { SourceFn } from '../config'
import { ContractInterface } from '../types'

type EtherscanNetworks = 'mainnet' | 'optimism' | 'arbitrum' | 'polygon'
type EtherscanConfig = {
  apiKey: string | { [K in EtherscanNetworks]?: string }
  // TODO: Follow proxy to implementation address
  // followProxy?: boolean
}

export function etherscan({ apiKey }: EtherscanConfig): SourceFn {
  const apiUrls = {
    [chainId.mainnet]: 'https://api.etherscan.io/api',
    [chainId.ropsten]: 'https://api-ropsten.etherscan.io/api',
    [chainId.rinkeby]: 'https://api-rinkeby.etherscan.io/api',
    [chainId.goerli]: 'https://api-goerli.etherscan.io/api',
    [chainId.kovan]: 'https://api-kovan.etherscan.io/api',
    [chainId.optimism]: 'https://api-optimistic.etherscan.io/api',
    [chainId.optimismKovan]: 'https://api-kovan-optimistic.etherscan.io/api',
    [chainId.polygon]: 'https://api.polygonscan.com/api',
    [chainId.polygonMumbai]: 'https://api-testnet.polygonscan.com/api',
    [chainId.arbitrum]: 'https://api.arbiscan.io/api',
    [chainId.arbitrumRinkeby]: 'https://api-testnet.arbiscan.io/api',
  }
  type ChainId = keyof typeof apiUrls

  const getApiKey = (id: ChainId) => {
    if (typeof apiKey === 'string') return apiKey

    switch (id) {
      case chainId.mainnet:
      case chainId.ropsten:
      case chainId.rinkeby:
      case chainId.goerli:
      case chainId.kovan:
        return apiKey.mainnet
      case chainId.optimism:
      case chainId.optimismKovan:
        return apiKey.optimism
      case chainId.polygon:
      case chainId.polygonMumbai:
        return apiKey.polygon
      case chainId.arbitrum:
      case chainId.arbitrumRinkeby:
        return apiKey.arbitrum
      default:
        throw new Error(`Chain id "${chainId}" not found.`)
    }
  }

  const cache: Record<string, ContractInterface> = {}
  return async ({ address, chainId = 1 }) => {
    const baseUrl = apiUrls[<ChainId>chainId]
    if (!baseUrl) throw new Error(`No API url found for chain id "${chainId}"`)
    const apiUrl = `${baseUrl}?module=contract&action=getabi&address=${address}&apikey=${getApiKey(
      <ChainId>chainId,
    )}`
    if (cache[apiUrl]) return cache[apiUrl] as ContractInterface

    type EtherscanResponse =
      | { status: '1'; message: 'OK'; result: ContractInterface }
      | { status: '0'; message: 'NOTOK'; result: string }
    const response = await fetch(apiUrl)
    const data = (await response.json()) as EtherscanResponse
    if (data.status === '0') throw new Error(data.result)

    cache[apiUrl] = data.result
    return data.result
  }
}
