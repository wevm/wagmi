import { replaceEqualDeep } from '@tanstack/react-query'
import type { ReadContractsConfig, ReadContractsResult } from '@wagmi/core'
import { deepEqual, readContracts } from '@wagmi/core'
import type { Narrow } from 'abitype'
import * as React from 'react'
import type { ContractFunctionConfig, MulticallContracts } from 'viem'

import type { InfiniteQueryConfig, QueryFunctionArgs } from '../../types'
import type { UseInfiniteQueryResult } from '../utils'
import { useInfiniteQuery } from '../utils'

export type UseContractInfiniteReadsConfig<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
  TPageParam = unknown,
  TSelectData = ReadContractsResult<TContracts, TAllowFailure>,
> = Pick<ReadContractsConfig<TContracts, TAllowFailure>, 'allowFailure'> & {
  cacheKey: string
  contracts(pageParam: TPageParam): /** Contracts to query */
  Narrow<
    readonly [
      ...MulticallContracts<
        TContracts,
        {
          /** Chain id to use for Public Client. */
          chainId?: number
        }
      >,
    ]
  >
} & InfiniteQueryConfig<
    ReadContractsResult<TContracts, TAllowFailure>,
    Error,
    TSelectData
  > &
  (
    | {
        /** Block number to read against. */
        blockNumber?: ReadContractsConfig<TContracts>['blockNumber']
        blockTag?: never
        watch?: never
      }
    | {
        blockNumber?: never
        /** Block tag to read against. */
        blockTag?: ReadContractsConfig<TContracts>['blockTag']
        watch?: never
      }
    | {
        blockNumber?: never
        blockTag?: never
        /** Refresh on incoming blocks. */
        watch?: boolean
      }
  )

type QueryKeyArgs<TAllowFailure extends boolean = true> = {
  allowFailure: UseContractInfiniteReadsConfig<
    ContractFunctionConfig[],
    TAllowFailure
  >['allowFailure']
  cacheKey: UseContractInfiniteReadsConfig['cacheKey']
  blockNumber: UseContractInfiniteReadsConfig['blockNumber']
  blockTag: UseContractInfiniteReadsConfig['blockTag']
}
type QueryKeyConfig = Pick<UseContractInfiniteReadsConfig, 'scopeKey'>

function queryKey<TAllowFailure extends boolean = true>({
  allowFailure,
  blockNumber,
  blockTag,
  cacheKey,
  scopeKey,
}: QueryKeyArgs<TAllowFailure> & QueryKeyConfig) {
  return [
    {
      entity: 'readContractsInfinite',
      allowFailure,
      blockNumber,
      blockTag,
      cacheKey,
      scopeKey,
    },
  ] as const
}

function queryFn<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
  TPageParam = unknown,
>({
  contracts,
}: {
  contracts: UseContractInfiniteReadsConfig<
    TContracts,
    TAllowFailure,
    TPageParam
  >['contracts']
}) {
  return ({
    queryKey: [{ allowFailure, blockNumber, blockTag }],
    pageParam,
  }: QueryFunctionArgs<typeof queryKey>) => {
    return readContracts({
      allowFailure,
      blockNumber,
      blockTag,
      contracts: contracts(pageParam || undefined),
    })
  }
}

export function useContractInfiniteReads<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
  TPageParam = any,
  TSelectData = ReadContractsResult<TContracts, TAllowFailure>,
>({
  allowFailure,
  blockNumber,
  blockTag,
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
  TAllowFailure,
  TPageParam,
  TSelectData
>): // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
UseInfiniteQueryResult<TSelectData, Error> {
  const queryKey_ = React.useMemo(
    () => queryKey({ allowFailure, blockNumber, blockTag, cacheKey, scopeKey }),
    [allowFailure, blockNumber, blockTag, cacheKey, scopeKey],
  )

  const enabled = React.useMemo(() => {
    const enabled = Boolean(enabled_ && contracts)
    return enabled
  }, [contracts, enabled_])

  return useInfiniteQuery(queryKey_, queryFn({ contracts }) as any, {
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
  TContracts extends ContractFunctionConfig[],
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
