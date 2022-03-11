import * as React from 'react'
import {
  GetAccountResult,
  disconnect,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { useEnsLookup } from '../ens'

export type UseAccountConfig = {
  /** Fetches ENS for connected account */
  fetchEns?: boolean
}

export const accountQueryKey = 'account' as const

export const useAccount = ({ fetchEns }: UseAccountConfig = {}) => {
  const client = useClient()
  const queryClient = useQueryClient()

  const { data, error, isError, isLoading, status } = useQuery<
    GetAccountResult,
    Error
  >(accountQueryKey, async () => {
    const { address } = getAccount()
    const cachedAccount =
      queryClient.getQueryData<GetAccountResult>(accountQueryKey)
    return address ? { address } : cachedAccount || { address: undefined }
  })

  const res = useEnsLookup({
    address: data?.address,
    enabled: fetchEns,
  })
  console.log(res)

  React.useEffect(() => {
    const unwatch = watchAccount(({ address }) =>
      queryClient.setQueryData<GetAccountResult>(accountQueryKey, () => ({
        address,
      })),
    )
    return unwatch
  }, [queryClient])

  // Force data to be undefined if no address exists
  const data_ = data?.address ? data : undefined
  const isLoading_ = isLoading || client.status === 'connecting'

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
