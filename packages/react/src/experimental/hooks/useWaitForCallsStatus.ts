'use client'

import type { Config, ResolvedRegister } from '@wagmi/core'
import {
  type WaitForCallsStatusData,
  type WaitForCallsStatusErrorType,
  type WaitForCallsStatusOptions,
  type WaitForCallsStatusQueryFnData,
  type WaitForCallsStatusQueryKey,
  waitForCallsStatusQueryOptions,
} from '@wagmi/core/experimental'
import type { Compute } from '@wagmi/core/internal'

import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../../utils/query.js'

export type UseWaitForCallsStatusParameters<
  config extends Config = Config,
  selectData = WaitForCallsStatusData,
> = Compute<
  WaitForCallsStatusOptions &
    ConfigParameter<config> &
    QueryParameter<
      WaitForCallsStatusQueryFnData,
      WaitForCallsStatusErrorType,
      selectData,
      WaitForCallsStatusQueryKey
    >
>

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
  const { id, query = {} } = parameters

  const config = useConfig(parameters)

  const options = waitForCallsStatusQueryOptions(config, parameters)
  const enabled = Boolean(id && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
