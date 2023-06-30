import type { GetEnsNameError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsNameParameters<selectData = GetEnsNameData> = Evaluate<
  GetEnsNameOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetEnsNameQueryFnData,
      GetEnsNameError,
      selectData,
      GetEnsNameQueryKey<ResolvedRegister['config']>
    >
>

export type UseEnsNameReturnType<selectData = GetEnsNameData> = UseQueryResult<
  selectData,
  GetEnsNameError
>

/** https://wagmi.sh/react/hooks/useEnsName */
export function useEnsName<selectData = GetEnsNameData>(
  parameters: UseEnsNameParameters<selectData>,
): UseEnsNameReturnType<selectData> {
  const { address, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getEnsNameQueryOptions(config, {
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
