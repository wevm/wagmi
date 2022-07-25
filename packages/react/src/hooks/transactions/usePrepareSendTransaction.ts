import {
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
  deepEqual,
  prepareSendTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UsePrepareSendTransactionArgs = Omit<
  PrepareSendTransactionArgs,
  'request'
> & {
  request: Partial<PrepareSendTransactionArgs['request']>
}

export type UsePrepareSendTransactionConfig = QueryConfig<
  PrepareSendTransactionResult,
  Error
>

export const queryKey = ({
  chainId,
  request,
}: UsePrepareSendTransactionArgs & {
  chainId?: number
}) => [{ entity: 'prepareSendTransaction', chainId, request }] as const

const queryFn = ({
  queryKey: [{ request }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!request.to) throw new Error('request.to is required')
  return prepareSendTransaction({ request: { ...request, to: request.to } })
}

/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = useSendTransaction(config)
 */
export function usePrepareSendTransaction({
  request,
  cacheTime,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UsePrepareSendTransactionArgs & UsePrepareSendTransactionConfig) {
  const chainId = useChainId()
  const provider = useProvider()

  const prepareSendTransactionQuery = useQuery(
    queryKey({ request, chainId }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && provider && request.to),
      isDataEqual: deepEqual,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
  return Object.assign(prepareSendTransactionQuery, {
    config: {
      request: undefined,
      mode: 'prepared',
      ...prepareSendTransactionQuery.data,
    } as PrepareSendTransactionResult,
  })
}
