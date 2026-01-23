import type { TypedData } from 'viem'
import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from '../actions/verifyTypedData.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type VerifyTypedDataOptions<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
  selectData = VerifyTypedDataData,
> = UnionExactPartial<
  VerifyTypedDataParameters<typedData, primaryType, config>
> &
  ScopeKeyParameter &
  QueryParameter<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    selectData,
    VerifyTypedDataQueryKey<typedData, primaryType, config>
  >

export function verifyTypedDataQueryOptions<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
  selectData = VerifyTypedDataData,
>(
  config: config,
  options: VerifyTypedDataOptions<
    typedData,
    primaryType,
    config,
    selectData
  > = {} as any,
): VerifyTypedDataQueryOptions<typedData, primaryType, config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.address &&
        options.message &&
        options.primaryType &&
        options.signature &&
        options.types &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.message) throw new Error('message is required')
      if (!parameters.primaryType) throw new Error('primaryType is required')
      if (!parameters.signature) throw new Error('signature is required')
      if (!parameters.types) throw new Error('types is required')
      const verified = await verifyTypedData(config, {
        ...(parameters as any),
        address: parameters.address,
        message: parameters.message,
        primaryType: parameters.primaryType,
        signature: parameters.signature,
        types: parameters.types,
      })
      return verified ?? null
    },
    queryKey: verifyTypedDataQueryKey(options as any) as any,
  }
}

export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType

export type VerifyTypedDataData = VerifyTypedDataQueryFnData

export function verifyTypedDataQueryKey<
  config extends Config,
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  options: UnionExactPartial<
    VerifyTypedDataParameters<typedData, primaryType, config>
  > &
    ScopeKeyParameter = {} as any,
) {
  return ['verifyTypedData', filterQueryOptions(options)] as const
}

export type VerifyTypedDataQueryKey<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
> = ReturnType<typeof verifyTypedDataQueryKey<config, typedData, primaryType>>

export type VerifyTypedDataQueryOptions<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config,
  selectData = VerifyTypedDataData,
> = QueryOptions<
  VerifyTypedDataQueryFnData,
  VerifyTypedDataErrorType,
  selectData,
  VerifyTypedDataQueryKey<typedData, primaryType, config>
>
