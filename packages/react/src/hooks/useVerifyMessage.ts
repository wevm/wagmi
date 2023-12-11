'use client'

import {
  type Config,
  type ResolvedRegister,
  type VerifyMessageErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type VerifyMessageData,
  type VerifyMessageOptions,
  type VerifyMessageQueryKey,
  verifyMessageQueryOptions,
} from '@wagmi/core/query'
import type { VerifyMessageQueryFnData } from '@wagmi/core/query'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseVerifyMessageParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = VerifyMessageData,
> = Evaluate<
  VerifyMessageOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      VerifyMessageQueryFnData,
      VerifyMessageErrorType,
      selectData,
      VerifyMessageQueryKey
    >
>

export type UseVerifyMessageReturnType<selectData = VerifyMessageData> =
  UseQueryReturnType<selectData, VerifyMessageErrorType>

/** https://beta.wagmi.sh/react/api/hooks/useVerifyMessage */
export function useVerifyMessage<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = VerifyMessageData,
>(
  parameters: UseVerifyMessageParameters<config, chainId, selectData> = {},
): UseVerifyMessageReturnType<selectData> {
  const { address, message, signature, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = verifyMessageQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    address && message && signature && (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}
