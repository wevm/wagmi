import {
  FetchSignerArgs,
  FetchSignerResult,
  Signer,
  fetchSigner,
  watchSigner,
} from '@wagmi/core'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery, useQueryClient } from '../utils'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  FetchSignerArgs

export const queryKey = ({ chainId }: FetchSignerArgs) =>
  [{ entity: 'signer', chainId, persist: false }] as const

const queryFn = <TSigner extends Signer>({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) => fetchSigner<TSigner>({ chainId })

export function useSigner<TSigner extends Signer>({
  chainId: chainId_,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseSignerConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })
  const signerQuery = useQuery<
    FetchSignerResult<TSigner>,
    Error,
    FetchSignerResult<TSigner>,
    ReturnType<typeof queryKey>
  >(queryKey({ chainId }), queryFn, {
    cacheTime: 0,
    staleTime: Infinity,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  const queryClient = useQueryClient()
  React.useEffect(() => {
    const unwatch = watchSigner({ chainId }, (signer) =>
      queryClient.setQueryData(queryKey({ chainId }), signer),
    )
    return unwatch
  }, [queryClient, chainId])

  return signerQuery
}
