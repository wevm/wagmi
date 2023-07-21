import { type QueryOptions } from '@tanstack/query-core'

import {
  type PrepareWriteContractError,
  type PrepareWriteContractParameters,
  type PrepareWriteContractReturnType,
  prepareWriteContract,
} from '../actions/prepareWriteContract.js'
import type { Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, LoosePartialBy } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'
import type { Abi } from 'viem'

export type PrepareWriteContractOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = LoosePartialBy<
  PrepareWriteContractParameters<
    config,
    // only pass through generic slot if `chainId` is inferrable from config
    number extends config['chains'][number]['id'] ? undefined : chainId,
    abi,
    functionName
  >,
  keyof PrepareWriteContractParameters
> &
  ScopeKeyParameter &
  Evaluate<ChainIdParameter<config, chainId>>

export function prepareWriteContractQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  options: PrepareWriteContractOptions<
    config,
    chainId,
    abi,
    functionName
  > = {} as PrepareWriteContractOptions<config, chainId, abi, functionName>,
) {
  return {
    async queryFn({ queryKey }) {
      return prepareWriteContract(config, queryKey[1] as any)
    },
    queryKey: prepareWriteContractQueryKey(options),
  } as const satisfies QueryOptions<
    PrepareWriteContractQueryFnData<config, chainId, abi, functionName>,
    PrepareWriteContractError,
    PrepareWriteContractData<config, chainId, abi, functionName>,
    PrepareWriteContractQueryKey<config, chainId, abi, functionName>
  >
}

export type PrepareWriteContractQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = PrepareWriteContractReturnType<config, chainId, abi, functionName>

export type PrepareWriteContractData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = PrepareWriteContractQueryFnData<
  config,
  number extends config['chains'][number]['id']
    ? config['chains'][number]['id']
    : chainId,
  abi,
  functionName
>

export function prepareWriteContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  options: PrepareWriteContractOptions<
    config,
    chainId,
    abi,
    functionName
  > = {} as PrepareWriteContractOptions<config, chainId, abi, functionName>,
) {
  return ['prepareWriteContract', filterQueryOptions(options)] as const
}

export type PrepareWriteContractQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = ReturnType<
  typeof prepareWriteContractQueryKey<config, chainId, abi, functionName>
>
