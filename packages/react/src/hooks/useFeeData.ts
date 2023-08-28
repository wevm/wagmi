import {
  type Config,
  type GetFeeDataError,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetFeeDataData,
  type GetFeeDataOptions,
  type GetFeeDataQueryFnData,
  type GetFeeDataQueryKey,
  getFeeDataQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseFeeDataParameters<
  config extends Config = Config,
  selectData = GetFeeDataData,
> = Evaluate<
  GetFeeDataOptions<config> &
    UseQueryParameters<
      GetFeeDataQueryFnData,
      GetFeeDataError,
      selectData,
      GetFeeDataQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseFeeDataReturnType<selectData = GetFeeDataData> = UseQueryResult<
  selectData,
  GetFeeDataError
>

/** https://wagmi.sh/react/hooks/useFeeData */
export function useFeeData<
  config extends Config = ResolvedRegister['config'],
  selectData = GetFeeDataData,
>(
  parameters: UseFeeDataParameters<config, selectData> = {},
): UseFeeDataReturnType<selectData> {
  const config = parameters.config ?? useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getFeeDataQueryOptions(config, {
    ...parameters,
    chainId,
  })

  return useQuery({
    ...queryOptions,
    ...parameters,
  })
}
