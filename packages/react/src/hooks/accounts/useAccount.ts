import * as React from 'react'
import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { useEnsAvatar, useEnsName } from '../ens'
import { QueryConfig } from '../../types'

export type UseAccountArgs = {
  /** Fetches ENS for connected account */
  ens?: boolean | { avatar?: boolean; name?: boolean }
}

export type UseAccountConfig = Pick<
  QueryConfig<GetAccountResult, Error>,
  'suspense' | 'onError' | 'onSettled' | 'onSuccess'
>

export const queryKey = () => [{ entity: 'account' }] as const

const queryFn = () => getAccount()

export function useAccount({
  ens,
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
    isFetched,
    isFetching,
    isLoading,
    status,
  } = useQuery(queryKey(), queryFn, {
    staleTime: 0,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
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
    const unwatch = watchAccount((data) =>
      queryClient.setQueryData(queryKey(), data),
    )
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
    data: data_ ? { ...data_, ...ensData } : undefined,
    error,
    isError: status === 'error',
    isFetching,
    isFetched,
    isIdle: status_ === 'idle',
    isLoading: status_ === 'loading',
    isSuccess: status_ === 'success',
    status: status_,
  } as const
}
