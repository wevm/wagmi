import type { PrepareWriteContractError, ResolvedRegister } from '@wagmi/core'
import {
  type PrepareWriteContractData,
  type PrepareWriteContractOptions,
  type PrepareWriteContractQueryFnData,
  type PrepareWriteContractQueryKey,
  prepareWriteContractQueryOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UsePrepareContractWriteParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareWriteContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
> = PrepareWriteContractOptions<
  ResolvedRegister['config'],
  chainId,
  abi,
  functionName
> &
  UseQueryParameters<
    PrepareWriteContractQueryFnData<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName
    >,
    PrepareWriteContractError,
    selectData,
    PrepareWriteContractQueryKey<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName
    >
  >

export type UsePrepareContractWriteReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareWriteContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
> = UseQueryResult<selectData, PrepareWriteContractError>

/** https://wagmi.sh/react/hooks/usePrepareContractWrite */
export function usePrepareContractWrite<
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareWriteContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
>(
  parameters: UsePrepareContractWriteParameters<
    abi,
    functionName,
    chainId,
    selectData
  > = {} as UsePrepareContractWriteParameters<
    abi,
    functionName,
    chainId,
    selectData
  >,
): UsePrepareContractWriteReturnType<abi, functionName, chainId, selectData> {
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = prepareWriteContractQueryOptions(config, {
    ...parameters,
    chainId,
  } as PrepareWriteContractOptions<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >)
  const enabled = Boolean(parameters.enabled ?? true)

  return useQuery({
    ...queryOptions,
    ...parameters,
    enabled,
  })
}
