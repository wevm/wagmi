import type {
  Config,
  ResolvedRegister,
  SimulateContractErrorType,
} from '@wagmi/core'
import {
  type SimulateContractData,
  type SimulateContractOptions,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
  simulateContractQueryOptions,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { type MaybeRef, computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

export type UseSimulateContractParameters<
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
> = MaybeRef<
  DeepMaybeRef<
    SimulateContractOptions<abi, functionName, args, config, chainId>
  > &
    ConfigParameter<config> &
    QueryParameter<
      SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
      SimulateContractErrorType,
      selectData,
      SimulateContractQueryKey<abi, functionName, args, config, chainId>
    >
>

export type UseSimulateContractReturnType<
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
> = UseQueryReturnType<selectData, SimulateContractErrorType>

/** https://wagmi.sh/vue/api/composables/useSimulateContract */
export function useSimulateContract<
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
  parameters_: UseSimulateContractParameters<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  > = {} as any,
): UseSimulateContractReturnType<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
> {
  const parameters = computed(() => deepUnref(parameters_)) as any

  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient(
    computed(() => ({
      connector: parameters.value.connector,
      query: { enabled: parameters.value.account === undefined },
    })),
  )
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      abi,
      account = connectorClient?.value?.account,
      address,
      chainId = configChainId.value,
      functionName,
      query = {},
    } = parameters.value
    const options = simulateContractQueryOptions<
      config,
      abi,
      functionName,
      args,
      chainId
    >(config as any, {
      ...parameters.value,
      account,
      chainId,
    })
    const enabled = Boolean(
      abi && address && functionName && (query.enabled ?? true),
    )
    return {
      ...query,
      ...options,
      enabled,
    }
  })

  return useQuery(queryOptions as any) as UseSimulateContractReturnType<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  >
}
