import type { ResolvedRegister, SimulateContractError } from '@wagmi/core'
import {
  type SimulateContractData,
  type SimulateContractOptions,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
  simulateContractQueryOptions,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseContractSimulateParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName,
    args
  >,
> = SimulateContractOptions<
  ResolvedRegister['config'],
  chainId,
  abi,
  functionName,
  args
> &
  UseQueryParameters<
    SimulateContractQueryFnData<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName,
      args
    >,
    SimulateContractError,
    selectData,
    SimulateContractQueryKey<
      ResolvedRegister['config'],
      chainId,
      abi,
      functionName,
      args
    >
  >

export type UseContractSimulateReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName,
    args
  >,
> = UseQueryResult<selectData, SimulateContractError>

/** https://wagmi.sh/react/hooks/useContractSimulate */
export function useContractSimulate<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends ChainId | undefined = undefined,
  selectData = SimulateContractData<
    ResolvedRegister['config'],
    chainId,
    abi,
    functionName,
    args
  >,
>(
  parameters: UseContractSimulateParameters<
    abi,
    functionName,
    args,
    chainId,
    selectData
  > = {} as UseContractSimulateParameters<
    abi,
    functionName,
    args,
    chainId,
    selectData
  >,
): UseContractSimulateReturnType<abi, functionName, args, chainId, selectData> {
  const { abi, address, connector, functionName, ...query } = parameters
  const config = useConfig()
  const { data: connectorClient } = useConnectorClient({
    connector,
    enabled: parameters.account === undefined,
  })

  const account = parameters.account ?? connectorClient?.account
  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = simulateContractQueryOptions(config, {
    ...(parameters as any),
    account,
    chainId,
  })
  const enabled = Boolean(
    abi && address && functionName && (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
  }) as UseContractSimulateReturnType<
    abi,
    functionName,
    args,
    chainId,
    selectData
  >
}
