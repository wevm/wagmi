import type { QueryOptions } from '@tanstack/query-core'
import type { TypedData } from 'viem'

import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from '../actions/verifyTypedData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyTypedDataOptions<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = ExactPartial<VerifyTypedDataParameters<typedData, primaryType, config>> &
  ScopeKeyParameter

export function verifyTypedDataQueryOptions<
  config extends Config,
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  config: config,
  options: VerifyTypedDataOptions<typedData, primaryType, config> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const {
        address,
        message,
        primaryType,
        signature,
        types,
        scopeKey: _,
        ...parameters
      } = queryKey[1]
      if (!address) throw new Error('address is required')
      if (!message) throw new Error('message is required')
      if (!primaryType) throw new Error('primaryType is required')
      if (!signature) throw new Error('signature is required')
      if (!types) throw new Error('types is required')

      const verified = await verifyTypedData(config, {
        ...parameters,
        address,
        message,
        primaryType,
        signature,
        types,
      } as VerifyTypedDataParameters)
      return verified ?? null
    },
    queryKey: verifyTypedDataQueryKey(options),
  } as const satisfies QueryOptions<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    VerifyTypedDataData,
    VerifyTypedDataQueryKey<typedData, primaryType, config>
  >
}

export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType

export type VerifyTypedDataData = VerifyTypedDataQueryFnData

export function verifyTypedDataQueryKey<
  config extends Config,
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(options: VerifyTypedDataOptions<typedData, primaryType, config>) {
  return ['verifyTypedData', filterQueryOptions(options)] as const
}

export type VerifyTypedDataQueryKey<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = ReturnType<typeof verifyTypedDataQueryKey<config, typedData, primaryType>>
