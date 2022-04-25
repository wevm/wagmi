import * as React from 'react'
import { FetchSignerResult, fetchSigner, watchSigner } from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'
import { useQuery } from '../utils'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
>

export const queryKey = () => [{ entity: 'signer' }] as const

const queryFn = () => fetchSigner()

export function useSigner({
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseSignerConfig = {}) {
  const signerQuery = useQuery(queryKey(), queryFn, {
    cacheTime: 0,
    staleTime: 0,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  const queryClient = useQueryClient()
  React.useEffect(() => {
    const unwatch = watchSigner((signer) =>
      queryClient.setQueryData(queryKey(), signer),
    )
    return unwatch
  }, [queryClient])

  return signerQuery
}
