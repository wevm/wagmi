import React from 'react'
import {
  ReadContractResult,
  ReadContractsConfig,
  readContracts,
} from '@wagmi/core'

import { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<TPageParam = any> =
  InfiniteQueryConfig<ReadContractResult, Error> &
    Omit<ReadContractsConfig, 'contracts'> & {
      cacheKey: string
      contracts: (pageParam: TPageParam) => ReadContractsConfig['contracts']
    }

export const paginatedIndexesConfig = (
  fn: (index: number) => ReadContractsConfig['contracts'][0],
  {
    perPage,
    start,
    direction,
  }: { perPage: number; start: number; direction: 'increment' | 'decrement' },
): Pick<
  UseContractInfiniteReadsConfig<number>,
  'contracts' | 'getNextPageParam'
> => {
  return {
    getNextPageParam: (lastPage, pages) =>
      lastPage?.length === perPage ? pages.length : undefined,
    contracts: (page = 0) =>
      [...Array(perPage).keys()]
        .map((index) => {
          return direction === 'increment'
            ? start + index + page * perPage
            : start - index - page * perPage
        })
        .filter((index) => index >= 0)
        .map(fn),
  }
}

export const queryKey = ([{ cacheKey, chainId, overrides }]: [
  {
    cacheKey: UseContractInfiniteReadsConfig['cacheKey']
    chainId: UseContractInfiniteReadsConfig['chainId']
    overrides: UseContractInfiniteReadsConfig['overrides']
  },
]) =>
  [
    {
      entity: 'readContractsInfinite',
      cacheKey,
      chainId,
      overrides,
    },
  ] as const

const queryFn =
  <TPageParam>({
    contracts,
  }: {
    contracts: UseContractInfiniteReadsConfig<TPageParam>['contracts']
  }) =>
  ({
    queryKey: [{ chainId, overrides }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey>) => {
    return readContracts({
      chainId,
      contracts: contracts(pageParam || undefined),
      overrides,
    })
  }

export function useContractInfiniteReads<TPageParam = any>({
  cacheKey,
  cacheTime,
  chainId: chainId_,
  contracts,
  enabled: enabled_ = true,
  getNextPageParam,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  staleTime,
  suspense,
}: UseContractInfiniteReadsConfig<TPageParam>) {
  const chainId = useChainId({ chainId: chainId_ })

  const queryKey_ = React.useMemo(
    () => queryKey([{ cacheKey, chainId, overrides }]),
    [],
  )

  const enabled = React.useMemo(() => {
    const enabled = Boolean(enabled_ && contracts)
    return enabled
  }, [enabled_])

  return useInfiniteQuery(queryKey_, queryFn({ contracts }), {
    cacheTime,
    enabled,
    keepPreviousData,
    getNextPageParam,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
