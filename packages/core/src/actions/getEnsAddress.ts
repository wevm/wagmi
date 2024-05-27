import {
  type GetEnsAddressErrorType as viem_GetEnsAddressErrorType,
  type GetEnsAddressParameters as viem_GetEnsAddressParameters,
  type GetEnsAddressReturnType as viem_GetEnsAddressReturnType,
  getEnsAddress as viem_getEnsAddress,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetEnsAddressParameters<config extends Config = Config> = Evaluate<
  viem_GetEnsAddressParameters & ChainIdParameter<config>
>

export type GetEnsAddressReturnType = viem_GetEnsAddressReturnType

export type GetEnsAddressErrorType = viem_GetEnsAddressErrorType

/** https://wagmi.sh/core/api/actions/getEnsAddress */
export function getEnsAddress<config extends Config>(
  config: config,
  parameters: GetEnsAddressParameters<config>,
): Promise<GetEnsAddressReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getEnsAddress, 'getEnsAddress')
  return action(rest)
}
