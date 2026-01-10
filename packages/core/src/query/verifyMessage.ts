import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from '../actions/verifyMessage.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyMessageOptions<
  config extends Config,
  selectData = VerifyMessageData,
> = Compute<ExactPartial<VerifyMessageParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    VerifyMessageQueryFnData,
    VerifyMessageErrorType,
    selectData,
    VerifyMessageQueryKey<config>
  >

export function verifyMessageQueryOptions<
  config extends Config,
  selectData = VerifyMessageData,
>(
  config: config,
  options: VerifyMessageOptions<config, selectData> = {},
): VerifyMessageQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.address &&
        options.message &&
        options.signature &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.message) throw new Error('message is required')
      if (!parameters.signature) throw new Error('signature is required')
      const verified = await verifyMessage(config, {
        ...parameters,
        address: parameters.address,
        message: parameters.message,
        signature: parameters.signature,
      })
      return verified ?? null
    },
    queryKey: verifyMessageQueryKey(options),
  }
}

export type VerifyMessageQueryFnData = VerifyMessageReturnType

export type VerifyMessageData = VerifyMessageQueryFnData

export function verifyMessageQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<VerifyMessageParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['verifyMessage', filterQueryOptions(options)] as const
}

export type VerifyMessageQueryKey<config extends Config> = ReturnType<
  typeof verifyMessageQueryKey<config>
>

export type VerifyMessageQueryOptions<
  config extends Config,
  selectData = VerifyMessageData,
> = QueryOptions<
  VerifyMessageQueryFnData,
  VerifyMessageErrorType,
  selectData,
  VerifyMessageQueryKey<config>
>
