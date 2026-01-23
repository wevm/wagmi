'use client'
import type {
  Config,
  ResolvedRegister,
  WaitForCallsStatusErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WaitForCallsStatusData,
  type WaitForCallsStatusOptions,
  waitForCallsStatusQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseWaitForCallsStatusParameters<
  config extends Config = Config,
  selectData = WaitForCallsStatusData,
> = Compute<WaitForCallsStatusOptions<selectData> & ConfigParameter<config>>

export type UseWaitForCallsStatusReturnType<
  selectData = WaitForCallsStatusData,
> = UseQueryReturnType<selectData, WaitForCallsStatusErrorType>

/** https://wagmi.sh/react/api/hooks/useWaitForCallsStatus */
export function useWaitForCallsStatus<
  config extends Config = ResolvedRegister['config'],
  selectData = WaitForCallsStatusData,
>(
  parameters: UseWaitForCallsStatusParameters<config, selectData>,
): UseWaitForCallsStatusReturnType<selectData> {
  const config = useConfig(parameters)
  const { connector } = useConnection({ config })
  const options = waitForCallsStatusQueryOptions(config, {
    ...parameters,
    connector: parameters.connector ?? connector,
  })
  return useQuery(options)
}
