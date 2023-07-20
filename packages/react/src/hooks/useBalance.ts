import { useQueryClient } from '@tanstack/react-query'
import {
  type GetBalanceError,
  type ResolvedRegister,
  watchBlockNumber,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
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
    > & {
      watch?: boolean | undefined
    }
>

export type UseBalanceReturnType<selectData = GetBalanceData> = UseQueryResult<
  selectData,
  GetBalanceError
>

/** https://wagmi.sh/react/hooks/useBalance */
export function useBalance<selectData = GetBalanceData>(
  parameters: UseBalanceParameters<selectData> = {},
): UseBalanceReturnType<selectData> {
  const { address, token, unit, watch, ...query } = parameters
  const config = useConfig()
  const queryClient = useQueryClient()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getBalanceQueryOptions(config, {
    address,
    chainId,
    token,
    unit,
  })
  const enabled = Boolean(address && (parameters.enabled ?? true))

  useEffect(() => {
    if (!enabled) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber() {
        queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        })
      },
      syncConnectedChain: false,
    })
  }, [chainId, config, enabled, queryClient, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
