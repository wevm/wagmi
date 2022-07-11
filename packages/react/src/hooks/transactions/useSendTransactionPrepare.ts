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

/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 */
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

  const sendTransactionPrepareQuery = useQuery(
    queryKey({ request, chainId }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && provider),
      isDataEqual: deepEqual,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
  return Object.assign(sendTransactionPrepareQuery, {
    config: {
      request: undefined,
      mode: 'prepared',
      ...sendTransactionPrepareQuery.data,
    } as PrepareSendTransactionResult,
  })
}
