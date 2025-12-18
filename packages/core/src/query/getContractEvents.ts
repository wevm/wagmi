import type { QueryOptions } from '@tanstack/query-core'
import type { Abi, BlockNumber, BlockTag, ContractEventName } from 'viem'
import {
  type GetContractEventsErrorType,
  type GetContractEventsParameters,
  type GetContractEventsReturnType,
  getContractEvents,
} from '../actions/getContractEvents.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetContractEventsOptions<
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<
    GetContractEventsParameters<
      abi,
      eventName,
      strict,
      fromBlock,
      toBlock,
      config,
      chainId
    > &
      ScopeKeyParameter
  >
>

export function getContractEventsQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
>(
  config: config,
  options: GetContractEventsOptions<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId
  > = {},
) {
  return {
    async queryFn({ queryKey }) {
      const abi = options.abi as Abi
      if (!abi) throw new Error('abi is required')

      const { scopeKey: _, ...parameters } = queryKey[1]

      return getContractEvents(config, { abi, ...parameters }) as Promise<
        GetContractEventsData<abi, eventName, strict, fromBlock, toBlock>
      >
    },
    queryKey: getContractEventsQueryKey(options),
  } as const satisfies QueryOptions<
    GetContractEventsQueryFnData<abi, eventName, strict, fromBlock, toBlock>,
    GetContractEventsErrorType,
    GetContractEventsData<abi, eventName, strict, fromBlock, toBlock>,
    GetContractEventsQueryKey<
      config,
      chainId,
      abi,
      eventName,
      strict,
      fromBlock,
      toBlock
    >
  >
}

export type GetContractEventsQueryFnData<
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
> = GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>

export type GetContractEventsData<
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
> = GetContractEventsQueryFnData<abi, eventName, strict, fromBlock, toBlock>

export function getContractEventsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
>(
  options: GetContractEventsOptions<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId
  >,
) {
  const { abi: _, ...rest } = options
  return ['contractEvents', filterQueryOptions(rest)] as const
}

export type GetContractEventsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
> = ReturnType<
  typeof getContractEventsQueryKey<
    config,
    chainId,
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >
>
