'use client'
import type {
  Config,
  GetEnsResolverErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsResolverData,
  type GetEnsResolverOptions,
  getEnsResolverQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsResolverParameters<
  config extends Config = Config,
  selectData = GetEnsResolverData,
> = Compute<GetEnsResolverOptions<config, selectData> & ConfigParameter<config>>

export type UseEnsResolverReturnType<selectData = GetEnsResolverData> =
  UseQueryReturnType<selectData, GetEnsResolverErrorType>

/** https://wagmi.sh/react/api/hooks/useEnsResolver */
export function useEnsResolver<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsResolverData,
>(
  parameters: UseEnsResolverParameters<config, selectData> = {},
): UseEnsResolverReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getEnsResolverQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
