import { type QueryOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type SimulateContractError,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../config.js'
import type { UnionPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type SimulateContractOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
> = UnionPartial<
  SimulateContractParameters<config, chainId, abi, functionName, args>
> &
  ScopeKeyParameter

export function simulateContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: SimulateContractOptions<
    config,
    chainId,
    abi,
    functionName,
    args
  > = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const { abi, connector } = options
      if (!abi) throw new Error('abi is required')
      const { address, functionName, scopeKey: _, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      if (!functionName) throw new Error('functionName is required')
      return simulateContract(config, {
        abi,
        address,
        connector,
        functionName,
        ...parameters,
      } as SimulateContractParameters<config, chainId, abi, functionName, args>)
    },
    queryKey: simulateContractQueryKey(options),
  } as const satisfies QueryOptions<
    SimulateContractQueryFnData<config, chainId, abi, functionName, args>,
    SimulateContractError,
    SimulateContractData<config, chainId, abi, functionName, args>,
    SimulateContractQueryKey<config, chainId, abi, functionName, args>
  >
}

export type SimulateContractQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
> = SimulateContractReturnType<config, chainId, abi, functionName, args>

export type SimulateContractData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
> = SimulateContractQueryFnData<
  config,
  number extends config['chains'][number]['id']
    ? config['chains'][number]['id']
    : chainId,
  abi,
  functionName,
  args
>

export function simulateContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
>(
  options: SimulateContractOptions<
    config,
    chainId,
    abi,
    functionName,
    args
  > = {} as any,
) {
  const { abi: _, connector: _c, ...rest } = options
  return ['simulateContract', filterQueryOptions(rest)] as const
}

export type SimulateContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
> = ReturnType<
  typeof simulateContractQueryKey<config, chainId, abi, functionName, args>
>
