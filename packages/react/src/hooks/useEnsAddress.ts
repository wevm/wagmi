'use client'

import type {
  Config,
  GetEnsAddressErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  type GetEnsAddressQueryFnData,
  type GetEnsAddressQueryKey,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Compute<
  GetEnsAddressOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetEnsAddressQueryFnData,
      GetEnsAddressErrorType,
      selectData,
      GetEnsAddressQueryKey<config>
    >
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryReturnType<selectData, GetEnsAddressErrorType>

/** https://wagmi.sh/react/api/hooks/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
  parameters: UseEnsAddressParameters<config, selectData> = {},
): UseEnsAddressReturnType<selectData> {
  const { name, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(name && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
