import {
  FetchSignerResult,
  Signer,
  fetchSigner,
  watchSigner,
} from '@wagmi/core'
import * as React from 'react'
import { useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'
import { useQuery } from '../utils'

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
>

export const queryKey = () => [{ entity: 'signer' }] as const

const queryFn = <TSigner extends Signer>() => fetchSigner<TSigner>()

export function useSigner<TSigner extends Signer>({
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseSignerConfig = {}) {
  const signerQuery = useQuery<
    FetchSignerResult<TSigner>,
    Error,
    FetchSignerResult<TSigner>
  >(queryKey(), queryFn, {
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
