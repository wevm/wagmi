'use client'

import { type CreateQueryReturnType, createQuery } from '$lib/query.svelte.js'
import type {
  ConfigParameter,
  QueryParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import type {
  Config,
  ReadContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { UnionCompute } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
  structuralSharing,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName, Hex } from 'viem'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
> = RuneParameters<
  UnionCompute<
    ReadContractOptions<abi, functionName, args, config> &
      ConfigParameter<config> &
      QueryParameter<
        ReadContractQueryFnData<abi, functionName, args>,
        ReadContractErrorType,
        selectData,
        ReadContractQueryKey<abi, functionName, args, config>
      >
  >
>

export type UseReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  selectData = ReadContractData<abi, functionName, args>,
> = RuneReturnType<CreateQueryReturnType<selectData, ReadContractErrorType>>

/** https://wagmi.sh/react/api/hooks/useReadContract */
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = () => ({}) as any,
): UseReadContractReturnType<abi, functionName, args, selectData> {
  const { abi, address, functionName, query = {} } = $derived.by(parameters)
  //   @ts-ignore
  const code = $derived(parameters().code as Hex | undefined)

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(() => ({ config })))

  const options = $derived(
    readContractQueryOptions<config, abi, functionName, args>(config, {
      ...(parameters() as any),
      chainId: parameters().chainId ?? chainId,
    }),
  )
  const enabled = $derived(
    Boolean(
      (address || code) && abi && functionName && (query.enabled ?? true),
    ),
  )

  return createQuery(() => ({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }))
}
