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
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Evaluate<
  GetEnsAddressOptions<config> &
    UseQueryParameters<
      GetEnsAddressQueryFnData,
      GetEnsAddressError,
      selectData,
      GetEnsAddressQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryResult<selectData, GetEnsAddressError>

/** https://alpha.wagmi.sh/react/hooks/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
  parameters: UseEnsAddressParameters<config, selectData> = {},
): UseEnsAddressReturnType<selectData> {
  const { name, ...query } = parameters
  const config = useConfig(parameters)

  const chainId = useChainId()
  const queryOptions = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(name && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
