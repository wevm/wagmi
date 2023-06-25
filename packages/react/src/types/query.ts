import { type OmittedMutationOptions } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'

export type OmittedUseQueryOptions = 'enabled' | 'suspense' | 'throwOnError'

export type UseMutationOptions<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    import('@tanstack/react-query').UseMutationOptions<
      data,
      error,
      Evaluate<variables>,
      context
    >,
    OmittedMutationOptions
  >
>

export type UseMutationResult<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    import('@tanstack/react-query').UseMutationResult<
      data,
      error,
      variables,
      context
    >,
    'mutate' | 'mutateAsync'
  >
>
