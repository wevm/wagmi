'use client'

import type { Config, GetEnsAddressError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  type GetEnsAddressQueryFnData,
  type GetEnsAddressQueryKey,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Evaluate<
  GetEnsAddressOptions<config> &
    ConfigParameter<config> & {
      query?:
        | UseQueryParameters<
            GetEnsAddressQueryFnData,
            GetEnsAddressError,
            selectData,
            GetEnsAddressQueryKey<config>
          >
        | undefined
    }
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryReturnType<selectData, GetEnsAddressError>

/** https://alpha.wagmi.sh/react/api/hooks/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
  parameters: UseEnsAddressParameters<config, selectData> = {},
): UseEnsAddressReturnType<selectData> {
  const { name, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(name && (query.enabled ?? true))

  return useQuery({ ...queryOptions, ...query, enabled })
}
