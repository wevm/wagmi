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
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UsePermissionsParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetPermissionsData,
> = Compute<
  GetPermissionsOptions<config, chainId, selectData> & ConfigParameter<config>
>

export type UsePermissionsReturnType<selectData = GetPermissionsData> =
  UseQueryReturnType<selectData, GetPermissionsErrorType>

/** https://wagmi.sh/react/api/hooks/usePermissions */
export function usePermissions<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetPermissionsData,
>(
  parameters: UsePermissionsParameters<config, chainId, selectData> = {},
): UsePermissionsReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const { connector } = useConnection({ config })
  const options = getPermissionsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
  return useQuery(options)
}
