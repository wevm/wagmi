import type { QueryObserverOptions } from '@tanstack/query-core'
import type { TypedData } from 'viem'
import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from '../actions/verifyTypedData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyTypedDataOptions<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = t.ExactPartial<VerifyTypedDataParameters<typedData, primaryType, config>> &
  ScopeKeyParameter

export function verifyTypedDataQueryOptions<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
>(
  config: config,
  options: VerifyTypedDataOptions<typedData, primaryType, config> = {},
) {
  return {
    enabled: Boolean(
      options.address &&
        options.message &&
        options.primaryType &&
        options.signature &&
        options.types,
    ),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.message) throw new Error('message is required')
      if (!parameters.primaryType) throw new Error('primaryType is required')
      if (!parameters.signature) throw new Error('signature is required')
      if (!parameters.types) throw new Error('types is required')
      const result = await verifyTypedData(config, {
        ...(parameters as any),
        address: parameters.address,
        message: parameters.message,
        primaryType: parameters.primaryType,
        signature: parameters.signature,
        types: parameters.types,
      })
      return result ?? null
    },
    queryKey: verifyTypedDataQueryKey(options),
  } as const satisfies QueryObserverOptions<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    VerifyTypedDataData,
    VerifyTypedDataQueryFnData,
    VerifyTypedDataQueryKey<typedData, primaryType, config>
  >
}

export type VerifyTypedDataQueryFnData = t.Compute<VerifyTypedDataReturnType>

export type VerifyTypedDataData = VerifyTypedDataQueryFnData

export function verifyTypedDataQueryKey<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
>(options: VerifyTypedDataOptions<typedData, primaryType, config> = {}) {
  return ['verifyTypedData', filterQueryOptions(options)] as const
}

export type VerifyTypedDataQueryKey<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = ReturnType<typeof verifyTypedDataQueryKey<typedData, primaryType, config>>
