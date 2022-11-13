import type {
  FetchSignerResult,
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
} from '@wagmi/core'
import { prepareSendTransaction } from '@wagmi/core'
import type { providers } from 'ethers'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useNetwork, useSigner } from '../accounts'
import { useQuery } from '../utils'

export type UsePrepareSendTransactionConfig =
  Partial<PrepareSendTransactionArgs> &
    QueryConfig<PrepareSendTransactionResult, Error>

type QueryKeyArgs = Partial<PrepareSendTransactionArgs>
type QueryKeyConfig = Pick<UsePrepareSendTransactionConfig, 'scopeKey'> & {
  activeChainId?: number
  signerAddress?: string
}

function queryKey({
  activeChainId,
  chainId,
  request,
  scopeKey,
  signerAddress,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'prepareSendTransaction',
      activeChainId,
      chainId,
      request,
      scopeKey,
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
  scopeKey,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UsePrepareSendTransactionConfig = {}) {
  const { chain: activeChain } = useNetwork()
  const { data: signer } = useSigner<providers.JsonRpcSigner>({ chainId })

  const prepareSendTransactionQuery = useQuery(
    queryKey({
      activeChainId: activeChain?.id,
      chainId,
      request,
      scopeKey,
      signerAddress: signer?._address,
    }),
    queryFn({ signer }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer && request && request.to),
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
