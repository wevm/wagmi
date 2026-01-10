import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type ReadContractErrorType,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../actions/readContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions, structuralSharing } from './utils.js'

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
  selectData = ReadContractData<abi, functionName, args>,
> = UnionExactPartial<ReadContractParameters<abi, functionName, args, config>> &
  ScopeKeyParameter &
  QueryParameter<
    ReadContractQueryFnData<abi, functionName, args>,
    ReadContractErrorType,
    selectData,
    ReadContractQueryKey<abi, functionName, args, config>
  >

export function readContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  selectData = ReadContractData<abi, functionName, args>,
>(
  config: config,
  options: ReadContractOptions<abi, functionName, args, config> = {} as any,
): ReadContractQueryOptions<abi, functionName, args, config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      Boolean(options.address || ('code' in options && options.code)) &&
        options.abi &&
        options.functionName &&
        (options.query?.enabled ?? true),
    ),
    // TODO: Support `signal` once Viem actions allow passthrough
    // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
    queryFn: async (context) => {
      if (!options.abi) throw new Error('abi is required')
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.functionName) throw new Error('functionName is required')
      const result = await readContract(config, {
        ...(parameters as any),
        abi: options.abi,
        address: parameters.address,
        code:
          'code' in parameters && parameters.code ? parameters.code : undefined,
        functionName: parameters.functionName,
      })
      return result as ReadContractData<abi, functionName, args>
    },
    queryKey: readContractQueryKey(options as any) as any,
    structuralSharing,
  } as ReadContractQueryOptions<abi, functionName, args, config, selectData>
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
>(
  options: UnionExactPartial<
    ReadContractParameters<abi, functionName, args, config>
  > &
    ScopeKeyParameter = {} as any,
) {
  return ['readContract', filterQueryOptions(options)] as const
}

export type ReadContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
> = ReturnType<typeof readContractQueryKey<config, abi, functionName, args>>

export type ReadContractQueryOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config,
  selectData = ReadContractData<abi, functionName, args>,
> = QueryOptions<
  ReadContractQueryFnData<abi, functionName, args>,
  ReadContractErrorType,
  selectData,
  ReadContractQueryKey<abi, functionName, args, config>
>
