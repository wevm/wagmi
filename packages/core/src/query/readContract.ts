import type { QueryOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type ReadContractErrorType,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../actions/readContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = t.UnionExactPartial<
  ReadContractParameters<abi, functionName, args, config>
> &
  ScopeKeyParameter

export function readContractQueryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
>(
  config: config,
  options: ReadContractOptions<abi, functionName, args, config> = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      if (!parameters.address && !parameters.code)
        throw new Error('address or code is required')
      if (!parameters.functionName) throw new Error('functionName is required')
      const result = await readContract(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: readContractQueryKey(options as never),
  } as const satisfies QueryOptions<
    ReadContractQueryFnData<abi, functionName, args>,
    ReadContractErrorType,
    ReadContractData<abi, functionName, args>,
    ReadContractQueryKey<abi, functionName, args, config>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = t.Compute<ReadContractReturnType<abi, functionName, args>>

export type ReadContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = ReadContractQueryFnData<abi, functionName, args>

export function readContractQueryKey<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
>(options: ReadContractOptions<abi, functionName, args, config> = {} as never) {
  return ['readContract', filterQueryOptions(options)] as const
}

export type ReadContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = ReturnType<typeof readContractQueryKey<abi, functionName, args, config>>
