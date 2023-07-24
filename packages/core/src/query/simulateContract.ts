import { type QueryOptions } from '@tanstack/query-core'
import type { Abi } from 'viem'

import {
  type SimulateContractError,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'
import type { Config } from '../config.js'
import type { UnionPartialBy } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type SimulateContractOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = UnionPartialBy<
  SimulateContractParameters<config, chainId, abi, functionName>,
  keyof SimulateContractParameters
> &
  ScopeKeyParameter

export function simulateContractQueryOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: SimulateContractOptions<
    config,
    chainId,
    abi,
    functionName
  > = {} as SimulateContractOptions<config, chainId, abi, functionName>,
) {
  return {
    async queryFn({ queryKey }) {
      return simulateContract(config, queryKey[1] as any)
    },
    queryKey: simulateContractQueryKey(options),
  } as const satisfies QueryOptions<
    SimulateContractQueryFnData<config, chainId, abi, functionName>,
    SimulateContractError,
    SimulateContractData<config, chainId, abi, functionName>,
    SimulateContractQueryKey<config, chainId, abi, functionName>
  >
}

export type SimulateContractQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = SimulateContractReturnType<config, chainId, abi, functionName>

export type SimulateContractData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = SimulateContractQueryFnData<
  config,
  number extends config['chains'][number]['id']
    ? config['chains'][number]['id']
    : chainId,
  abi,
  functionName
>

export function simulateContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  options: SimulateContractOptions<
    config,
    chainId,
    abi,
    functionName
  > = {} as SimulateContractOptions<config, chainId, abi, functionName>,
) {
  // minimze abi for query key
  const abi = ((options.abi ?? []) as Abi).filter(
    (abiItem) => 'name' in abiItem && abiItem.name === options.functionName,
  )
  return ['simulateContract', filterQueryOptions({ ...options, abi })] as const
}

export type SimulateContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = ReturnType<
  typeof simulateContractQueryKey<config, chainId, abi, functionName>
>
