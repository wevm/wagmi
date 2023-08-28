import type { Config, GetEnsAvatarError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  type GetEnsAvatarQueryFnData,
  type GetEnsAvatarQueryKey,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = Evaluate<
  GetEnsAvatarOptions<config> &
    UseQueryParameters<
      GetEnsAvatarQueryFnData,
      GetEnsAvatarError,
      selectData,
      GetEnsAvatarQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryResult<selectData, GetEnsAvatarError>

/** https://wagmi.sh/react/hooks/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters: UseEnsAvatarParameters<config, selectData> = {},
): UseEnsAvatarReturnType<selectData> {
  const { name, ...query } = parameters
  const config = parameters.config ?? useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getEnsAvatarQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(name && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
