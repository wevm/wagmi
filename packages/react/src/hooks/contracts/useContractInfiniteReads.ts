import * as React from 'react'
import {
  ReadContractResult,
  ReadContractsConfig,
  deepEqual,
  readContracts,
} from '@wagmi/core'

import { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import { useInfiniteQuery } from '../utils'

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

export const queryKey = ([{ cacheKey, overrides }]: [
  {
    cacheKey: UseContractInfiniteReadsConfig['cacheKey']
    overrides: UseContractInfiniteReadsConfig['overrides']
  },
]) =>
  [
    {
      entity: 'readContractsInfinite',
      cacheKey,
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
    queryKey: [{ overrides }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey>) => {
    return readContracts({
      contracts: contracts(pageParam || undefined),
      overrides,
    })
  }

export function useContractInfiniteReads<TPageParam = any>({
  cacheKey,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  getNextPageParam,
  isDataEqual = deepEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  select,
  staleTime,
  suspense,
}: UseContractInfiniteReadsConfig<TPageParam>) {
  const queryKey_ = React.useMemo(
    () => queryKey([{ cacheKey, overrides }]),
    [cacheKey, overrides],
  )

  const enabled = React.useMemo(() => {
    const enabled = Boolean(enabled_ && contracts)
    return enabled
  }, [contracts, enabled_])

  return useInfiniteQuery(queryKey_, queryFn({ contracts }), {
    cacheTime,
    enabled,
    getNextPageParam,
    isDataEqual,
    keepPreviousData,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
