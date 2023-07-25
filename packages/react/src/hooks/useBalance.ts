import { type GetBalanceError, type ResolvedRegister } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'

export type UseBalanceParameters<selectData = GetBalanceData> = Evaluate<
  GetBalanceOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetBalanceQueryFnData,
      GetBalanceError,
      selectData,
      GetBalanceQueryKey<ResolvedRegister['config']>
    >
>

export type UseBalanceReturnType<selectData = GetBalanceData> = UseQueryResult<
  selectData,
  GetBalanceError
>

/** https://wagmi.sh/react/hooks/useBalance */
export function useBalance<selectData = GetBalanceData>(
  parameters: UseBalanceParameters<selectData> = {},
): UseBalanceReturnType<selectData> {
  const { address, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getBalanceQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(address && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
