import { createQuery, useQueryClient } from '@tanstack/solid-query'
import type { FetchSignerResult } from '@wagmi/core'
import { fetchSigner } from '@wagmi/core'
import type { Signer } from 'ethers'
import type { Accessor } from 'solid-js'
import { createEffect } from 'solid-js'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useAccount } from './useAccount'

export type FetchSignerArgs = {
  chainId?: Accessor<number>
}

export type UseSignerConfig = Omit<
  QueryConfig<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  FetchSignerArgs

export function queryKey(props: FetchSignerArgs) {
  return [
    { entity: 'signer', chainId: props.chainId?.(), persist: false },
  ] as const
}

function queryFn<TSigner extends Signer>({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  return fetchSigner<TSigner>({ chainId })
}

export function useSigner<TSigner extends Signer>(props?: UseSignerConfig) {
  const acc = useAccount()

  const signerQuery = createQuery<
    FetchSignerResult<TSigner>,
    Error,
    FetchSignerResult<TSigner>,
    () => ReturnType<typeof queryKey>
  >(() => queryKey({ chainId: props?.chainId }), queryFn, {
    get enabled() {
      return Boolean(acc().connector)
    },
    ...{
      cacheTime: 0,
      staleTime: Infinity,
      suspense: props?.suspense,
      onError: props?.onError,
      onSettled: props?.onSettled,
      onSuccess: props?.onSuccess,
    },
  })

  const queryClient = useQueryClient()

  createEffect(() => {
    if (acc().connector) signerQuery.refetch()
    else queryClient.removeQueries(queryKey({ chainId: props?.chainId }))
  })

  return signerQuery
}
