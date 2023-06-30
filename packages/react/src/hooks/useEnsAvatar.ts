import type { GetEnsAvatarError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  type GetEnsAvatarQueryFnData,
  type GetEnsAvatarQueryKey,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<selectData = GetEnsAvatarData> = Evaluate<
  GetEnsAvatarOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetEnsAvatarQueryFnData,
      GetEnsAvatarError,
      selectData,
      GetEnsAvatarQueryKey<ResolvedRegister['config']>
    >
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryResult<selectData, GetEnsAvatarError>

/** https://wagmi.sh/react/hooks/useEnsAvatar */
export function useEnsAvatar<selectData = GetEnsAvatarData>(
  parameters: UseEnsAvatarParameters<selectData>,
): UseEnsAvatarReturnType<selectData> {
  const { name, ...query } = parameters
  const config = useConfig()

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
