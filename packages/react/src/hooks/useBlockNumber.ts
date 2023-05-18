import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query'
import {
  type GetBlockNumberError,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type OmittedQueryOptions,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'
import * as React from 'react'

import type { OmittedUseQueryOptions } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBlockNumberParameters = Prettify<
  Omit<Options, OmittedQueryOptions | OmittedUseQueryOptions> &
    GetBlockNumberQueryKey & {
      watch?: boolean | undefined
    }
>
type Options = UseQueryOptions<GetBlockNumberQueryFnData, GetBlockNumberError>

export type UseBlockNumberReturnType = Prettify<
  UseQueryResult<GetBlockNumberQueryFnData, GetBlockNumberError>
>

export function useBlockNumber({
  chainId: chainId_,
  watch,
  ...rest
}: UseBlockNumberParameters = {}): UseBlockNumberReturnType {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBlockNumberQueryOptions(config, { ...rest, chainId })

  React.useEffect(() => {
    if (!watch) return

    try {
      const unwatch = watchBlockNumber(config, {
        chainId,
        onBlockNumber: (blockNumber) =>
          config.queryClient.setQueryData(queryOptions.queryKey, blockNumber),
      })
      return unwatch
    } catch {}
  }, [chainId, watch])

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery(queryOptions)
}
