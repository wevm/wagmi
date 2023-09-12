'use client'

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
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = Evaluate<
  GetEnsAvatarOptions<config> &
    ConfigParameter<config> & {
      query?: UseQueryParameters<
        GetEnsAvatarQueryFnData,
        GetEnsAvatarError,
        selectData,
        GetEnsAvatarQueryKey<config>
      >
    }
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryReturnType<selectData, GetEnsAvatarError>

/** https://alpha.wagmi.sh/react/api/hooks/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters: UseEnsAvatarParameters<config, selectData> = {},
): UseEnsAvatarReturnType<selectData> {
  const { name, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = getEnsAvatarQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(name && (query.enabled ?? true))

  return useQuery({ ...queryOptions, ...query, enabled })
}
