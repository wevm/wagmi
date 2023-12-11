import { type QueryOptions } from '@tanstack/query-core'

import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from '../actions/verifyMessage.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyMessageOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<VerifyMessageParameters<config, chainId> & ScopeKeyParameter>

export function verifyMessageQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: Config, options: VerifyMessageOptions<Config, chainId>) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const verified = await verifyMessage(config, parameters)
      return verified ?? null
    },
    queryKey: verifyMessageQueryKey(options),
  } as const satisfies QueryOptions<
    VerifyMessageQueryFnData,
    VerifyMessageErrorType,
    VerifyMessageData,
    VerifyMessageQueryKey
  >
}
export type VerifyMessageQueryFnData = VerifyMessageReturnType

export type VerifyMessageData = VerifyMessageQueryFnData

export function verifyMessageQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: VerifyMessageOptions<config, chainId>) {
  return ['verifyMessage', filterQueryOptions(options)] as const
}

export type VerifyMessageQueryKey = ReturnType<typeof verifyMessageQueryKey>
