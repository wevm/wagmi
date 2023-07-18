import type { Evaluate } from '../types/utils.js'

export type ScopeKeyParameter = { scopeKey?: string }

type MutateFn<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = undefined extends variables
  ? (
      variables?: variables,
      options?: Evaluate<
        import('@tanstack/query-core').MutateOptions<
          data,
          error,
          variables,
          context
        >
      >,
    ) => Promise<data>
  : (
      variables: variables,
      options?: Evaluate<
        import('@tanstack/query-core').MutateOptions<
          data,
          error,
          variables,
          context
        >
      >,
    ) => Promise<data>

export type Mutate<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = (
  ...args: Parameters<MutateFn<data, error, Evaluate<variables>, context>>
) => void

export type MutateAsync<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = MutateFn<data, error, Evaluate<variables>, context>
