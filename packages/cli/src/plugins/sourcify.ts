import { Abi as AbiSchema } from 'abitype/zod'
import type { Address } from 'viem'
import type * as chain from 'viem/chains'
import { z } from 'zod'

import type { ContractConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import type { Compute } from '../types.js'
import { fetch } from './fetch.js'

export type SourcifyConfig<chainId extends number> = {
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   *
   * See https://docs.sourcify.dev/docs/chains for supported chains.
   */
  chainId: chainId
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig<ChainId, chainId>, 'abi'>>[]
}

const SourcifyResponse = z.object({
  compiler: z.object({
    version: z.string(),
  }),
  language: z.string(),
  output: z.object({
    abi: AbiSchema,
    devdoc: z.any(),
    userdoc: z.any(),
  }),
  settings: z.any(),
  sources: z.any(),
  version: z.number(),
})

/** Fetches contract ABIs from Sourcify. */
export function sourcify<chainId extends ChainId>(
  config: SourcifyConfig<chainId>,
) {
  const { cacheDuration, chainId, contracts: contracts_ } = config

  const contracts = contracts_.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]

  return fetch({
    cacheDuration,
    contracts,
    async parse({ response }) {
      if (response.status === 404)
        throw new Error('Contract not found in Sourcify repository.')

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

      let contractAddress: Address | undefined
      if (typeof address === 'string') contractAddress = address
      else if (typeof address === 'object') contractAddress = address[chainId]

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

// Supported chains
// https://docs.sourcify.dev/docs/chains
type ChainId =
  | typeof chain.mainnet.id
  | typeof chain.goerli.id
  | 11155111
  | typeof chain.arbitrumGoerli.id
  | typeof chain.arbitrum.id
  | 592
  | typeof chain.aurora.id
  | typeof chain.auroraTestnet.id
  | typeof chain.avalanche.id
  | typeof chain.avalancheFuji.id
  | 56
  | 97
  | 288
  | 28
  | 534
  | typeof chain.canto.id
  | typeof chain.celoAlfajores.id
  | 62320
  | typeof chain.celo.id
  | typeof chain.gnosisChiado.id
  | 103090
  | 53935
  | 335
  | 44
  | 43
  | 432204
  | 432201
  | 246
  | 73799
  | typeof chain.evmos.id
  | typeof chain.evmosTestnet.id
  | 122
  | 486217935
  | 192837465
  | 356256156
  | typeof chain.gnosis.id
  | 71402
  | 71401
  | 420420
  | 420666
  | 8217
  | 1001
  | 82
  | 83
  | 1287
  | 1284
  | 1285
  | 62621
  | 42262
  | 42261
  | 23295
  | 311752642
  | 4216137055
  | typeof chain.optimism.id
  | 28528
  | typeof chain.optimismGoerli.id
  | 300
  | 99
  | 77
  | 11297108109
  | 11297108099
  | typeof chain.polygon.id
  | typeof chain.polygonMumbai.id
  | typeof chain.polygonAmoy.id
  | 336
  | 57
  | 5700
  | 40
  | 41
  | 8
  | 106
  | 11111
  | 51
  | 7001
