import type { Config, GetEnsNameError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsNameParameters<
  config extends Config = Config,
  selectData = GetEnsNameData,
> = Evaluate<
  GetEnsNameOptions<config> &
    UseQueryParameters<
      GetEnsNameQueryFnData,
      GetEnsNameError,
      selectData,
      GetEnsNameQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseEnsNameReturnType<selectData = GetEnsNameData> = UseQueryResult<
  selectData,
  GetEnsNameError
>

/** https://wagmi.sh/react/hooks/useEnsName */
export function useEnsName<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsNameData,
>(
  parameters: UseEnsNameParameters<config, selectData> = {},
): UseEnsNameReturnType<selectData> {
  const { address, ...query } = parameters
  const config = parameters.config ?? useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getEnsNameQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(address && (parameters.enabled ?? true))

  return useQuery({ ...queryOptions, ...query, enabled })
}
