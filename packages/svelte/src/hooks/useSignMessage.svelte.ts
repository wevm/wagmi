import { createMutation } from '@tanstack/svelte-query'
import type { SignMessageErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'

import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../query.svelte.js'
import type { RuneParameters, RuneReturnType } from '../types.js'
import type { ConfigParameter } from '../types.js'
import { useConfig } from './useConfig.svelte.js'

export type UseSignMessageParameters<context = unknown> = RuneParameters<
  Compute<
    ConfigParameter & {
      mutation?:
        | CreateMutationParameters<
            SignMessageData,
            SignMessageErrorType,
            SignMessageVariables,
            context
          >
        | undefined
    }
  >
>

export type UseSignMessageReturnType<context = unknown> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      SignMessageData,
      SignMessageErrorType,
      SignMessageVariables,
      context
    > & {
      signMessage: SignMessageMutate<context>
      signMessageAsync: SignMessageMutateAsync<context>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useSignMessage */
export function useSignMessage<context = unknown>(
  parameters: UseSignMessageParameters<context> = () => ({}),
): UseSignMessageReturnType<context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(signMessageMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  return () => ({
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync,
  })
}
