import type { DefaultError, QueryKey } from '@tanstack/react-query'
import { type Evaluate } from '@wagmi/core/internal'
import type {
  OmittedMutationOptions,
  OmittedQueryOptions,
} from '@wagmi/core/query'

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

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Evaluate<
  Omit<
    import('@tanstack/react-query').UseQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >,
    OmittedQueryOptions | 'initialData' | 'suspense' | 'throwOnError'
  > & {
    initialData?: import('@tanstack/react-query').UseQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >['initialData']
  }
>

export type UseQueryResult<
  data = unknown,
  error = DefaultError,
> = import('@tanstack/react-query').UseQueryResult<data, error>
