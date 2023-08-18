import { type QueryOptions } from '@tanstack/query-core'
import {
  type MulticallContract,
  type MulticallParameters as viem_MulticallParameters,
} from 'viem'

import {
  type ReadContractsError,
  type ReadContractsParameters,
  type ReadContractsReturnType,
  readContracts,
} from '../actions/readContracts.js'
import type { Config } from '../config.js'
import type { ExactPartial } from '../internal.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractsOptions<
  config extends Config,
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = ExactPartial<
  viem_MulticallParameters<
    contracts,
    allowFailure,
    { optional: true; properties: ChainIdParameter<config> }
  >
> &
  ScopeKeyParameter

export function readContractsQueryOptions<
  config extends Config,
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
>(
  config: Config,
  options: ReadContractsOptions<config, contracts, allowFailure> &
    ChainIdParameter<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const contracts: MulticallContract[] = []
      const length = queryKey[1].contracts.length
      for (let i = 0; i < length; i++) {
        const contract = queryKey[1].contracts[i]!
        const abi = (options.contracts?.[i] as MulticallContract).abi
        contracts.push({ ...contract, abi })
      }
      const { scopeKey: _, ...parameters } = queryKey[1]
      return (await readContracts(config, {
        ...parameters,
        contracts,
      } as ReadContractsParameters)) as ReadContractsData<
        contracts,
        allowFailure
      >
    },
    queryKey: readContractsQueryKey(options as any),
  } as const satisfies QueryOptions<
    ReadContractsQueryFnData<contracts, allowFailure>,
    ReadContractsError,
    ReadContractsData<contracts, allowFailure>,
    ReadContractsQueryKey<config, contracts, allowFailure>
  >
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
  options: ReadContractsOptions<config, contracts, allowFailure> &
    ChainIdParameter<config> = {},
) {
  const contracts = []
  for (const contract of (options.contracts ?? []) as MulticallContract[]) {
    const { abi: _, ...rest } = contract
    contracts.push({ ...rest, chainId: options.chainId })
  }
  return [
    'readContracts',
    filterQueryOptions({ ...options, contracts }),
  ] as const
}

export type ReadContractsQueryKey<
  config extends Config,
  contracts extends readonly unknown[],
  allowFailure extends boolean,
> = ReturnType<typeof readContractsQueryKey<config, contracts, allowFailure>>
