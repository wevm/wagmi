import type {
  GetWalletClientResult,
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
} from '@wagmi/core'
import { prepareSendTransaction } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useNetwork } from '../accounts'
import { useQuery } from '../utils'
import { useWalletClient } from '../viem'

export type UsePrepareSendTransactionConfig =
  Partial<PrepareSendTransactionArgs> &
    QueryConfig<PrepareSendTransactionResult, Error>

type QueryKeyArgs = Partial<PrepareSendTransactionArgs>
type QueryKeyConfig = Pick<UsePrepareSendTransactionConfig, 'scopeKey'> & {
  activeChainId?: number
  walletClientAddress?: string
}

function queryKey({
  activeChainId,
  chainId,
  request,
  scopeKey,
  walletClientAddress,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'prepareSendTransaction',
      activeChainId,
      chainId,
      request,
      scopeKey,
      walletClientAddress,
    },
  ] as const
}

function queryFn({ walletClient }: { walletClient?: GetWalletClientResult }) {
  return ({
    queryKey: [{ chainId, request }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!request?.to) throw new Error('request.to is required')
    return prepareSendTransaction({
      chainId,
      request: { ...request, to: request.to },
      walletClient,
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
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UsePrepareSendTransactionConfig = {}) {
  const { chain: activeChain } = useNetwork()
  const { data: walletClient } = useWalletClient({ chainId })

  const prepareSendTransactionQuery = useQuery(
    queryKey({
      activeChainId: activeChain?.id,
      chainId,
      request,
      scopeKey,
      walletClientAddress: walletClient?.account.address,
    }),
    queryFn({ walletClient }),
    {
      cacheTime,
      enabled: Boolean(enabled && walletClient && request && request.to),
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
      ...(prepareSendTransactionQuery.isSuccess
        ? prepareSendTransactionQuery.data
        : undefined),
    } as PrepareSendTransactionResult,
  })
}
