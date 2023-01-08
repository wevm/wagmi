import type { FetchSignerArgs, FetchSignerResult, Signer } from '@wagmi/core'
import { fetchSigner, watchSigner } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'

import { useChainId, useQuery, useQueryClient } from '../utils'
import { useAccount } from './useAccount'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  FetchSignerArgs

export function queryKey({ chainId }: FetchSignerArgs) {
  return [{ entity: 'signer', chainId, persist: false }] as const
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
  >(queryKey({ chainId }), queryFn, {
    cacheTime: 0,
    enabled: Boolean(connector),
    staleTime: Infinity,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  const queryClient = useQueryClient()
  React.useEffect(() => {
    const unwatch = watchSigner({ chainId }, (signer) => {
      // If a signer has changed (switch wallet/connector), we want to revalidate.
      if (signer) queryClient.invalidateQueries(queryKey({ chainId }))
      // If there is no longer a signer (disconnect), we want to remove the query.
      else queryClient.removeQueries(queryKey({ chainId }))
    })
    return unwatch
  }, [queryClient, chainId])

  return signerQuery
}
