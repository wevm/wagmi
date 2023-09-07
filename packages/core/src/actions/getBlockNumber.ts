import {
  type GetBlockNumberParameters as viem_GetBlockNumberParameters,
  type GetBlockNumberReturnType as viem_GetBlockNumberReturnType,
  getBlockNumber as viem_getBlockNumber,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'

export type GetBlockNumberParameters<config extends Config = Config> = Evaluate<
  viem_GetBlockNumberParameters & ChainIdParameter<config>
>

export type GetBlockNumberReturnType = viem_GetBlockNumberReturnType

export type GetBlockNumberError = Error

/** https://alpha.wagmi.sh/core/actions/getBlockNumber */
export function getBlockNumber<config extends Config>(
  config: config,
  parameters: GetBlockNumberParameters<config> = {},
): Promise<GetBlockNumberReturnType> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getBlockNumber(client, parameters)
}
