import type { GetEnsResolverError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsResolverData,
  type GetEnsResolverOptions,
  type GetEnsResolverQueryFnData,
  type GetEnsResolverQueryKey,
  getEnsResolverQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsResolverParameters<selectData = GetEnsResolverData> =
  Evaluate<
    GetEnsResolverOptions<ResolvedRegister['config']> &
      UseQueryParameters<
        GetEnsResolverQueryFnData,
        GetEnsResolverError,
        selectData,
        GetEnsResolverQueryKey<ResolvedRegister['config']>
      >
  >

export type UseEnsResolverReturnType<selectData = GetEnsResolverData> =
  UseQueryResult<selectData, GetEnsResolverError>

/** https://wagmi.sh/react/hooks/useEnsResolver */
export function useEnsResolver<selectData = GetEnsResolverData>(
  parameters: UseEnsResolverParameters<selectData>,
): UseEnsResolverReturnType<selectData> {
  const { name, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getEnsResolverQueryOptions(config, {
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
