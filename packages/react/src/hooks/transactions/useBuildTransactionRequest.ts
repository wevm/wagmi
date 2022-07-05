import {
  BuildTransactionRequestArgs,
  BuildTransactionRequestResult,
  buildTransactionRequest,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UseBuildTransactionRequestArgs = BuildTransactionRequestArgs

export type UseBuildTransactionRequestConfig = QueryConfig<
  BuildTransactionRequestResult,
  Error
>

export const queryKey = ({
  chainId,
  request,
}: UseBuildTransactionRequestArgs & {
  chainId?: number
}) => [{ entity: 'buildTransactionRequest', chainId, request }] as const

const queryFn = ({
  queryKey: [{ request }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return buildTransactionRequest({ request })
}

export function useBuildTransactionRequest({
  request,
  cacheTime,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseBuildTransactionRequestArgs & UseBuildTransactionRequestConfig) {
  const chainId = useChainId()
  const provider = useProvider()
  return useQuery(queryKey({ request, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && provider),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
