import type { SignTypedDataErrorType } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SignTypedDataData,
  type SignTypedDataMutate,
  type SignTypedDataMutateAsync,
  type SignTypedDataOptions,
  type SignTypedDataVariables,
  signTypedDataMutationOptions,
} from '@wagmi/core/query'
import { type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignTypedDataParameters<context = unknown> = Compute<
  ConfigParameter & SignTypedDataOptions<context>
>

export type UseSignTypedDataReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignTypedDataData,
    SignTypedDataErrorType,
    SignTypedDataVariables,
    context,
    SignTypedDataMutate<context>,
    SignTypedDataMutateAsync<context>
  > & {
    /** @deprecated use `mutate` instead */
    signTypedData: SignTypedDataMutate<context>
    /** @deprecated use `mutateAsync` instead */
    signTypedDataAsync: SignTypedDataMutateAsync<context>
  }
>

/** https://wagmi.sh/vue/api/composables/useSignTypedData */
export function useSignTypedData<context = unknown>(
  parameters: UseSignTypedDataParameters<context> = {},
): UseSignTypedDataReturnType<context> {
  const config = useConfig(parameters)
  const options = signTypedDataMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSignTypedDataReturnType<context>
  return {
    ...(mutation as Return),
    signTypedData: mutation.mutate as Return['mutate'],
    signTypedDataAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
