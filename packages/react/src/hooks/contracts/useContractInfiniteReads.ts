import { replaceEqualDeep } from '@tanstack/react-query'
import type { ReadContractsConfig, ReadContractsResult } from '@wagmi/core'
import { deepEqual, readContracts } from '@wagmi/core'
import type { Contract, ContractsConfig } from '@wagmi/core/internal'
import type { Abi } from 'abitype'
import * as React from 'react'

import type { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import type { UseInfiniteQueryResult } from '../utils'
import { useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<
  TContracts extends Contract[] = Contract[],
  TPageParam = unknown,
  TSelectData = ReadContractsResult<TContracts>,
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
} & InfiniteQueryConfig<ReadContractsResult<TContracts>, Error, TSelectData>

type QueryKeyArgs = {
  allowFailure: UseContractInfiniteReadsConfig['allowFailure']
  cacheKey: UseContractInfiniteReadsConfig['cacheKey']
  overrides: UseContractInfiniteReadsConfig['overrides']
}
type QueryKeyConfig = Pick<UseContractInfiniteReadsConfig, 'scopeKey'>

function queryKey({
  allowFailure,
  cacheKey,
  overrides,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'readContractsInfinite',
      allowFailure,
      cacheKey,
      overrides,
      scopeKey,
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
  TSelectData = ReadContractsResult<TContracts>,
>({
  allowFailure,
  cacheKey,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  getNextPageParam,
  isDataEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) =>
    deepEqual(oldData, newData)
      ? oldData
      : (replaceEqualDeep(oldData, newData) as any),
  suspense,
}: UseContractInfiniteReadsConfig<
  TContracts,
  TPageParam,
  TSelectData
>): // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
UseInfiniteQueryResult<TSelectData, Error> {
  const queryKey_ = React.useMemo(
    () => queryKey({ allowFailure, cacheKey, overrides, scopeKey }),
    [allowFailure, cacheKey, overrides, scopeKey],
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
    structuralSharing,
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
  TSelectData = ReadContractsResult<TContracts>,
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
  getNextPageParam: InfiniteQueryConfig<
    unknown[],
    Error,
    TSelectData
  >['getNextPageParam']
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
