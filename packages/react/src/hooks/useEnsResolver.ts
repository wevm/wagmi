import type { Config, GetEnsResolverError, ResolvedRegister } from '@wagmi/core'
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
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsResolverParameters<
  config extends Config = Config,
  selectData = GetEnsResolverData,
> = Evaluate<
  GetEnsResolverOptions<config> &
    UseQueryParameters<
      GetEnsResolverQueryFnData,
      GetEnsResolverError,
      selectData,
      GetEnsResolverQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseEnsResolverReturnType<selectData = GetEnsResolverData> =
  UseQueryResult<selectData, GetEnsResolverError>

/** https://wagmi.sh/react/hooks/useEnsResolver */
export function useEnsResolver<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsResolverData,
>(
  parameters: UseEnsResolverParameters<config, selectData> = {},
): UseEnsResolverReturnType<selectData> {
  const { name, ...query } = parameters
  const config = parameters.config ?? useConfig()

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
