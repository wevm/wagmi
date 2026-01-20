import type {
  Config,
  ReadContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { UnionCompute } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  readContractQueryOptions,
} from '@wagmi/core/query'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { computed, type MaybeRef } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
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
> = MaybeRef<
  UnionCompute<
    ReadContractOptions<abi, functionName, args, config, selectData> &
      ConfigParameter<config>
  >
>

type UseReadContractParametersLoose<
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
> = DeepMaybeRef<
  ReadContractOptions<abi, functionName, args, config, selectData> &
    ConfigParameter<Config>
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
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  >,
): UseReadContractReturnType<abi, functionName, args, selectData>
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseReadContractParametersLoose<
    abi,
    functionName,
    args,
    config,
    selectData
  >,
): UseReadContractReturnType
export function useReadContract(
  parameters: UseReadContractParametersLoose = {},
): UseReadContractReturnType {
  const params = computed(() => deepUnref(parameters)) as any
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    readContractQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
