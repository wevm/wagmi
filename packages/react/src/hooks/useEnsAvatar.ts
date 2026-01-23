'use client'
import type {
  Config,
  GetEnsAvatarErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = Compute<GetEnsAvatarOptions<config, selectData> & ConfigParameter<config>>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryReturnType<selectData, GetEnsAvatarErrorType>

/** https://wagmi.sh/react/api/hooks/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters: UseEnsAvatarParameters<config, selectData> = {},
): UseEnsAvatarReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getEnsAvatarQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
