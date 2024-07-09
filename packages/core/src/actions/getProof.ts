import {
  type GetProofErrorType as viem_GetProofErrorType,
  type GetProofParameters as viem_GetProofParameters,
  type GetProofReturnType as viem_GetProofReturnType,
  getProof as viem_getProof,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetProofParameters<config extends Config = Config> = Compute<
  viem_GetProofParameters & ChainIdParameter<config>
>

export type GetProofReturnType = viem_GetProofReturnType

export type GetProofErrorType = viem_GetProofErrorType

/** https://wagmi.sh/core/api/actions/getProof */
export async function getProof<config extends Config>(
  config: config,
  parameters: GetProofParameters<config>,
): Promise<GetProofReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getProof, 'getProof')
  return action(rest)
}
