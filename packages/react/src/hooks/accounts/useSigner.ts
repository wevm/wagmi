import type { FetchSignerArgs, FetchSignerResult, Signer } from '@wagmi/core'
import { fetchSigner } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'

import { useChainId, useQuery } from '../utils'
import { useAccount } from './useAccount'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  FetchSignerArgs

export function queryKey({
  chainId,
  connectorId,
}: FetchSignerArgs & { connectorId?: string }) {
  return [{ entity: 'signer', chainId, connectorId, persist: false }] as const
}

function queryFn<TSigner extends Signer>({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  return fetchSigner<TSigner>({ chainId })
}

export function useSigner<TSigner extends Signer>({
  chainId: chainId_,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseSignerConfig = {}) {
  const { connector } = useAccount()
  const chainId = useChainId({ chainId: chainId_ })
  const signerQuery = useQuery<
    FetchSignerResult<TSigner>,
    Error,
    FetchSignerResult<TSigner>,
    ReturnType<typeof queryKey>
  >(queryKey({ chainId, connectorId: connector?.id }), queryFn, {
    cacheTime: 0,
    enabled: Boolean(connector),
    staleTime: Infinity,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  return signerQuery
}
