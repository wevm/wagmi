'use client'
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
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseSimulateBlocksParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = Compute<
  SimulateBlocksOptions<config, calls, selectData> & ConfigParameter<config>
>

export type UseSimulateBlocksReturnType<
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = UseQueryReturnType<selectData, SimulateBlocksErrorType>

/** https://wagmi.sh/react/api/hooks/useSimulateBlocks */
export function useSimulateBlocks<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
>(
  parameters: UseSimulateBlocksParameters<config, calls, selectData> = {},
): UseSimulateBlocksReturnType<calls, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = simulateBlocksQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options) as any
}
