'use client'
import type {
  Config,
  ResolvedRegister,
  VerifyMessageErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type VerifyMessageData,
  type VerifyMessageOptions,
  verifyMessageQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseVerifyMessageParameters<
  config extends Config = Config,
  selectData = VerifyMessageData,
> = Compute<VerifyMessageOptions<config, selectData> & ConfigParameter<config>>

export type UseVerifyMessageReturnType<selectData = VerifyMessageData> =
  UseQueryReturnType<selectData, VerifyMessageErrorType>

/** https://wagmi.sh/react/api/hooks/useVerifyMessage */
export function useVerifyMessage<
  config extends Config = ResolvedRegister['config'],
  selectData = VerifyMessageData,
>(
  parameters: UseVerifyMessageParameters<config, selectData> = {},
): UseVerifyMessageReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = verifyMessageQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
