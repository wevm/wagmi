////////////////////////////////////////////////////////////////////////////////
// @wagmi/core/query
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
// biome-ignore lint/performance/noReExportAll: entrypoint module
export * from '@wagmi/core/query'

export {
  type SolidInfiniteQueryParameters,
  type SolidMutationParameters,
  type SolidQueryParameters,
  type UseInfiniteQueryReturnType,
  type UseMutationReturnType,
  type UseQueryReturnType,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '../utils/query.js'
