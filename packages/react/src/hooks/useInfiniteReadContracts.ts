'use client'

import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type InfiniteReadContractsQueryFnData,
  type InfiniteReadContractsQueryKey,
  infiniteReadContractsQueryOptions,
  structuralSharing,
} from '@wagmi/core/query'
import type { ContractFunctionParameters } from 'viem'

import type {
  InfiniteReadContractsData,
  InfiniteReadContractsOptions,
} from '../exports/query.js'
import type {
  ConfigParameter,
  InfiniteQueryParameter,
} from '../types/properties.js'
import {
  type UseInfiniteQueryParameters,
  type UseInfiniteQueryReturnType,
  useInfiniteQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseInfiniteContractReadsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  pageParam = unknown,
  selectData = InfiniteReadContractsData<contracts, allowFailure>,
> = InfiniteReadContractsOptions<contracts, allowFailure, pageParam, config> &
  ConfigParameter<config> &
  InfiniteQueryParameter<
    InfiniteReadContractsQueryFnData<contracts, allowFailure>,
    ReadContractsErrorType,
    selectData,
    InfiniteReadContractsData<contracts, allowFailure>,
    InfiniteReadContractsQueryKey<contracts, allowFailure, pageParam, config>,
    pageParam
  >

export type UseInfiniteContractReadsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  selectData = InfiniteReadContractsData<contracts, allowFailure>,
> = UseInfiniteQueryReturnType<selectData, ReadContractsErrorType>

/** https://wagmi.sh/react/api/hooks/useInfiniteReadContracts */
export function useInfiniteReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister['config'],
  pageParam = unknown,
  selectData = InfiniteReadContractsData<contracts, allowFailure>,
>(
  parameters: UseInfiniteContractReadsParameters<
    contracts,
    allowFailure,
    config,
    pageParam,
    selectData
  >,
): UseInfiniteContractReadsReturnType<contracts, allowFailure, selectData> {
  const { contracts = [], query } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = infiniteReadContractsQueryOptions(config, {
    ...parameters,
    chainId,
    contracts: contracts as UseInfiniteContractReadsParameters['contracts'],
    query: query as UseInfiniteQueryParameters,
  })

  return useInfiniteQuery({
    ...(query as any),
    ...options,
    initialPageParam: options.initialPageParam,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
