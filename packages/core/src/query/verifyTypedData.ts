import { type QueryOptions } from '@tanstack/query-core'

import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from '../actions/verifyTypedData.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyTypedDataOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<
  ExactPartial<VerifyTypedDataParameters<config, chainId>> & ScopeKeyParameter
>

export function verifyTypedDataQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: Config, options: VerifyTypedDataOptions<Config, chainId>) {
  return {
    async queryFn({ queryKey }) {
      const { address, message, primaryType, signature, types } = queryKey[1]
      if (!address || !message || !primaryType || !signature || !types)
        throw new Error(
          'address, message, primaryType, signature and types are required',
        )

      const { scopeKey: _, ...parameters } = queryKey[1]

      const verified = await verifyTypedData(
        config,
        parameters as VerifyTypedDataParameters,
      )
      return verified ?? null
    },
    queryKey: verifyTypedDataQueryKey(options),
  } as const satisfies QueryOptions<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    VerifyTypedDataData,
    VerifyTypedDataQueryKey
  >
}
export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType

export type VerifyTypedDataData = VerifyTypedDataQueryFnData

export function verifyTypedDataQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: VerifyTypedDataOptions<config, chainId>) {
  return ['verifyTypedData', filterQueryOptions(options)] as const
}

export type VerifyTypedDataQueryKey = ReturnType<typeof verifyTypedDataQueryKey>
