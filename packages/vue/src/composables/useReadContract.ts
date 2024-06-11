import type {
  Config,
  ReadContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { UnionEvaluate } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
  structuralSharing,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

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
> = UnionEvaluate<
  DeepMaybeRef<
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
> = UseQueryReturnType<selectData, ReadContractErrorType>

/** https://wagmi.sh/vue/api/hooks/useReadContract */
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters_: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as any,
): UseReadContractReturnType<abi, functionName, args, selectData> {
  const parameters = computed(() => deepUnref(parameters_)) as any

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      abi,
      address,
      chainId = configChainId.value,
      functionName,
      query = {},
    } = parameters.value
    const options = readContractQueryOptions<config, abi, functionName, args>(
      config as any,
      { ...parameters.value, chainId },
    )
    const enabled = Boolean(
      address && abi && functionName && (query.enabled ?? true),
    )
    return {
      ...query,
      ...options,
      enabled,
      structuralSharing: query.structuralSharing ?? structuralSharing,
    }
  })

  return useQuery(queryOptions) as UseReadContractReturnType<
    abi,
    functionName,
    args,
    selectData
  >
}
