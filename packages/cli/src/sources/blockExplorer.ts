import type { Abi } from 'abitype'
import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

import type { ContractConfig } from '../config'

type BlockExplorerConfig = {
  /** Contract address. */
  address: ContractConfig['address']
  /** Function for returning a block explorer URL to request ABI from. */
  getApiUrl(config: {
    address?: ContractConfig['address']
  }): Promise<string> | string
  /** Contract name. */
  name: ContractConfig['name']
  /**
   * Function for parsing ABI from API response.
   *
   * @default ({ response }) => response.json()
   */
  parseAbi?({ response }: { response: Response }): Promise<Abi> | Abi
}

export function blockExplorer({
  address,
  getApiUrl,
  name,
  parseAbi = ({ response }) => response.json() as Promise<Abi>,
}: BlockExplorerConfig): ContractConfig {
  const cache: Record<string, Abi> = {}
  return {
    address,
    name,
    async source() {
      const apiUrl = await getApiUrl({ address })
      if (cache[apiUrl]) return cache[apiUrl] as Abi

      const response = await fetch(apiUrl)
      const abi = await parseAbi({ response })

      cache[apiUrl] = abi
      return abi
    },
  }
}
