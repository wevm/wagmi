import type { QueryObserverOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type SimulateContractErrorType,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
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
> = UnionExactPartial<
  SimulateContractParameters<abi, functionName, args, config, chainId>
> &
  ScopeKeyParameter

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
>(
  config: config,
  options: SimulateContractOptions<
    abi,
    functionName,
    args,
    config,
    chainId
  > = {} as any,
) {
  return {
    enabled: Boolean(
      options.abi &&
        options.address &&
        options.connector &&
        options.functionName,
    ),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!options.abi) throw new Error('abi is required')
      if (!parameters.address) throw new Error('address is required')
      if (!options.connector) throw new Error('connector is required')
      if (!parameters.functionName) throw new Error('functionName is required')
      const result = await simulateContract(config, {
        ...(parameters as any),
        abi: options.abi,
        address: parameters.address,
        connector: options.connector,
        functionName: parameters.functionName,
      })
      return result as unknown as SimulateContractData<
        abi,
        functionName,
        args,
        config,
        chainId
      >
    },
    queryKey: simulateContractQueryKey(options),
  } as const satisfies QueryObserverOptions<
    SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
    SimulateContractErrorType,
    SimulateContractData<abi, functionName, args, config, chainId>,
    SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
    SimulateContractQueryKey<abi, functionName, args, config, chainId>
  >
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
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  const args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  options: SimulateContractOptions<
    abi,
    functionName,
    args,
    config,
    chainId
  > = {} as any,
) {
  return ['simulateContract', filterQueryOptions(options)] as const
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
