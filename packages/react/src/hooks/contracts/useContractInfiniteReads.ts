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
import { UseInfiniteQueryResult, useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<
  TContracts extends unknown[] = unknown[],
  TPageParam = unknown,
> = Pick<ReadContractsConfig<TContracts>, 'allowFailure' | 'overrides'> & {
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
  allowFailure,
  cacheKey,
  overrides,
}: {
  allowFailure: UseContractInfiniteReadsConfig['allowFailure']
  cacheKey: UseContractInfiniteReadsConfig['cacheKey']
  overrides: UseContractInfiniteReadsConfig['overrides']
}) {
  return [
    {
      entity: 'readContractsInfinite',
      allowFailure,
      cacheKey,
      overrides,
    },
  ] as const
}

function queryFn<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
  TPageParam = unknown,
>({
  contracts,
}: {
  contracts: UseContractInfiniteReadsConfig<TContracts, TPageParam>['contracts']
}) {
  return ({
    queryKey: [{ allowFailure, overrides }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey>) => {
    return readContracts({
      allowFailure,
      contracts: contracts(pageParam || undefined),
      overrides,
    })
  }
}

export function useContractInfiniteReads<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
  TPageParam = any,
>({
  allowFailure,
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
}: UseContractInfiniteReadsConfig<
  TContracts,
  TPageParam
>): // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
UseInfiniteQueryResult<ReadContractsResult<TContracts>, Error> {
  const queryKey_ = React.useMemo(
    () => queryKey({ allowFailure, cacheKey, overrides }),
    [allowFailure, cacheKey, overrides],
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

// TODO: Fix return type inference for `useContractInfiniteReads` when using `paginatedIndexesConfig`
export function paginatedIndexesConfig<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
>(
  fn: UseContractInfiniteReadsConfig<TContracts>['contracts'],
  {
    perPage,
    start,
    direction,
  }: { perPage: number; start: number; direction: 'increment' | 'decrement' },
): // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
{
  contracts: UseContractInfiniteReadsConfig<TContracts>['contracts']
  getNextPageParam: InfiniteQueryConfig<unknown[], Error>['getNextPageParam']
} {
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
