import type { MutateOptions } from '@tanstack/query-core'

import type { Evaluate, ExactPartial } from './utils.js'

export type OmittedQueryOptions = 'queryFn' | 'queryKey' | 'queryKeyHashFn'

export type OmittedMutationOptions =
  | 'mutationFn'
  | 'mutationKey'
  | 'throwOnError'

export type MutationOptions<
  data = unknown,
  error = unknown,
  variables = void,
  parameters = variables,
> = import('@tanstack/query-core').MutationOptions<data, error, variables> & {
  getVariables: (variables: ExactPartial<parameters>) => parameters
}

export type MutateFn<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
  fnVariables = variables,
> = undefined extends fnVariables
  ? (
      variables?: fnVariables,
      options?: Evaluate<
        MutateOptions<data, error, Evaluate<variables>, context>
      >,
    ) => Promise<data>
  : (
      variables: fnVariables,
      options?: Evaluate<
        MutateOptions<data, error, Evaluate<variables>, context>
      >,
    ) => Promise<data>

export type Mutate<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
  fnVariables = variables,
> = (
  ...args: Parameters<MutateFn<data, error, variables, context, fnVariables>>
) => void

export type MutateAsync<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
  fnVariables = variables,
> = MutateFn<data, error, variables, context, fnVariables>
