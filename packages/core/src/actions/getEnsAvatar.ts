import {
  type GetEnsAvatarErrorType as viem_GetEnsAvatarErrorType,
  type GetEnsAvatarParameters as viem_GetEnsAvatarParameters,
  type GetEnsAvatarReturnType as viem_GetEnsAvatarReturnType,
  getEnsAvatar as viem_getEnsAvatar,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetEnsAvatarParameters<config extends Config = Config> = Evaluate<
  viem_GetEnsAvatarParameters & ChainIdParameter<config>
>

export type GetEnsAvatarReturnType = viem_GetEnsAvatarReturnType

export type GetEnsAvatarErrorType = viem_GetEnsAvatarErrorType

/** https://wagmi.sh/core/api/actions/getEnsAvatar */
export function getEnsAvatar<config extends Config>(
  config: config,
  parameters: GetEnsAvatarParameters<config>,
): Promise<GetEnsAvatarReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getEnsAvatar, 'getEnsAvatar')
  return action(rest)
}
