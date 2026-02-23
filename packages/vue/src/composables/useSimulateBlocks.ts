import type {
  Config,
  ResolvedRegister,
  SimulateBlocksErrorType,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import {
  type SimulateBlocksData,
  type SimulateBlocksOptions,
  simulateBlocksQueryOptions,
} from '@wagmi/core/query'
import { computed, type MaybeRef } from 'vue'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseSimulateBlocksParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = MaybeRef<
  SimulateBlocksOptions<config, calls, selectData> & ConfigParameter<config>
>

export type UseSimulateBlocksReturnType<
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = UseQueryReturnType<selectData, SimulateBlocksErrorType>

/** https://wagmi.sh/vue/api/composables/useSimulateBlocks */
export function useSimulateBlocks<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
>(
  parameters: UseSimulateBlocksParameters<
    config,
    calls,
    selectData
  > = {} as any,
): UseSimulateBlocksReturnType<calls, selectData> {
  const params = computed(() => deepUnref(parameters)) as any
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    simulateBlocksQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
    }),
  )
  return useQuery(options as any) as any
}
