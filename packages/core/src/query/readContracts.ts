import type {
  ContractFunctionParameters,
  MulticallParameters as viem_MulticallParameters,
} from 'viem'
import {
  type ReadContractsErrorType,
  type ReadContractsReturnType,
  readContracts,
} from '../actions/readContracts.js'
import type { Config } from '../createConfig.js'
import type {
  ChainIdParameter,
  ScopeKeyParameter,
} from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractsOptions<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
  config extends Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = ExactPartial<
  viem_MulticallParameters<
    contracts,
    allowFailure,
    { optional: true; properties: ChainIdParameter<config> }
  >
> &
  ScopeKeyParameter &
  QueryParameter<
    ReadContractsQueryFnData<contracts, allowFailure>,
    ReadContractsErrorType,
    selectData,
    ReadContractsQueryKey<contracts, allowFailure, config>
  >

export function readContractsQueryOptions<
  config extends Config,
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  config: config,
  options: ReadContractsOptions<contracts, allowFailure, config, selectData> &
    ChainIdParameter<config> = {},
): ReadContractsQueryOptions<contracts, allowFailure, config, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const contracts: ContractFunctionParameters[] = []
      const length = context.queryKey[1].contracts.length
      for (let i = 0; i < length; i++) {
        const contract = context.queryKey[1].contracts[i]!
        const abi = (options.contracts?.[i] as ContractFunctionParameters).abi
        contracts.push({ ...contract, abi })
      }
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      return readContracts(config, {
        ...parameters,
        contracts,
      }) as Promise<ReadContractsReturnType<contracts, allowFailure>>
    },
    queryKey: readContractsQueryKey(options),
  }
}

export type ReadContractsQueryFnData<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = ReadContractsReturnType<contracts, allowFailure>

export type ReadContractsData<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = ReadContractsQueryFnData<contracts, allowFailure>

export function readContractsQueryKey<
  config extends Config,
  const contracts extends readonly unknown[],
  allowFailure extends boolean,
>(
  options: ExactPartial<
    viem_MulticallParameters<
      contracts,
      allowFailure,
      { optional: true; properties: ChainIdParameter<config> }
    >
  > &
    ScopeKeyParameter &
    ChainIdParameter<config> = {},
) {
  const contracts = []
  let hasContractWithoutChainId = false
  for (const contract of (options.contracts ??
    []) as (ContractFunctionParameters & { chainId: number })[]) {
    const { abi: _, ...rest } = contract
    if (rest.chainId === undefined) hasContractWithoutChainId = true
    const chainId = rest.chainId ?? options.chainId
    contracts.push({ ...rest, ...(chainId ? { chainId } : {}) })
  }
  const { chainId: _, ...rest } = options
  return [
    'readContracts',
    filterQueryOptions({
      ...rest,
      ...(hasContractWithoutChainId && options.chainId
        ? { chainId: options.chainId }
        : {}),
      contracts,
    }),
  ] as const
}

export type ReadContractsQueryKey<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
  config extends Config,
> = ReturnType<typeof readContractsQueryKey<config, contracts, allowFailure>>

export type ReadContractsQueryOptions<
  contracts extends readonly unknown[],
  allowFailure extends boolean,
  config extends Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = QueryOptions<
  ReadContractsQueryFnData<contracts, allowFailure>,
  ReadContractsErrorType,
  selectData,
  ReadContractsQueryKey<contracts, allowFailure, config>
>
