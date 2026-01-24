'use client'

import type {
  Config,
  GetPermissionsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type GetPermissionsData,
  type GetPermissionsOptions,
  getPermissionsQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UsePermissionsParameters<
  config extends Config = Config,
  selectData = GetPermissionsData,
> = Compute<GetPermissionsOptions<config, selectData> & ConfigParameter<config>>

export type UsePermissionsReturnType<selectData = GetPermissionsData> =
  UseQueryReturnType<selectData, GetPermissionsErrorType>

/** https://wagmi.sh/react/api/hooks/usePermissions */
export function usePermissions<
  config extends Config = ResolvedRegister['config'],
  selectData = GetPermissionsData,
>(
  parameters: UsePermissionsParameters<config, selectData> = {},
): UsePermissionsReturnType<selectData> {
  const config = useConfig(parameters)
  const { connector } = useConnection({ config })
  const options = getPermissionsQueryOptions(config, {
    ...parameters,
    connector: parameters.connector ?? connector,
  })
  return useQuery(options)
}
