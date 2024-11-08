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
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = UnionExactPartial<ReadContractParameters<abi, functionName, args, config>> &
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

      const { functionName, scopeKey: _, ...parameters } = queryKey[1]
      const addressOrCodeParams = (() => {
        const params = queryKey[1] as unknown as ReadContractParameters
        if (params.address) return { address: params.address }
        if (params.code) return { code: params.code }
        throw new Error('address or code is required')
      })()

      if (!functionName) throw new Error('functionName is required')

      return readContract(config, {
        abi,
        functionName,
        args: parameters.args as readonly unknown[],
        ...addressOrCodeParams,
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
