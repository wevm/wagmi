import type {
  Config,
  ResolvedRegister,
  SimulateBlocksErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SimulateBlocksData,
  type SimulateBlocksOptions,
  simulateBlocksQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useSimulateBlocks */
export function useSimulateBlocks<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
>(
  parameters: useSimulateBlocks.Parameters<
    config,
    calls,
    selectData
  > = () => ({}),
): useSimulateBlocks.ReturnType<calls, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    simulateBlocksQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options)
}

export namespace useSimulateBlocks {
  export type Parameters<
    config extends Config = Config,
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateBlocksData<calls>,
  > = Accessor<SolidParameters<config, calls, selectData>>

  export type ReturnType<
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateBlocksData<calls>,
  > = UseQueryReturnType<selectData, SimulateBlocksErrorType>

  export type SolidParameters<
    config extends Config = Config,
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateBlocksData<calls>,
  > = Compute<
    SimulateBlocksOptions<config, calls, selectData> & ConfigParameter<config>
  >
}
