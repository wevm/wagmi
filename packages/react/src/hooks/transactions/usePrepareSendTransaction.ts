import {
  FetchSignerResult,
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
  deepEqual,
  prepareSendTransaction,
} from '@wagmi/core'
import { providers } from 'ethers'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UsePrepareSendTransactionConfig =
  Partial<PrepareSendTransactionArgs> &
    QueryConfig<PrepareSendTransactionResult, Error>

function queryKey(
  { chainId, request }: Partial<PrepareSendTransactionArgs>,
  {
    activeChainId,
    signerAddress,
  }: { activeChainId: number; signerAddress?: string },
) {
  return [
    {
      entity: 'prepareSendTransaction',
      activeChainId,
      chainId,
      request,
      signerAddress,
    },
  ] as const
}

function queryFn({ signer }: { signer?: FetchSignerResult }) {
  return ({
    queryKey: [{ chainId, request }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!request?.to) throw new Error('request.to is required')
    return prepareSendTransaction({
      chainId,
      request: { ...request, to: request.to },
      signer,
    })
  }
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
  chainId,
  request,
  cacheTime,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UsePrepareSendTransactionConfig = {}) {
  const activeChainId = useChainId()
  const { data: signer } = useSigner<providers.JsonRpcSigner>({
    chainId: chainId ?? activeChainId,
  })

  const prepareSendTransactionQuery = useQuery(
    queryKey(
      { request, chainId },
      { activeChainId, signerAddress: signer?._address },
    ),
    queryFn({ signer }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer && request && request.to),
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
