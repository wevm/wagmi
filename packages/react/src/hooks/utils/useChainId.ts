import * as React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getProvider } from '@wagmi/core'

import { useClient } from '../../context'

export const chainIdQueryKey = 'chainId'

const chainIdQueryFn = () => getProvider().network.chainId

export function useChainId() {
  const client = useClient()
  const queryClient = useQueryClient()

  const { data } = useQuery<number>(chainIdQueryKey, chainIdQueryFn)

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.provider.network.chainId,
      (chainId) => queryClient.setQueryData(chainIdQueryKey, chainId),
    )
    return unsubscribe
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return data
}
