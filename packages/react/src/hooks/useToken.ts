import type { GetTokenError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetTokenData,
  type GetTokenOptions,
  type GetTokenQueryFnData,
  type GetTokenQueryKey,
  getTokenQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTokenParameters<selectData = GetTokenData> = Evaluate<
  GetTokenOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetTokenQueryFnData,
      GetTokenError,
      selectData,
      GetTokenQueryKey<ResolvedRegister['config']>
    >
>

export type UseTokenReturnType<selectData = GetTokenData> = UseQueryResult<
  selectData,
  GetTokenError
>

/** https://wagmi.sh/react/hooks/useToken */
export function useToken<selectData = GetTokenData>(
  parameters: UseTokenParameters<selectData>,
): UseTokenReturnType<selectData> {
  const { address, ...query } = parameters
  const config = useConfig()

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
