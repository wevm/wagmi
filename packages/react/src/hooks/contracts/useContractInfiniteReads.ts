import {
  ReadContractsConfig,
  ReadContractsResult,
  deepEqual,
  readContracts,
} from '@wagmi/core'
import { ContractsConfig } from '@wagmi/core/internal'
import { Abi } from 'abitype'
import * as React from 'react'

import { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import { useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<
  TContracts extends unknown[] = unknown[],
  TPageParam = unknown,
> = Pick<ReadContractsConfig<TContracts>, 'overrides'> & {
  cacheKey: string
  contracts(pageParam: TPageParam): readonly [
    ...ContractsConfig<
      TContracts,
      {
        /** Chain id to use for provider */
        chainId?: number
      }
    >,
  ]
} & InfiniteQueryConfig<ReadContractsResult<TContracts>, Error>

function queryKey({
  cacheKey,
  overrides,
}: {
  cacheKey: UseContractInfiniteReadsConfig['cacheKey']
  overrides: UseContractInfiniteReadsConfig['overrides']
}) {
  return [
    {
      entity: 'readContractsInfinite',
      cacheKey,
      overrides,
    },
  ] as const
}

function queryFn<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    contractInterface: TAbi
    functionName: TFunctionName
  }[],
  TPageParam = unknown,
>({
  contracts,
}: {
  contracts: UseContractInfiniteReadsConfig<TContracts, TPageParam>['contracts']
}) {
  return ({
    queryKey: [{ overrides }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey>) => {
    return readContracts({
      contracts: contracts(pageParam || undefined),
      overrides,
    })
  }
}

export function useContractInfiniteReads<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    contractInterface: TAbi
    functionName: TFunctionName
  }[],
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
    () => queryKey({ cacheKey, overrides }),
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

export function paginatedIndexesConfig<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    contractInterface: TAbi
    functionName: TFunctionName
  }[],
>(
  fn: UseContractInfiniteReadsConfig<TContracts>['contracts'],
  {
    perPage,
    start,
    direction,
  }: { perPage: number; start: number; direction: 'increment' | 'decrement' },
) {
  const contracts = ((page = 0) =>
    [...Array(perPage).keys()]
      .map((index) => {
        return direction === 'increment'
          ? start + index + page * perPage
          : start - index - page * perPage
      })
      .filter((index) => index >= 0)
      .map(fn)
      .flat()) as unknown as typeof fn

  return {
    contracts,
    getNextPageParam(lastPage: unknown[], pages: unknown[]) {
      return lastPage?.length === perPage ? pages.length : undefined
    },
  }
}
