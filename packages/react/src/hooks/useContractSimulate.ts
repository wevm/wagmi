'use client'

import type {
  Config,
  ResolvedRegister,
  SimulateContractError,
} from '@wagmi/core'
import {
  type SimulateContractData,
  type SimulateContractOptions,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
  simulateContractQueryOptions,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

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
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
> = SimulateContractOptions<abi, functionName, args, config, chainId> &
  UseQueryParameters<
    SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
    SimulateContractError,
    selectData,
    SimulateContractQueryKey<abi, functionName, args, config, chainId>
  > &
  ConfigParameter<config>

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
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
> = UseQueryReturnType<selectData, SimulateContractError>

/** https://alpha.wagmi.sh/react/api/hooks/useContractSimulate */
export function useContractSimulate<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
>(
  parameters?: UseContractSimulateParameters<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  >,
): UseContractSimulateReturnType<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
>

export function useContractSimulate(
  parameters: UseContractSimulateParameters<any, any, any, any, any, any> = {},
): UseContractSimulateReturnType {
  const { abi, address, connector, functionName, ...query } = parameters

  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient({
    connector,
    enabled: parameters.account === undefined,
  })
  const chainId = useChainId()

  const queryOptions = simulateContractQueryOptions(config, {
    ...(parameters as any),
    account: parameters.account ?? connectorClient?.account,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    abi && address && functionName && (parameters.enabled ?? true),
  )

  return useQuery({ ...queryOptions, ...query, enabled })
}
