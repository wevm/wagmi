import {
  type GetEnsNameErrorType as viem_GetEnsNameErrorType,
  type GetEnsNameParameters as viem_GetEnsNameParameters,
  type GetEnsNameReturnType as viem_GetEnsNameReturnType,
  getEnsName as viem_getEnsName,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetEnsNameParameters<config extends Config = Config> = Evaluate<
  viem_GetEnsNameParameters & ChainIdParameter<config>
>

export type GetEnsNameReturnType = viem_GetEnsNameReturnType

export type GetEnsNameErrorType = viem_GetEnsNameErrorType

/** https://wagmi.sh/core/api/actions/getEnsName */
export function getEnsName<config extends Config>(
  config: config,
  parameters: GetEnsNameParameters<config>,
): Promise<GetEnsNameReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getEnsName, 'getEnsName')
  return action(rest)
}
