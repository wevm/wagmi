import {
  type CreateMutationOptions,
  type CreateMutationResult,
  createMutation,
} from '@tanstack/solid-query'
import type { Compute, Omit } from '@wagmi/core/internal'

export type CreateMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Compute<
  Omit<
    ReturnType<CreateMutationOptions<data, error, Compute<variables>, context>>,
    'mutationFn' | 'mutationKey' | 'throwOnError'
  >
>

export type CreateMutationReturnType<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = CreateMutationResult<data, error, variables, context>

export { createMutation }
