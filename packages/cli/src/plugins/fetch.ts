// TODO: Remove `node-fetch` dependency when Node 18 is used more and `fetch` is stable.
import type { RequestInfo, RequestInit, Response } from 'node-fetch'
import { default as nodeFetch } from 'node-fetch'

import type { ContractConfig, Plugin } from '../config'

type Request = { url: RequestInfo; init?: RequestInit }

export type FetchConfig = {
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Omit<ContractConfig, 'abi'>[]
  /**
   * Name of source.
   */
  name?: ContractConfig['name']
  /**
   * Function for parsing ABI from fetch response.
   *
   * @default ({ response }) => response.json()
   */
  parse?({
    response,
  }: {
    response: Response
  }): Promise<ContractConfig['abi']> | ContractConfig['abi']
  /**
   * Function for returning a request to fetch ABI from.
   */
  request(config: {
    address?: ContractConfig['address']
  }): Promise<Request> | Request
}

type FetchResult = Omit<Plugin, 'contracts'> &
  Required<Pick<Plugin, 'contracts'>>

/**
 * Fetches and parses contract ABIs from network resource with `fetch`.
 */
export function fetch({
  contracts: contractConfigs,
  name = 'Fetch',
  parse = ({ response }) => response.json() as Promise<ContractConfig['abi']>,
  request,
}: FetchConfig): FetchResult {
  return {
    async contracts() {
      const contracts = []
      for (const contract of contractConfigs) {
        const { url, init } = await request(contract)
        const response = await nodeFetch(url, init)
        const abi = await parse({ response })
        contracts.push({ abi, address: contract.address, name: contract.name })
      }
      return contracts
    },
    name,
  }
}
