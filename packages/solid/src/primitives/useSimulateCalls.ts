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
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

/** https://wagmi.sh/solid/api/primitives/useSimulateCalls */
export function useSimulateCalls<
  config extends Config = ResolvedRegister['config'],
  const calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
>(
  parameters: useSimulateCalls.Parameters<
    config,
    calls,
    selectData
  > = () => ({}),
): useSimulateCalls.ReturnType<calls, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const connection = useConnection(() => ({ config: config() }))
  const options = createMemo(() => {
    const { address, connector } = connection()
    return simulateCallsQueryOptions(config(), {
      ...parameters(),
      account: parameters().account ?? address,
      chainId: parameters().chainId ?? chainId(),
      connector: parameters().connector ?? connector,
    })
  })
  return useQuery(options)
}

export namespace useSimulateCalls {
  export type Parameters<
    config extends Config = Config,
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateCallsData<calls>,
  > = Accessor<SolidParameters<config, calls, selectData>>

  export type ReturnType<
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateCallsData<calls>,
  > = UseQueryReturnType<selectData, SimulateCallsErrorType>

  export type SolidParameters<
    config extends Config = Config,
    calls extends readonly unknown[] = readonly unknown[],
    selectData = SimulateCallsData<calls>,
  > = Compute<
    SimulateCallsOptions<config, calls, selectData> & ConfigParameter<config>
  >
}
