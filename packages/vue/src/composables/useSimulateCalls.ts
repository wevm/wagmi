import type {
  Config,
  ResolvedRegister,
  SimulateCallsErrorType,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import {
  type SimulateCallsData,
  type SimulateCallsOptions,
  simulateCallsQueryOptions,
} from '@wagmi/core/query'
import { computed, type MaybeRef } from 'vue'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseSimulateCallsParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = MaybeRef<
  SimulateCallsOptions<config, calls, selectData> & ConfigParameter<config>
>

export type UseSimulateCallsReturnType<
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = UseQueryReturnType<selectData, SimulateCallsErrorType>

/** https://wagmi.sh/vue/api/composables/useSimulateCalls */
export function useSimulateCalls<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
>(
  parameters: UseSimulateCallsParameters<config, calls, selectData> = {} as any,
): UseSimulateCallsReturnType<calls, selectData> {
  const params = computed(() => deepUnref(parameters)) as any
  const config = useConfig(params)
  const { address, connector } = useConnection()
  const chainId = useChainId({ config })
  const options = computed(() =>
    simulateCallsQueryOptions(config as any, {
      ...params.value,
      account: params.value.account ?? address.value,
      chainId: params.value.chainId ?? chainId.value,
      connector: params.value.connector ?? connector.value,
    }),
  )
  return useQuery(options as any) as any
}
