import {
  PrepareTransactionArgs,
  PrepareTransactionResult,
  deepEqual,
  prepareTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UsePrepareTransactionArgs = PrepareTransactionArgs

export type UsePrepareTransactionConfig = QueryConfig<
  PrepareTransactionResult,
  Error
>

export const queryKey = ({
  chainId,
  request,
}: UsePrepareTransactionArgs & {
  chainId?: number
}) => [{ entity: 'prepareTransaction', chainId, request }] as const

const queryFn = ({
  queryKey: [{ request }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return prepareTransaction({ request })
}

export function usePrepareTransaction({
  request,
  cacheTime,
  enabled = true,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UsePrepareTransactionArgs & UsePrepareTransactionConfig) {
  const chainId = useChainId()
  const provider = useProvider()

  return useQuery(queryKey({ request, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && provider),
    isDataEqual: deepEqual,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
