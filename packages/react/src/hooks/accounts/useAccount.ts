import * as React from 'react'
import {
  GetAccountResult,
  disconnect,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { useEnsAvatar, useEnsName } from '../ens'
import { QueryConfig } from '../../types'

export type UseAccountArgs = {
  /** Fetches ENS for connected account */
  ens?: boolean | { avatar?: boolean; name?: boolean }
}

export type UseAccountConfig = QueryConfig<GetAccountResult, Error>

export const queryKey = () => [{ entity: 'account' }] as const

export function useAccount({
  ens,
  cacheTime,
  enabled = true,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseAccountArgs & UseAccountConfig = {}) {
  const client = useClient()
  const queryClient = useQueryClient()

  const {
    data: accountData,
    error,
    isError,
    isLoading,
    status,
    ...accountQueryResult
  } = useQuery(
    queryKey(),
    () => {
      const { address, connector } = getAccount()
      const cachedAccount = client.config.autoConnect
        ? queryClient.getQueryData<GetAccountResult>(queryKey())
        : undefined
      return address
        ? { address, connector }
        : cachedAccount || { address: undefined, connector: undefined }
    },
    {
      cacheTime,
      enabled,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
  const address = accountData?.address

  const { data: ensAvatarData } = useEnsAvatar({
    addressOrName: address,
    enabled: Boolean(typeof ens === 'boolean' ? ens : ens?.avatar),
  })
  const { data: ensNameData } = useEnsName({
    address,
    enabled: Boolean(typeof ens === 'boolean' ? ens : ens?.name),
  })

  React.useEffect(() => {
    const unwatch = watchAccount((data) => {
      queryClient.setQueryData(queryKey(), data)
    })
    return unwatch
  }, [queryClient])

  // Force data to be undefined if no address exists
  const data_ = address ? { ...accountData, address } : undefined
  const isLoading_ = isLoading || client.status === 'connecting'

  let status_: UseQueryResult['status']
  if (isLoading_) status_ = 'loading'
  else if (!address) status_ = 'idle'
  else status_ = status

  const ensData =
    ensNameData !== undefined || ensAvatarData !== undefined
      ? { ens: { avatar: ensAvatarData, name: ensNameData } }
      : {}

  return {
    ...accountQueryResult,
    data: data_ ? { ...data_, ...ensData } : undefined,
    disconnect,
    error,
    isError,
    isIdle: status_ === 'idle',
    isLoading: status_ === 'loading',
    isSuccess: status_ === 'success',
    status: status_,
  } as const
}
