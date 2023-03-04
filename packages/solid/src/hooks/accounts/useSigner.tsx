import { createQuery, useQueryClient } from '@tanstack/solid-query'
import type { QueryObserverOptions } from '@tanstack/solid-query'
import type { FetchSignerResult } from '@wagmi/core'
import { fetchSigner, watchSigner } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, onCleanup } from 'solid-js'

import type { QueryFunctionArgs } from '../../types'
import { useAccount } from './useAccount'

export type FetchSignerArgs = {
  chainId?: Accessor<number>
}

export type UseSignerConfig = Omit<
  QueryObserverOptions<FetchSignerResult, Error>,
  'cacheTime' | 'staleTime' | 'enabled'
> &
  FetchSignerArgs

export function queryKey(props: FetchSignerArgs) {
  return [
    { entity: 'signer', chainId: props.chainId?.(), persist: false },
  ] as const
}

export function queryFn({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  return fetchSigner({ chainId })
}

export function useSigner(props?: UseSignerConfig) {
  const acc = useAccount()

  const signerQuery = createQuery(() => ({
    queryKey: queryKey({ chainId: props?.chainId }),
    queryFn,
    enabled: Boolean(acc().connector),
    cacheTime: 0,
    staleTime: Infinity,
    suspense: props?.suspense,
    onError: props?.onError,
    onSettled: props?.onSettled,
    onSuccess: props?.onSuccess,
  }))

  const queryClient = useQueryClient()

  createEffect(() => {
    const unwatch = watchSigner({ chainId: props?.chainId?.() }, (signer) => {
      if (signer)
        queryClient.invalidateQueries({ queryKey: queryKey({ chainId: props?.chainId }) })
      else queryClient.removeQueries({ queryKey: queryKey({ chainId: props?.chainId }) })
    })
    onCleanup(unwatch)
  })

  return signerQuery
}
