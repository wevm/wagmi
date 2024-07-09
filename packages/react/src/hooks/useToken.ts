'use client'

import type { Config, GetTokenErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetTokenData,
  type GetTokenOptions,
  type GetTokenQueryFnData,
  type GetTokenQueryKey,
  getTokenQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTokenParameters<
  config extends Config = Config,
  selectData = GetTokenData,
> = Compute<
  GetTokenOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetTokenQueryFnData,
      GetTokenErrorType,
      selectData,
      GetTokenQueryKey<config>
    >
>

export type UseTokenReturnType<selectData = GetTokenData> = UseQueryReturnType<
  selectData,
  GetTokenErrorType
>

/**
 * @deprecated
 *
 * https://wagmi.sh/react/api/hooks/useToken
 */
export function useToken<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTokenData,
>(
  parameters: UseTokenParameters<config, selectData> = {},
): UseTokenReturnType<selectData> {
  const { address, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTokenQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(address && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
