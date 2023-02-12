import { z } from 'zod'

import type { ContractConfig } from '../config'
import { fromZodError } from '../errors'
import { fetch } from './fetch'

type SourcifyConfig = {
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   */
  chainId: number
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Omit<ContractConfig<number>, 'abi'>[]
}

const SourcifyResponse = z.object({
  compiler: z.object({
    version: z.string(),
  }),
  language: z.string(),
  output: z.object({
    abi: z.any(),
    devdoc: z.any(),
    userdoc: z.any(),
  }),
  settings: z.any(),
  sources: z.any(),
  version: z.number(),
})

/**
 * Fetches contract ABIs from Sourcify.
 */
export function sourcify({
  cacheDuration,
  chainId,
  contracts: contracts_,
}: SourcifyConfig) {
  const contracts = contracts_.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]
  return fetch({
    cacheDuration,
    contracts,
    async parse({ response }) {
      const json = await response.json()
      const parsed = await SourcifyResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })

      if (parsed.data.output.abi)
        return parsed.data.output.abi as ContractConfig['abi']
      throw new Error('contract not found')
    },
    request({ address }) {
      if (!address) throw new Error('address is required')

      let contractAddress: any = ''
      if (typeof address === 'string') contractAddress = address
      if (typeof address === 'object') contractAddress = address[chainId]

      if (!contractAddress)
        throw new Error(
          `No address found for chainId "${chainId}". Make sure chainId "${chainId}" is set as an address.`,
        )

      return {
        url: `https://repo.sourcify.dev/contracts/full_match/${chainId}/${contractAddress}/metadata.json`,
      }
    },
  })
}
