import {
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
  deepEqual,
  prepareSendTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UseSendTransactionPrepareArgs = Omit<
  PrepareSendTransactionArgs,
  'request'
> & {
  request: Partial<PrepareSendTransactionArgs['request']>
}

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
  if (!request.to) throw new Error('request.to is required')
  return prepareSendTransaction({ request: { ...request, to: request.to } })
}

/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 *
 * @example
 * import { useSendTransaction, useSendTransactionPrepare } from 'wagmi'
 *
 * const config = await useSendTransactionPrepare({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = await useSendTransaction(config)
 */
export function useSendTransactionPrepare({
  request,
  cacheTime,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
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
      enabled: Boolean(enabled && provider && request.to),
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
