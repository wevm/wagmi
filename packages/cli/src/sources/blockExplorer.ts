import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

import type { Contract, ContractsSource } from '../config'

export type BlockExplorerConfig = {
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
  /** Function for returning a block explorer URL to request ABI from. */
  url(config: { address?: Contract['address'] }): Promise<string> | string
}

export function blockExplorer({
  contracts: contractConfigs,
  parse = ({ response }) => response.json() as Promise<Contract['abi']>,
  url,
}: BlockExplorerConfig): ContractsSource {
  const cache: Record<string, Contract['abi']> = {}
  return {
    async contracts() {
      const contracts = []
      for (const { address, name } of contractConfigs) {
        const endpoint = await url({ address })
        let abi = cache[endpoint]
        if (!abi) {
          const response = await fetch(endpoint)
          abi = await parse({ response })
          cache[endpoint] = abi
        }
        contracts.push({ abi, address, name })
      }
      return contracts
    },
    name: 'Block Explorer',
  }
}
