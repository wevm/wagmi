import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type SimulateContractErrorType,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type SimulateContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
> = UnionExactPartial<
  SimulateContractParameters<abi, functionName, args, config, chainId>
> &
  ScopeKeyParameter &
  QueryParameter<
    SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
    SimulateContractErrorType,
    selectData,
    SimulateContractQueryKey<abi, functionName, args, config, chainId>
  >

export function simulateContractQueryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  const args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
>(
  config: config,
  options: SimulateContractOptions<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  > = {} as any,
): SimulateContractQueryOptions<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
> {
  return {
    ...options.query,
    enabled: Boolean(
      options.abi &&
        options.address &&
        options.connector &&
        options.functionName &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      if (!options.abi) throw new Error('abi is required')
      if (!options.connector) throw new Error('connector is required')
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.functionName) throw new Error('functionName is required')
      return simulateContract(config, {
        ...(parameters as any),
        abi: options.abi,
        address: parameters.address,
        connector: options.connector,
        functionName: parameters.functionName,
      })
    },
    queryKey: simulateContractQueryKey(options as any),
  }
}

export type SimulateContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = SimulateContractReturnType<abi, functionName, args, config, chainId>

export type SimulateContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = SimulateContractQueryFnData<abi, functionName, args, config, chainId>

export function simulateContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  const args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  const config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  options: UnionExactPartial<
    SimulateContractParameters<abi, functionName, args, config, chainId>
  > &
    ScopeKeyParameter = {} as any,
) {
  const { connector: _, ...rest } = options
  return ['simulateContract', filterQueryOptions(rest)] as const
}

export type SimulateContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<
  typeof simulateContractQueryKey<abi, functionName, args, config, chainId>
>

export type SimulateContractQueryOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
> = QueryOptions<
  SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
  SimulateContractErrorType,
  selectData,
  SimulateContractQueryKey<abi, functionName, args, config, chainId>
>
