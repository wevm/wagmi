import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import type { TypedData } from 'viem'
import {
  type SignTypedDataError,
  type SignTypedDataParameters,
  type SignTypedDataReturnType,
  signTypedData,
} from '../actions/signTypedData.js'
import { type Config } from '../createConfig.js'
import type { Evaluate } from '../types/utils.js'

export function signTypedDataMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return signTypedData(config, variables)
    },
    mutationKey: ['signTypedData'],
  } as const satisfies MutationOptions<
    SignTypedDataData,
    SignTypedDataError,
    SignTypedDataVariables
  >
}

export type SignTypedDataData = Evaluate<SignTypedDataReturnType>

export type SignTypedDataVariables<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
> = SignTypedDataParameters<typedData, primaryType>

export type SignTypedDataMutate<context = unknown> = <
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  variables: SignTypedDataVariables<typedData, primaryType>,
  options?:
    | MutateOptions<
        SignTypedDataData,
        SignTypedDataError,
        SignTypedDataVariables<typedData, primaryType>,
        context
      >
    | undefined,
) => void

export type SignTypedDataMutateAsync<context = unknown> = <
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  variables: SignTypedDataVariables<typedData, primaryType>,
  options?:
    | MutateOptions<
        SignTypedDataData,
        SignTypedDataError,
        SignTypedDataVariables<typedData, primaryType>,
        context
      >
    | undefined,
) => Promise<SignTypedDataData>
