import {
  ReadContractsConfig,
  ReadContractsResult,
  deepEqual,
  readContracts,
} from '@wagmi/core'
import * as React from 'react'

import { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import { useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<
  TContracts extends unknown[],
  TPageParam = any,
> = InfiniteQueryConfig<ReadContractsResult<TContracts>, Error> &
  Omit<ReadContractsConfig<TContracts>, 'contracts'> & {
    cacheKey: string
    contracts(pageParam: TPageParam):
      | ReadContractsConfig<TContracts>['contracts']
      // TODO: Remove fallback for better type inference of `args`
      | ReadContractsConfig<unknown[]>['contracts']
  }

export function paginatedIndexesConfig<TContracts extends unknown[]>(
  fn: (index: number) => ReadContractsConfig<TContracts>['contracts'][0],
  {
    perPage,
    start,
    direction,
  }: { perPage: number; start: number; direction: 'increment' | 'decrement' },
): Pick<
  UseContractInfiniteReadsConfig<TContracts, number>,
  'contracts' | 'getNextPageParam'
> {
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

function queryKey<TContracts extends unknown[]>({
  cacheKey,
  overrides,
}: {
  cacheKey: UseContractInfiniteReadsConfig<TContracts>['cacheKey']
  overrides: UseContractInfiniteReadsConfig<TContracts>['overrides']
}) {
  return [
    {
      entity: 'readContractsInfinite',
      cacheKey,
      overrides,
    },
  ] as const
}

function queryFn<TContracts extends unknown[], TPageParam>({
  contracts,
}: {
  contracts: UseContractInfiniteReadsConfig<TContracts, TPageParam>['contracts']
}) {
  return ({
    queryKey: [{ overrides }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey<TContracts>>) => {
    return readContracts({
      contracts: contracts(
        pageParam || undefined,
      ) as unknown as ReadContractsConfig<TContracts>['contracts'],
      overrides,
    })
  }
}

export function useContractInfiniteReads<
  TContracts extends unknown[],
  TPageParam = any,
>({
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
}: UseContractInfiniteReadsConfig<TContracts, TPageParam>) {
  const queryKey_ = React.useMemo(
    () => queryKey<TContracts>({ cacheKey, overrides }),
    [cacheKey, overrides],
  )

  const enabled = React.useMemo(() => {
    const enabled = Boolean(enabled_ && contracts)
    return enabled
  }, [contracts, enabled_])

  return useInfiniteQuery(
    queryKey_,
    queryFn<TContracts, TPageParam>({ contracts }),
    {
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
    },
  )
}
