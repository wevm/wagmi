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
import * as React from 'react'

import type { UseQueryParameters, UseQueryResult } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useQuery } from './useQuery.js'
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

  const defaultChainId = useChainId()
  const chainId = parameters.chainId ?? defaultChainId
  const queryOptions = getBalanceQueryOptions(config, {
    address,
    chainId,
    token,
    unit,
  })
  const enabled = Boolean(address && (parameters.enabled ?? true))

  React.useEffect(() => {
    if (!enabled) return
    if (!address) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber() {
        config.queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        })
      },
      syncConnectedChain: false,
    })
  }, [address, chainId, config, enabled, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
