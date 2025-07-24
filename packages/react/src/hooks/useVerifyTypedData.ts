'use client'

import type {
  Config,
  ResolvedRegister,
  VerifyTypedDataErrorType,
} from '@wagmi/core'
import type { VerifyTypedDataQueryFnData } from '@wagmi/core/query'
import {
  type VerifyTypedDataData,
  type VerifyTypedDataOptions,
  type VerifyTypedDataQueryKey,
  verifyTypedDataQueryOptions,
} from '@wagmi/core/query'
import type { TypedData } from 'viem'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseVerifyTypedDataParameters<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  config extends Config = Config,
  selectData = VerifyTypedDataData,
> = VerifyTypedDataOptions<typedData, primaryType, config> &
  ConfigParameter<config> &
  QueryParameter<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    selectData,
    VerifyTypedDataQueryKey<typedData, primaryType, config>
  >

export type UseVerifyTypedDataReturnType<selectData = VerifyTypedDataData> =
  UseQueryReturnType<selectData, VerifyTypedDataErrorType>

/** https://wagmi.sh/react/api/hooks/useVerifyTypedData */
export function useVerifyTypedData<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
  config extends Config = ResolvedRegister['config'],
  selectData = VerifyTypedDataData,
>(
  parameters: UseVerifyTypedDataParameters<
    typedData,
    primaryType,
    config,
    selectData
  > = {} as any,
): UseVerifyTypedDataReturnType<selectData> {
  const {
    address,
    message,
    primaryType,
    signature,
    types,
    query = {},
  } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = verifyTypedDataQueryOptions<config, typedData, primaryType>(
    config,
    {
      ...parameters,
      chainId: parameters.chainId ?? chainId,
    },
  )
  const enabled = Boolean(
    address &&
      message &&
      primaryType &&
      signature &&
      types &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}
