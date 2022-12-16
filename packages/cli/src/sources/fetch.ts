// TODO: Remove `node-fetch` dependency when Node 18 is used more and `fetch` is stable.
import type { RequestInfo, RequestInit, Response } from 'node-fetch'
import { default as nodeFetch } from 'node-fetch'

import type { Contract, ContractsSource } from '../config'

type Request = { url: RequestInfo; init?: RequestInit | undefined }

export type FetchConfig = {
  contracts: Omit<Contract, 'abi'>[]
  name?: ContractsSource['name']
  /**
   * Function for parsing ABI from fetch response.
   *
   * @default ({ response }) => response.json()
   */
  parse?({
    response,
  }: {
    response: Response
  }): Promise<Contract['abi']> | Contract['abi']
  /** Function for returning a request to fetch ABI from. */
  request(config: { address?: Contract['address'] }): Promise<Request> | Request
}

export function fetch({
  contracts: contractConfigs,
  name = 'Fetch',
  parse = ({ response }) => response.json() as Promise<Contract['abi']>,
  request,
}: FetchConfig): ContractsSource {
  const cache: Record<string, Contract['abi']> = {}
  return {
    async contracts() {
      const contracts = []
      for (const contract of contractConfigs) {
        const { url, init } = await request(contract)
        let abi = cache[url.toString()]
        if (!abi) {
          const response = await nodeFetch(url, init)
          abi = await parse({ response })
          cache[url.toString()] = abi
        }
        contracts.push({ abi, address: contract.address, name: contract.name })
      }
      return contracts
    },
    name,
  }
}
