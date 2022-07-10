import {
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
  deepEqual,
  prepareSendTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UseSendTransactionPrepareArgs = PrepareSendTransactionArgs

export type UseSendTransactionPrepareConfig = QueryConfig<
  PrepareSendTransactionResult,
  Error
>

export const queryKey = ({
  chainId,
  request,
}: UseSendTransactionPrepareArgs & {
  chainId?: number
}) => [{ entity: 'prepareSendTransaction', chainId, request }] as const

const queryFn = ({
  queryKey: [{ request }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return prepareSendTransaction({ request })
}

export function useSendTransactionPrepare({
  request,
  cacheTime,
  enabled = true,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseSendTransactionPrepareArgs & UseSendTransactionPrepareConfig) {
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
