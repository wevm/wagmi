import type { ContractFunctionParameters } from 'viem'
import {
  type ReadContractsError,
  type ReadContractsParameters,
  type ReadContractsReturnType,
  readContracts,
} from '../actions/readContracts.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Omit } from '../types/utils.js'
import type { InfiniteQueryOptions, ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type InfiniteReadContractsOptions<
  config extends Config,
  contracts extends readonly unknown[],
  allowFailure extends boolean,
  pageParam,
> = {
  cacheKey: string
  contracts(
    pageParam: pageParam,
  ): ReadContractsParameters<contracts, allowFailure, config>['contracts']
} & Omit<
  ReadContractsParameters<contracts, allowFailure, config>,
  'contracts'
> &
  ScopeKeyParameter

export function infiniteReadContractsQueryOptions<
  config extends Config,
  const contracts extends readonly ContractFunctionParameters[],
  pageParam,
  allowFailure extends boolean = true,
>(
  config: Config,
  options: InfiniteReadContractsOptions<
    config,
    contracts,
    allowFailure,
    pageParam
  > &
    ChainIdParameter<config> & {
      initialPageParam: pageParam
      getNextPageParam(
        lastPage: InfiniteReadContractsQueryFnData<contracts, allowFailure>,
        allPages: InfiniteReadContractsQueryFnData<contracts, allowFailure>[],
        lastPageParam: pageParam,
        allPageParams: pageParam[],
      ): pageParam | undefined | null
    },
) {
  return {
    getNextPageParam: options.getNextPageParam,
    initialPageParam: options.initialPageParam,
    async queryFn({ pageParam, queryKey }) {
      const { contracts } = options
      const { cacheKey: _, scopeKey: _s, ...parameters } = queryKey[1]
      return (await readContracts(config, {
        ...parameters,
        contracts: contracts(
          pageParam,
        ) as readonly ContractFunctionParameters[],
      })) as ReadContractsReturnType<contracts, allowFailure>
    },
    queryKey: infiniteReadContractsQueryKey(options),
  } as const satisfies InfiniteQueryOptions<
    InfiniteReadContractsQueryFnData<contracts, allowFailure>,
    ReadContractsError,
    InfiniteReadContractsData<contracts, allowFailure>,
    InfiniteReadContractsData<contracts, allowFailure>,
    InfiniteReadContractsQueryKey<config, contracts, allowFailure, pageParam>,
    pageParam
  >
}

export type InfiniteReadContractsQueryFnData<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = ReadContractsReturnType<contracts, allowFailure>

export type InfiniteReadContractsData<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = InfiniteReadContractsQueryFnData<contracts, allowFailure>

export function infiniteReadContractsQueryKey<
  config extends Config,
  const contracts extends readonly unknown[],
  allowFailure extends boolean,
  pageParam,
>(
  options: InfiniteReadContractsOptions<
    config,
    contracts,
    allowFailure,
    pageParam
  > &
    ChainIdParameter<config>,
) {
  const { contracts: _, ...parameters } = options
  return ['infiniteReadContracts', filterQueryOptions(parameters)] as const
}

export type InfiniteReadContractsQueryKey<
  config extends Config,
  contracts extends readonly unknown[],
  allowFailure extends boolean,
  pageParam,
> = ReturnType<
  typeof infiniteReadContractsQueryKey<
    config,
    contracts,
    allowFailure,
    pageParam
  >
>
