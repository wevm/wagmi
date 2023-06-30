import type { GetEnsAddressError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  type GetEnsAddressQueryFnData,
  type GetEnsAddressQueryKey,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<selectData = GetEnsAddressData> = Evaluate<
  GetEnsAddressOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetEnsAddressQueryFnData,
      GetEnsAddressError,
      selectData,
      GetEnsAddressQueryKey<ResolvedRegister['config']>
    >
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryResult<selectData, GetEnsAddressError>

/** https://wagmi.sh/react/hooks/useEnsAddress */
export function useEnsAddress<selectData = GetEnsAddressData>(
  parameters: UseEnsAddressParameters<selectData>,
): UseEnsAddressReturnType<selectData> {
  const { name, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(name && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
