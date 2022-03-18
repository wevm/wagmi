import * as React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getProvider } from '@wagmi/core'

import { useClient } from '../../context'

export const queryKey = 'chainId'

const queryFn = () => {
  return getProvider().network.chainId
}

export function useChainId() {
  const client = useClient()
  const queryClient = useQueryClient()
  const { data } = useQuery(queryKey, queryFn)

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.provider,
      (provider) => {
        const chainId_ = provider.network.chainId
        return queryClient.setQueryData(queryKey, chainId_)
      },
    )
    return unsubscribe
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return data
}
