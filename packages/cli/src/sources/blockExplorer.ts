import type { Abi, Address } from 'abitype'
import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

import type { SourceFn } from '../config'

type BlockExplorerConfig = {
  /** Function for returning a block explorer URL to request ABI from */
  getApiUrl(config: { address: Address }): Promise<string> | string
  /**
   * Function for returning ABI from API response
   * @default ({ response }) => response.json()
   */
  getAbi?({ response }: { response: Response }): Promise<Abi> | Abi
}

export function blockExplorer({
  getApiUrl,
  getAbi = ({ response }) => response.json() as Promise<Abi>,
}: BlockExplorerConfig): SourceFn {
  const cache: Record<string, Abi> = {}
  return async ({ address }) => {
    if (!address) throw new Error(`"address" is required`)

    const apiUrl = await getApiUrl({ address })
    if (cache[apiUrl]) return cache[apiUrl] as Abi

    const response = await fetch(apiUrl)
    const abi = await getAbi({ response })

    cache[apiUrl] = abi
    return abi
  }
}
