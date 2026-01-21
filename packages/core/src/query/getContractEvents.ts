import type { Abi, BlockNumber, BlockTag, ContractEventName } from 'viem'
import {
  type GetContractEventsErrorType,
  type GetContractEventsParameters,
  type GetContractEventsReturnType,
  getContractEvents,
} from '../actions/getContractEvents.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions, structuralSharing } from './utils.js'

export type GetContractEventsOptions<
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetContractEventsData<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >,
> = UnionExactPartial<
  GetContractEventsParameters<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId
  >
> &
  ScopeKeyParameter &
  QueryParameter<
    GetContractEventsQueryFnData<abi, eventName, strict, fromBlock, toBlock>,
    GetContractEventsErrorType,
    selectData,
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

export function getContractEventsQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
  selectData = GetContractEventsData<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >,
>(
  config: config,
  options: GetContractEventsOptions<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId,
    selectData
  > = {} as any,
): GetContractEventsQueryOptions<
  abi,
  eventName,
  strict,
  fromBlock,
  toBlock,
  config,
  chainId,
  selectData
> {
  return {
    ...options.query,
    enabled: Boolean(options.abi && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      if (!options.abi) throw new Error('abi is required')
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const result = await getContractEvents(config, {
        ...(parameters as any),
        abi: options.abi,
      })
      return result as GetContractEventsData<
        abi,
        eventName,
        strict,
        fromBlock,
        toBlock
      >
    },
    queryKey: getContractEventsQueryKey(options as any) as any,
    structuralSharing,
  } as GetContractEventsQueryOptions<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId,
    selectData
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
  options: UnionExactPartial<
    GetContractEventsParameters<
      abi,
      eventName,
      strict,
      fromBlock,
      toBlock,
      config,
      chainId
    >
  > &
    ScopeKeyParameter = {} as any,
) {
  return ['getContractEvents', filterQueryOptions(options)] as const
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

export type GetContractEventsQueryOptions<
  abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined,
  fromBlock extends BlockNumber | BlockTag | undefined,
  toBlock extends BlockNumber | BlockTag | undefined,
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetContractEventsData<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >,
> = QueryOptions<
  GetContractEventsQueryFnData<abi, eventName, strict, fromBlock, toBlock>,
  GetContractEventsErrorType,
  selectData,
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
