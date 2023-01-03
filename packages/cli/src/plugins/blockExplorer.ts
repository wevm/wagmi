import type { Address } from 'abitype'
import { camelCase } from 'change-case'
import { z } from 'zod'

import type { ContractConfig } from '../config'
import { fromZodError } from '../errors'
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
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Omit<ContractConfig, 'abi'>[]
  /**
   * Function to get address from contract config.
   */
  getAddress?(config: {
    address: NonNullable<ContractConfig['address']>
  }): Address
  /**
   * Name of source.
   */
  name?: ContractConfig['name']
}

const BlockExplorerResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('1'),
    message: z.literal('OK'),
    result: z
      .string()
      .transform((val) => JSON.parse(val) as ContractConfig['abi']),
  }),
  z.object({
    status: z.literal('0'),
    message: z.literal('NOTOK'),
    result: z.string(),
  }),
])

/**
 * Fetches contract ABIs from block explorers, supporting `?module=contract&action=getabi` requests.
 */
export function blockExplorer({
  apiKey,
  baseUrl,
  cacheDuration,
  contracts,
  getAddress = ({ address }) => {
    if (typeof address === 'string') return address
    return Object.values(address)[0]!
  },
  name = 'Block Explorer',
}: BlockExplorerConfig) {
  return fetch({
    cacheDuration,
    contracts,
    name,
    getCacheKey({ contract }) {
      if (typeof contract.address === 'string')
        return `${camelCase(name)}:${contract.address}`
      return `${camelCase(name)}:${JSON.stringify(contract.address)}`
    },
    async parse({ response }) {
      const json = await response.json()
      const parsed = await BlockExplorerResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })
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
