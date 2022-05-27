import React from 'react'
import {
  ReadContractResult,
  ReadContractsArgs,
  ReadContractsConfig,
  readContracts,
} from '@wagmi/core'

import { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useInfiniteQuery } from '../utils'

export type UseInfiniteContractReadsArgs = ReadContractsArgs
export type UseInfiniteContractReadsConfig = InfiniteQueryConfig<
  ReadContractResult,
  Error
> &
  ReadContractsConfig & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
  }

export const queryKey = ([readContractsArgs, { chainId, overrides }]: [
  ReadContractsArgs,
  ReadContractsConfig,
]) =>
  [
    {
      entity: 'readContractsInfinite',
      readContractsArgs,
      chainId,
      overrides,
    },
  ] as const

const queryFn = ({
  queryKey: [{ readContractsArgs, chainId, overrides }],
  pageParam = readContractsArgs,
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContracts(pageParam, {
    chainId,
    overrides,
  })
}

export function useInfiniteContractReads(
  readContractsArgs: UseInfiniteContractReadsArgs,
  {
    cacheTime,
    chainId: chainId_,
    enabled: enabled_ = true,
    getPreviousPageParam,
    getNextPageParam,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    overrides,
    staleTime,
    suspense,
  }: UseInfiniteContractReadsConfig = {},
) {
  const chainId = useChainId({ chainId: chainId_ })

  const queryKey_ = React.useMemo(
    () => queryKey([readContractsArgs, { chainId, overrides }]),
    [],
  )

  const enabled = React.useMemo(() => {
    const enabled = Boolean(enabled_ && readContractsArgs.length > 0)
    return enabled
  }, [enabled_])

  return useInfiniteQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    keepPreviousData,
    getPreviousPageParam,
    getNextPageParam,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
