'use client'
import type {
  Config,
  ResolvedRegister,
  SimulateCallsErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SimulateCallsData,
  type SimulateCallsOptions,
  simulateCallsQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseSimulateCallsParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = Compute<
  SimulateCallsOptions<config, calls, selectData> & ConfigParameter<config>
>

export type UseSimulateCallsReturnType<
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = UseQueryReturnType<selectData, SimulateCallsErrorType>

/** https://wagmi.sh/react/api/hooks/useSimulateCalls */
export function useSimulateCalls<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
>(
  parameters: UseSimulateCallsParameters<config, calls, selectData> = {},
): UseSimulateCallsReturnType<calls, selectData> {
  const config = useConfig(parameters)
  const { address, connector } = useConnection()
  const chainId = useChainId({ config })
  const options = simulateCallsQueryOptions(config, {
    ...parameters,
    account: parameters.account ?? address,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
  return useQuery(options) as any
}
