'use client'
import type {
  Config,
  GetBytecodeErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBytecodeData,
  type GetBytecodeOptions,
  getBytecodeQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBytecodeParameters<
  config extends Config = Config,
  selectData = GetBytecodeData,
> = Compute<GetBytecodeOptions<config, selectData> & ConfigParameter<config>>

export type UseBytecodeReturnType<selectData = GetBytecodeData> =
  UseQueryReturnType<selectData, GetBytecodeErrorType>

/** https://wagmi.sh/react/api/hooks/useBytecode */
export function useBytecode<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBytecodeData,
>(
  parameters: UseBytecodeParameters<config, selectData> = {},
): UseBytecodeReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getBytecodeQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
