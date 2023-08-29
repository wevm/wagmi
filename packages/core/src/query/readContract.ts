import { type QueryOptions } from '@tanstack/query-core'
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'

import {
  type ReadContractError,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../actions/readContract.js'
import type { Config } from '../createConfig.js'
import type { UnionPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractOptions<
  config extends Config,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = UnionPartial<ReadContractParameters<config, abi, functionName, args>> &
  ScopeKeyParameter

export function readContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
>(
  config: Config,
  options: ReadContractOptions<config, abi, functionName, args> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const abi = options.abi as Abi
      if (!abi) throw new Error('abi is required')
      const { address, functionName, scopeKey: _, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      if (!functionName) throw new Error('functionName is required')
      const args = parameters.args as readonly unknown[]
      return (await readContract(config, {
        abi,
        address,
        functionName,
        args,
        ...parameters,
      })) as ReadContractData<abi, functionName, args>
    },
    queryKey: readContractQueryKey(options),
  } as const satisfies QueryOptions<
    ReadContractQueryFnData<abi, functionName, args>,
    ReadContractError,
    ReadContractData<abi, functionName, args>,
    ReadContractQueryKey<config, abi, functionName, args>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = ReadContractReturnType<abi, functionName, args>

export type ReadContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = ReadContractQueryFnData<abi, functionName, args>

export function readContractQueryKey<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
>(options: ReadContractOptions<config, abi, functionName, args> = {} as any) {
  const { abi: _, ...rest } = options
  return ['readContract', filterQueryOptions(rest)] as const
}

export type ReadContractQueryKey<
  config extends Config,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
> = ReturnType<typeof readContractQueryKey<config, abi, functionName, args>>
