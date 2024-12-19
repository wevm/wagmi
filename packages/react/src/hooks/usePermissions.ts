'use client'

import type {
  Config,
  GetPermissionsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetPermissionsData,
  type GetPermissionsOptions,
  type GetPermissionsQueryFnData,
  type GetPermissionsQueryKey,
  getPermissionsQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePermissionsParameters<
  config extends Config = Config,
  selectData = GetPermissionsData,
> = Compute<
  GetPermissionsOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetPermissionsQueryFnData,
      GetPermissionsErrorType,
      selectData,
      GetPermissionsQueryKey<config>
    >
>

export type UsePermissionsReturnType<selectData = GetPermissionsData> =
  UseQueryReturnType<selectData, GetPermissionsErrorType>

/** https://wagmi.sh/react/api/hooks/usePermisssions */
export function usePermissions<
  config extends Config = ResolvedRegister['config'],
  selectData = GetPermissionsData,
>(
  parameters: UsePermissionsParameters<config, selectData> = {},
): UsePermissionsReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getPermissionsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...query, ...options })
}
