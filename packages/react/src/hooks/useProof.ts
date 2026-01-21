'use client'
import type { Config, GetProofErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetProofData,
  type GetProofOptions,
  getProofQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseProofParameters<
  config extends Config = Config,
  selectData = GetProofData,
> = Compute<GetProofOptions<config, selectData> & ConfigParameter<config>>

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
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getProofQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
