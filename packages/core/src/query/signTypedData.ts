import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { TypedData } from 'viem'
import {
  type SignTypedDataErrorType,
  type SignTypedDataParameters,
  type SignTypedDataReturnType,
  signTypedData,
} from '../actions/signTypedData.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type SignTypedDataOptions<context = unknown> = MutationParameter<
  SignTypedDataData,
  SignTypedDataErrorType,
  SignTypedDataVariables,
  context
>

export function signTypedDataMutationOptions<config extends Config, context>(
  config: config,
  options: SignTypedDataOptions<context> = {},
): SignTypedDataMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return signTypedData(config, variables)
    },
    mutationKey: ['signTypedData'],
  }
}

export type SignTypedDataMutationOptions = MutationOptions<
  SignTypedDataData,
  SignTypedDataErrorType,
  SignTypedDataVariables
>

export type SignTypedDataData = Compute<SignTypedDataReturnType>

export type SignTypedDataVariables<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  ///
  primaryTypes = typedData extends TypedData ? keyof typedData : string,
> = SignTypedDataParameters<typedData, primaryType, primaryTypes>

export type SignTypedDataMutate<context = unknown> = <
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  variables: SignTypedDataVariables<typedData, primaryType>,
  options?:
    | MutateOptions<
        SignTypedDataData,
        SignTypedDataErrorType,
        SignTypedDataVariables<
          typedData,
          primaryType,
          // use `primaryType` to make sure it's not union of all possible primary types
          primaryType
        >,
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
        SignTypedDataErrorType,
        SignTypedDataVariables<
          typedData,
          primaryType,
          // use `primaryType` to make sure it's not union of all possible primary types
          primaryType
        >,
        context
      >
    | undefined,
) => Promise<SignTypedDataData>
