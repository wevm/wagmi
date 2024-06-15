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
import type { UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = UnionPartial<ReadContractParameters<abi, functionName, args, config>> &
  ScopeKeyParameter

export function readContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
>(
  config: config,
  options: ReadContractOptions<abi, functionName, args, config> = {} as any,
) {
  return {
    // TODO: Support `signal` once Viem actions allow passthrough
    // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
    async queryFn({ queryKey }) {
      const abi = options.abi as Abi
      if (!abi) throw new Error('abi is required')
      const { address, functionName, scopeKey: _, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      if (!functionName) throw new Error('functionName is required')
      const args = parameters.args as readonly unknown[]
      return readContract(config, {
        abi,
        address,
        functionName,
        args,
        ...parameters,
      }) as Promise<ReadContractData<abi, functionName, args>>
    },
    queryKey: readContractQueryKey(options as any) as any,
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
>(options: ReadContractOptions<abi, functionName, args, config> = {} as any) {
  const { abi: _, ...rest } = options
  return ['readContract', filterQueryOptions(rest)] as const
}

export type ReadContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = ReturnType<typeof readContractQueryKey<config, abi, functionName, args>>
