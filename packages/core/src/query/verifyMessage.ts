import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from '../actions/verifyMessage.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyMessageOptions<config extends Config> = t.Compute<
  t.ExactPartial<VerifyMessageParameters<config>> & ScopeKeyParameter
>

export function verifyMessageQueryOptions<config extends Config = Config>(
  config: config,
  options: VerifyMessageOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address && options.message && options.signature),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.message) throw new Error('message is required')
      if (!parameters.signature) throw new Error('signature is required')
      const result = await verifyMessage(config, {
        ...parameters,
        address: parameters.address,
        message: parameters.message,
        signature: parameters.signature,
      })
      return result ?? null
    },
    queryKey: verifyMessageQueryKey(options),
  } as const satisfies QueryObserverOptions<
    VerifyMessageQueryFnData,
    VerifyMessageErrorType,
    VerifyMessageData,
    VerifyMessageQueryFnData,
    VerifyMessageQueryKey<config>
  >
}

export type VerifyMessageQueryFnData = t.Compute<VerifyMessageReturnType>

export type VerifyMessageData = VerifyMessageQueryFnData

export function verifyMessageQueryKey<config extends Config = Config>(
  options: VerifyMessageOptions<config> = {},
) {
  return ['verifyMessage', filterQueryOptions(options)] as const
}

export type VerifyMessageQueryKey<config extends Config> = ReturnType<
  typeof verifyMessageQueryKey<config>
>
