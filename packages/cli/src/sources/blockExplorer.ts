import { z } from 'zod'

import type { Contract, ContractsSource } from '../config'
import { fetch } from './fetch'

export type BlockExplorerConfig = {
  /**
   * API key for block explorer. Appended to the request URL as query param `&apikey=${apiKey}`.
   */
  apiKey?: string
  /**
   * Base URL for block explorer.
   */
  baseUrl: string
  contracts: Omit<Contract, 'abi'>[]
  getAddress?(config: { address: Contract['address'] }): string
  name?: ContractsSource['name']
}

const BlockExplorerResponse = z.discriminatedUnion('status', [
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

export function blockExplorer({
  apiKey,
  baseUrl,
  contracts,
  getAddress = ({ address }) => {
    if (!address) throw new Error('address is required')
    if (typeof address === 'string') return address
    return Object.values(address)[0]!
  },
  name = 'Block Explorer',
}: BlockExplorerConfig): ContractsSource {
  return fetch({
    contracts,
    name,
    async parse({ response }) {
      const json = await response.json()
      const parsed = await BlockExplorerResponse.safeParseAsync(json)
      if (!parsed.success) throw new Error(parsed.error.message)
      if (parsed.data.status === '0') throw new Error(parsed.data.result)
      return parsed.data.result
    },
    request({ address }) {
      if (!address) throw new Error('address is required')
      return {
        url: `${baseUrl}?module=contract&action=getabi&address=${getAddress({
          address,
        })}${apiKey ? `&apikey=${apiKey}` : ''}`,
      }
    },
  })
}
