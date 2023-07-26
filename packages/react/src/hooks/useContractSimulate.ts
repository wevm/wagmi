import type { ResolvedRegister, SimulateContractError } from '@wagmi/core'
import {
  type SimulateContractData,
  type SimulateContractOptions,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
  simulateContractQueryOptions,
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

export type UseContractSimulateParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
> = SimulateContractOptions<
  ResolvedRegister['config'],
  chainId,
  abi,
  functionName
> &
  UseQueryParameters<
    SimulateContractQueryFnData<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName
    >,
    SimulateContractError,
    selectData,
    SimulateContractQueryKey<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName
    >
  >

export type UseContractSimulateReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
> = UseQueryResult<selectData, SimulateContractError>

/** https://wagmi.sh/react/hooks/useContractSimulate */
export function useContractSimulate<
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >,
>(
  parameters: UseContractSimulateParameters<
    abi,
    functionName,
    chainId,
    selectData
  > = {} as UseContractSimulateParameters<
    abi,
    functionName,
    chainId,
    selectData
  >,
): UseContractSimulateReturnType<abi, functionName, chainId, selectData> {
  const { address, abi, functionName, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = simulateContractQueryOptions(config, {
    ...parameters,
    chainId,
  } as SimulateContractOptions<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName
  >)
  const enabled = Boolean(
    address && abi && functionName && (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
  }) as UseContractSimulateReturnType<abi, functionName, chainId, selectData>
}
