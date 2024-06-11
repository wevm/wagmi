////////////////////////////////////////////////////////////////////////////////
// @wagmi/core/query
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
// biome-ignore lint/performance/noReExportAll: entrypoint module
export * from '@wagmi/core/query'

export {
  type UseMutationParameters,
  type UseMutationReturnType,
  useMutation,
} from '../utils/query.js'

export {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
