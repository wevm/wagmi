import { type GetFeeDataError, type ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetFeeDataData,
  type GetFeeDataOptions,
  type GetFeeDataQueryFnData,
  type GetFeeDataQueryKey,
  getFeeDataQueryOptions,
} from '@wagmi/core/query'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseFeeDataParameters<selectData = GetFeeDataData> = Evaluate<
  GetFeeDataOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetFeeDataQueryFnData,
      GetFeeDataError,
      selectData,
      GetFeeDataQueryKey<ResolvedRegister['config']>
    >
>

export type UseFeeDataReturnType<selectData = GetFeeDataData> = UseQueryResult<
  selectData,
  GetFeeDataError
>

/** https://wagmi.sh/react/hooks/useFeeData */
export function useFeeData<selectData = GetFeeDataData>(
  parameters: UseFeeDataParameters<selectData> = {},
): UseFeeDataReturnType<selectData> {
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getFeeDataQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(parameters.enabled ?? true)

  return useQuery({
    ...queryOptions,
    ...parameters,
    enabled,
  })
}
