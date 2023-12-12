'use client'

import {
  type Config,
  type ResolvedRegister,
  type VerifyTypedDataErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type VerifyTypedDataData,
  type VerifyTypedDataOptions,
  type VerifyTypedDataQueryKey,
  verifyTypedDataQueryOptions,
} from '@wagmi/core/query'
import type { VerifyTypedDataQueryFnData } from '@wagmi/core/query'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseVerifyTypedDataParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = VerifyTypedDataData,
> = Evaluate<
  VerifyTypedDataOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      VerifyTypedDataQueryFnData,
      VerifyTypedDataErrorType,
      selectData,
      VerifyTypedDataQueryKey
    >
>

export type UseVerifyTypedDataReturnType<selectData = VerifyTypedDataData> =
  UseQueryReturnType<selectData, VerifyTypedDataErrorType>

/** https://beta.wagmi.sh/react/api/hooks/useVerifyTypedData */
export function useVerifyTypedData<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = VerifyTypedDataData,
>(
  parameters: UseVerifyTypedDataParameters<config, chainId, selectData> = {},
): UseVerifyTypedDataReturnType<selectData> {
  const {
    address,
    message,
    primaryType,
    signature,
    types,
    query = {},
  } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = verifyTypedDataQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    address &&
      message &&
      primaryType &&
      signature &&
      types &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}
