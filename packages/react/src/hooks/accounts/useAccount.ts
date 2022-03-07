import * as React from 'react'
import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { useEnsLookup } from '../ens'

export type UseAccountConfig = {
  /** Fetches ENS for connected account */
  fetchEns?: boolean
}

export const useAccount = ({ fetchEns }: UseAccountConfig = {}) => {
  const client = useClient()
  const queryClient = useQueryClient()
  const { data, error, isError, isLoading, status } = useQuery<
    GetAccountResult,
    Error
  >('account', () => {
    return getAccount()
  })

  const res = useEnsLookup({
    address: data?.address,
    enabled: fetchEns,
  })
  console.log(res)

  React.useEffect(() => {
    const unwatch = watchAccount((data) =>
      queryClient.setQueryData('account', data),
    )
    return unwatch
  }, [queryClient])

  const disconnect = React.useCallback(async () => {
    await client.connector?.disconnect()
    client.clearState()
  }, [client])

  // Force data to be undefined if no address exists
  const data_ = data?.address ? data : undefined
  const isLoading_ = isLoading || client.connecting

  let status_: UseQueryResult['status']
  if (isLoading_) status_ = 'loading'
  else if (!data?.address) status_ = 'idle'
  else status_ = status

  return {
    data: data_,
    disconnect,
    error,
    isError,
    isIdle: status_ === 'idle',
    isLoading: status_ === 'loading',
    isSuccess: status_ === 'success',
    status: status_,
  } as const
}
