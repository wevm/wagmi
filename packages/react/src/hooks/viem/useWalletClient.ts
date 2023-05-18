import type { GetWalletClientArgs, GetWalletClientResult } from '@wagmi/core'
import { getWalletClient, watchWalletClient } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'

import { useAccount } from '../accounts'
import { useChainId, useQuery, useQueryClient } from '../utils'

export type UseWalletClientConfig = Omit<
  QueryConfig<GetWalletClientResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  GetWalletClientArgs

export function queryKey({ chainId }: GetWalletClientArgs) {
  return [{ entity: 'walletClient', chainId, persist: false }] as const
}

function queryFn({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  return getWalletClient({ chainId })
}

export function useWalletClient({
  chainId: chainId_,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseWalletClientConfig = {}) {
  const { connector } = useAccount()
  const chainId = useChainId({ chainId: chainId_ })
  const walletClientQuery = useQuery<
    GetWalletClientResult,
    Error,
    GetWalletClientResult,
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
    const unwatch = watchWalletClient({ chainId }, (walletClient) => {
      // If a walletClient has changed (switch wallet/connector), we want to revalidate.
      if (walletClient) queryClient.invalidateQueries(queryKey({ chainId }))
      // If there is no longer a walletClient (disconnect), we want to remove the query.
      else queryClient.removeQueries(queryKey({ chainId }))
    })
    return unwatch
  }, [queryClient, chainId])

  return walletClientQuery
}
