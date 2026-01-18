'use client'

import type {
  Config,
  GetContractEventsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetContractEventsData,
  type GetContractEventsOptions,
  type GetContractEventsQueryFnData,
  type GetContractEventsQueryKey,
  getContractEventsQueryOptions,
} from '@wagmi/core/query'
import type { Abi, BlockNumber, BlockTag, ContractEventName } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseContractEventsParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined =
    | ContractEventName<abi>
    | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetContractEventsData<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >,
> = Compute<
  GetContractEventsOptions<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId
  > &
    ConfigParameter<config> &
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
>

export type UseContractEventsReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined =
    | ContractEventName<abi>
    | undefined,
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
> = UseQueryReturnType<selectData, GetContractEventsErrorType>

/** https://wagmi.sh/react/api/hooks/useContractEvents */
export function useContractEvents<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetContractEventsData<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock
  >,
>(
  parameters: UseContractEventsParameters<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId,
    selectData
  > = {},
): UseContractEventsReturnType<
  abi,
  eventName,
  strict,
  fromBlock,
  toBlock,
  selectData
> {
  const { abi, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getContractEventsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(abi && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
  })
}
