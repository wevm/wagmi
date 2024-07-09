'use client'

import type { Config, GetProofErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetProofData,
  type GetProofOptions,
  type GetProofQueryKey,
  getProofQueryOptions,
} from '@wagmi/core/query'
import type { GetProofQueryFnData } from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseProofParameters<
  config extends Config = Config,
  selectData = GetProofData,
> = Compute<
  GetProofOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetProofQueryFnData,
      GetProofErrorType,
      selectData,
      GetProofQueryKey<config>
    >
>

export type UseProofReturnType<selectData = GetProofData> = UseQueryReturnType<
  selectData,
  GetProofErrorType
>

/** https://wagmi.sh/react/api/hooks/useProof */
export function useProof<
  config extends Config = ResolvedRegister['config'],
  selectData = GetProofData,
>(
  parameters: UseProofParameters<config, selectData> = {},
): UseProofReturnType<selectData> {
  const { address, storageKeys, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getProofQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(address && storageKeys && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
