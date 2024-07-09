'use client'

import type { Config, ResolvedRegister } from '@wagmi/core'
import {
  type GetCapabilitiesData,
  type GetCapabilitiesErrorType,
  type GetCapabilitiesOptions,
  type GetCapabilitiesQueryFnData,
  type GetCapabilitiesQueryKey,
  getCapabilitiesQueryOptions,
} from '@wagmi/core/experimental'
import type { Compute } from '@wagmi/core/internal'

import { useAccount } from '../../hooks/useAccount.js'
import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../../utils/query.js'

export type UseCapabilitiesParameters<
  config extends Config = Config,
  selectData = GetCapabilitiesData,
> = Compute<
  GetCapabilitiesOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetCapabilitiesQueryFnData,
      GetCapabilitiesErrorType,
      selectData,
      GetCapabilitiesQueryKey
    >
>

export type UseCapabilitiesReturnType<selectData = GetCapabilitiesData> =
  UseQueryReturnType<selectData, GetCapabilitiesErrorType>

/** https://wagmi.sh/react/api/hooks/useCapabilities */
export function useCapabilities<
  config extends Config = ResolvedRegister['config'],
  selectData = GetCapabilitiesData,
>(
  parameters: UseCapabilitiesParameters<config, selectData> = {},
): UseCapabilitiesReturnType<selectData> {
  const { account, query = {} } = parameters

  const { address } = useAccount()
  const config = useConfig(parameters)

  const options = getCapabilitiesQueryOptions(config, {
    ...parameters,
    account: account ?? address,
  })

  return useQuery({ ...query, ...options })
}
