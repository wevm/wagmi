import { useMutation } from '@tanstack/react-query'
import type { SignTypedDataError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SignTypedDataData,
  type SignTypedDataMutate,
  type SignTypedDataMutateAsync,
  type SignTypedDataVariables,
  signTypedDataMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSignTypedDataParameters<context = unknown> = UseMutationOptions<
  SignTypedDataData,
  SignTypedDataError,
  SignTypedDataVariables,
  context
>

export type UseSignTypedDataReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    SignTypedDataData,
    SignTypedDataError,
    SignTypedDataVariables,
    context
  > & {
    signTypedData: SignTypedDataMutate<context>
    signTypedDataAsync: SignTypedDataMutateAsync<context>
  }
>

/** https://wagmi.sh/react/hooks/useSignTypedData */
export function useSignTypedData<context = unknown>(
  parameters: UseSignTypedDataParameters<context> = {},
): UseSignTypedDataReturnType<context> {
  const config = useConfig()
  const mutationOptions = signTypedDataMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseSignTypedDataReturnType<context>
  return {
    ...result,
    signTypedData: mutate as Return['signTypedData'],
    signTypedDataAsync: mutateAsync as Return['signTypedDataAsync'],
  }
}
