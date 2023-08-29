import { type QueryOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type SimulateContractError,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../createConfig.js'
import type { UnionPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
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
> = UnionPartial<
  SimulateContractParameters<abi, functionName, args, config, chainId>
> &
  ScopeKeyParameter

export function simulateContractQueryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
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
      } as SimulateContractParameters<abi, functionName, args, config, chainId>)
    },
    queryKey: simulateContractQueryKey(options),
  } as const satisfies QueryOptions<
    SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
    SimulateContractError,
    SimulateContractData<abi, functionName, args, config, chainId>,
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
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
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
  const { abi: _, connector: _c, ...rest } = options
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
