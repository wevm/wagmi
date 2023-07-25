import { type QueryOptions } from '@tanstack/query-core'
import { type ContractFunctionConfig } from 'viem'

import {
  type ReadContractsError,
  type ReadContractsParameters,
  type ReadContractsReturnType,
  readContracts,
} from '../actions/readContracts.js'
import type { Config } from '../config.js'
import type { DeepPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractsOptions<
  config extends Config,
  contracts extends ContractFunctionConfig[],
  allowFailure extends boolean,
> = DeepPartial<ReadContractsParameters<config, contracts, allowFailure>, 3> &
  ScopeKeyParameter

export function readContractsQueryOptions<
  config extends Config,
  const contracts extends ContractFunctionConfig[],
  allowFailure extends boolean = true,
>(
  config: Config,
  options: ReadContractsOptions<config, contracts, allowFailure> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const contracts: ContractFunctionConfig[] = []
      const length = queryKey[1].contracts.length
      for (let i = 0; i < length; i++) {
        const contract = queryKey[1].contracts[i]!
        const abi = (options.contracts?.[i] as ContractFunctionConfig).abi
        contracts.push({ ...contract, abi })
      }
      return (await readContracts(config, {
        ...queryKey[1],
        contracts,
      } as ReadContractsParameters)) as ReadContractsData<
        contracts,
        allowFailure
      >
    },
    queryKey: readContractsQueryKey(options),
  } as const satisfies QueryOptions<
    ReadContractsQueryFnData<contracts, allowFailure>,
    ReadContractsError,
    ReadContractsData<contracts, allowFailure>,
    ReadContractsQueryKey<config, contracts, allowFailure>
  >
}

export type ReadContractsQueryFnData<
  contracts extends ContractFunctionConfig[],
  allowFailure extends boolean,
> = ReadContractsReturnType<contracts, allowFailure>

export type ReadContractsData<
  contracts extends ContractFunctionConfig[],
  allowFailure extends boolean,
> = ReadContractsQueryFnData<contracts, allowFailure>

export function readContractsQueryKey<
  config extends Config,
  const contracts extends ContractFunctionConfig[],
  allowFailure extends boolean,
>(options: ReadContractsOptions<config, contracts, allowFailure> = {} as any) {
  const contracts = []
  for (const contract of (options.contracts ??
    []) as ContractFunctionConfig[]) {
    const { abi: _, ...rest } = contract as ContractFunctionConfig
    contracts.push(rest)
  }
  return [
    'readContracts',
    filterQueryOptions({ ...options, contracts }),
  ] as const
}

export type ReadContractsQueryKey<
  config extends Config,
  contracts extends ContractFunctionConfig[],
  allowFailure extends boolean,
> = ReturnType<typeof readContractsQueryKey<config, contracts, allowFailure>>
