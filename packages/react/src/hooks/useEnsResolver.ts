'use client'

import type {
  Config,
  GetEnsResolverErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsResolverData,
  type GetEnsResolverOptions,
  type GetEnsResolverQueryFnData,
  type GetEnsResolverQueryKey,
  getEnsResolverQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsResolverParameters<
  config extends Config = Config,
  selectData = GetEnsResolverData,
> = Evaluate<
  GetEnsResolverOptions<config> &
    ConfigParameter<config> & {
      query?:
        | UseQueryParameters<
            GetEnsResolverQueryFnData,
            GetEnsResolverErrorType,
            selectData,
            GetEnsResolverQueryKey<config>
          >
        | undefined
    }
>

export type UseEnsResolverReturnType<selectData = GetEnsResolverData> =
  UseQueryReturnType<selectData, GetEnsResolverErrorType>

/** https://alpha.wagmi.sh/react/api/hooks/useEnsResolver */
export function useEnsResolver<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsResolverData,
>(
  parameters: UseEnsResolverParameters<config, selectData> = {},
): UseEnsResolverReturnType<selectData> {
  const { name, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = getEnsResolverQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(name && (query.enabled ?? true))

  return useQuery({ ...queryOptions, ...query, enabled })
}
