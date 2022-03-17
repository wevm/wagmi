import { FetchSignerResult, fetchSigner, watchSigner } from '@wagmi/core'
import { useQuery, useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
>

export const queryKey = () => [{ entity: 'signer' }] as const

export const queryFn = () => {
  return fetchSigner()
}

export function useSigner({
  onError,
  onSettled,
  onSuccess,
}: UseSignerConfig = {}) {
  const signerQuery = useQuery(queryKey(), queryFn, {
    cacheTime: 0,
    enabled: false,
    onError,
    onSettled,
    onSuccess,
  })

  const queryClient = useQueryClient()
  watchSigner((signer) => queryClient.setQueryData(queryKey(), signer))

  const status = !signerQuery.data ? 'loading' : signerQuery.status

  return {
    ...signerQuery,
    isIdle: false,
    isFetching: signerQuery.isFetching || status === 'loading',
    isLoading: signerQuery.isLoading || status === 'loading',
    status,
  }
}
