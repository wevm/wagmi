import type {
  Config,
  GetEnsAvatarErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  type GetEnsAvatarQueryFnData,
  type GetEnsAvatarQueryKey,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'

import { type CreateQueryReturnType, createQuery } from '../query.svelte.js'
import type { RuneParameters, RuneReturnType } from '../types.js'
import type { ConfigParameter, QueryParameter } from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = RuneParameters<
  Compute<
    GetEnsAvatarOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetEnsAvatarQueryFnData,
        GetEnsAvatarErrorType,
        selectData,
        GetEnsAvatarQueryKey<config>
      >
  >
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  RuneReturnType<CreateQueryReturnType<selectData, GetEnsAvatarErrorType>>

/** https://wagmi.sh/react/api/hooks/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters: UseEnsAvatarParameters<config, selectData> = () => ({}),
): UseEnsAvatarReturnType<selectData> {
  const { name, query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(() => ({ config })))

  const options = $derived(
    getEnsAvatarQueryOptions(config, {
      ...parameters(),
      chainId: parameters().chainId ?? chainId,
    }),
  )

  const enabled = $derived(Boolean(name && (query.enabled ?? true)))

  return createQuery(() => ({ ...query, ...options, enabled }))
}
