import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query'
import {
  type GetBalanceError,
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type OmittedQueryOptions,
  getBalanceQueryOptions,
  watchBalance,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { OmittedUseQueryOptions } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters = Prettify<
  Omit<Options, OmittedQueryOptions | OmittedUseQueryOptions> &
    GetBalanceQueryKey & { watch?: boolean | undefined }
>
type Options = UseQueryOptions<GetBalanceQueryFnData, GetBalanceError>

export type UseBalanceReturnType = Prettify<
  UseQueryResult<GetBalanceQueryFnData, GetBalanceError>
>

export function useBalance({
  address,
  chainId: chainId_,
  token,
  unit,
  watch,
  ...rest
}: UseBalanceParameters): UseBalanceReturnType {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBalanceQueryOptions(config, {
    ...rest,
    address,
    chainId,
    token,
    unit,
  })

  useEffect(() => {
    if (!address) return
    if (!watch) return
    if (!queryOptions) return

    return watchBalance(config, {
      address,
      chainId,
      onBalance: (balance) =>
        config.queryClient.setQueryData(queryOptions.queryKey, balance),
      syncConnectedChain: false,
    })
  }, [address, chainId, config, queryOptions, watch])

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery({ ...queryOptions, enabled: Boolean(queryOptions) })
}
