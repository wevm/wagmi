import type { Config, GetTokenError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetTokenData,
  type GetTokenOptions,
  type GetTokenQueryFnData,
  type GetTokenQueryKey,
  getTokenQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTokenParameters<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTokenData,
> = Evaluate<
  GetTokenOptions<config> &
    UseQueryParameters<
      GetTokenQueryFnData,
      GetTokenError,
      selectData,
      GetTokenQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseTokenReturnType<selectData = GetTokenData> = UseQueryResult<
  selectData,
  GetTokenError
>

/** https://wagmi.sh/react/hooks/useToken */
export function useToken<config extends Config, selectData = GetTokenData>(
  parameters: UseTokenParameters<config, selectData> = {},
): UseTokenReturnType<selectData> {
  const { address, ...query } = parameters
  const config = useConfig(parameters)

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getTokenQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(address && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
