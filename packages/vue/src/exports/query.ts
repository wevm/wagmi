////////////////////////////////////////////////////////////////////////////////
// @wagmi/core/query
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
// biome-ignore lint/performance/noReExportAll: entrypoint module
export * from '@wagmi/core/query'
export {
  type UseMutationParameters,
  type UseMutationReturnType,
  type UseQueryParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from '../utils/query.js'
