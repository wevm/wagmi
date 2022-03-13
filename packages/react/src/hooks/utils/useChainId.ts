import * as React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getProvider } from '@wagmi/core'

import { useClient } from '../../context'

export const queryKey = 'chainId'

const queryFn = () => {
  const chainId = getProvider().network.chainId
  return chainId
}

export function useChainId() {
  const client = useClient()
  const queryClient = useQueryClient()
  const { data } = useQuery(queryKey, queryFn)

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => ({ chainId: state.data?.chain?.id, provider: state.provider }),
      ({ chainId, provider }) => {
        const chainId_ = chainId ?? provider.network.chainId
        return queryClient.setQueryData(queryKey, chainId_)
      },
    )
    return unsubscribe
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return data
}
