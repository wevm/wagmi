import { chainId } from '@wagmi/core'
import { ContractInterface } from 'ethers'
import fetch from 'node-fetch'

export type SourceFn<TChainId extends number = number> = (config: {
  address: string
  chainId: TChainId
}) => Promise<ContractInterface>

type EtherscanApiNetworks = 'mainnet' | 'optimism' | 'arbitrum' | 'polygon'
type EtherscanConfig = {
  apiKey: string | { [K in EtherscanApiNetworks]?: string }
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
    }
  }

  const cache: Record<string, ContractInterface> = {}
  return async ({ address, chainId }) => {
    const apiUrl = `${
      apiUrls[<ChainId>chainId]
    }?module=contract&action=getabi&address=${address}&apikey=${getApiKey(
      <ChainId>chainId,
    )}`
    if (cache[apiUrl]) return cache[apiUrl] as ContractInterface

    const response = await fetch(apiUrl)
    const data = (await response.json()) as {
      status: 1 | number
      message: 'OK' | string
      result: ContractInterface
    }
    cache[apiUrl] = data.result
    return data.result
  }
}
