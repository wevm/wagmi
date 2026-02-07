import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { ConfigParameter, Omit } from '@wagmi/core/internal'
import {
  type InfiniteReadContractsData,
  type InfiniteReadContractsOptions,
  type InfiniteReadContractsQueryFnData,
  type InfiniteReadContractsQueryKey,
  infiniteReadContractsQueryOptions,
  structuralSharing,
} from '@wagmi/core/query'
import type { DefaultError, QueryKey } from '@tanstack/solid-query'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'
import type { ContractFunctionParameters } from 'viem'
import {
  type SolidInfiniteQueryParameters,
  type UseInfiniteQueryReturnType,
  useInfiniteQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = {
  query: Omit<
    SolidInfiniteQueryParameters<
      queryFnData,
      error,
      data,
      queryData,
      queryKey,
      pageParam
    >,
    'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
  >
}

/** https://wagmi.sh/solid/api/primitives/useInfiniteReadContracts */
export function useInfiniteReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister['config'],
  pageParam = unknown,
  selectData = InfiniteReadContractsData<contracts, allowFailure>,
>(
  parameters: useInfiniteReadContracts.Parameters<
    contracts,
    allowFailure,
    config,
    pageParam,
    selectData
  >,
): useInfiniteReadContracts.ReturnType<contracts, allowFailure, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))

  const options = createMemo(() => {
    const { contracts = [], query } = parameters()
    return {
      ...infiniteReadContractsQueryOptions(config(), {
        ...parameters(),
        chainId: chainId(),
        contracts:
          contracts as useInfiniteReadContracts.SolidParameters['contracts'],
        query:
          query as unknown as SolidInfiniteQueryParameters,
      }),
      ...(query as any),
      structuralSharing:
        (query as any).structuralSharing ?? structuralSharing,
    }
  })

  return useInfiniteQuery(options as any) as any
}

export namespace useInfiniteReadContracts {
  export type Parameters<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    config extends Config = Config,
    pageParam = unknown,
    selectData = InfiniteReadContractsData<contracts, allowFailure>,
  > = Accessor<
    SolidParameters<contracts, allowFailure, config, pageParam, selectData>
  >

  export type ReturnType<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    selectData = InfiniteReadContractsData<contracts, allowFailure>,
  > = UseInfiniteQueryReturnType<selectData, ReadContractsErrorType>

  export type SolidParameters<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    config extends Config = Config,
    pageParam = unknown,
    selectData = InfiniteReadContractsData<contracts, allowFailure>,
  > = InfiniteReadContractsOptions<
    contracts,
    allowFailure,
    pageParam,
    config
  > &
    ConfigParameter<config> &
    InfiniteQueryParameter<
      InfiniteReadContractsQueryFnData<contracts, allowFailure>,
      ReadContractsErrorType,
      selectData,
      InfiniteReadContractsData<contracts, allowFailure>,
      InfiniteReadContractsQueryKey<
        contracts,
        allowFailure,
        pageParam,
        config
      >,
      pageParam
    >
}
