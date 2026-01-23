'use client'
import type {
  Config,
  GetCallsStatusErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetCallsStatusData,
  type GetCallsStatusOptions,
  getCallsStatusQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseCallsStatusParameters<
  config extends Config = Config,
  selectData = GetCallsStatusData,
> = Compute<GetCallsStatusOptions<selectData> & ConfigParameter<config>>

export type UseCallsStatusReturnType<selectData = GetCallsStatusData> =
  UseQueryReturnType<selectData, GetCallsStatusErrorType>

/** https://wagmi.sh/react/api/hooks/useCallsStatus */
export function useCallsStatus<
  config extends Config = ResolvedRegister['config'],
  selectData = GetCallsStatusData,
>(
  parameters: UseCallsStatusParameters<config, selectData>,
): UseCallsStatusReturnType<selectData> {
  const config = useConfig(parameters)
  const { connector } = useConnection({ config })
  const options = getCallsStatusQueryOptions(config, {
    ...parameters,
    connector: parameters.connector ?? connector,
  })
  return useQuery(options)
}
