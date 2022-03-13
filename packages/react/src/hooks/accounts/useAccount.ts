import * as React from 'react'
import {
  GetAccountResult,
  disconnect,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { useEnsAvatar, useEnsLookup } from '../ens'

export type UseAccountConfig = {
  /** Fetches ENS for connected account */
  ens?: boolean | { avatar?: boolean; name?: boolean }
}

export const queryKey = () => [{ entity: 'account' }] as const

export const useAccount = ({ ens }: UseAccountConfig = {}) => {
  const client = useClient()
  const queryClient = useQueryClient()

  const {
    data: accountData,
    error,
    isError,
    isLoading,
    status,
    ...accountQueryResult
  } = useQuery(queryKey(), async () => {
    const { address, connector } = getAccount()
    const cachedAccount = queryClient.getQueryData<GetAccountResult>(queryKey())
    return address
      ? { address, connector }
      : cachedAccount || { address: undefined, connector: undefined }
  })
  const address = accountData?.address

  const { data: ensNameData } = useEnsLookup({
    address,
    enabled: Boolean(typeof ens === 'boolean' ? ens : ens?.name),
  })
  const { data: ensAvatarData } = useEnsAvatar({
    addressOrName: address,
    enabled: Boolean(typeof ens === 'boolean' ? ens : ens?.avatar),
  })

  React.useEffect(() => {
    const unwatch = watchAccount(({ address, connector }) =>
      queryClient.setQueryData<GetAccountResult>(queryKey(), () => ({
        address,
        connector,
      })),
    )
    return unwatch
  }, [queryClient])

  // Force data to be undefined if no address exists
  const data_ = address ? accountData : undefined
  const isLoading_ = isLoading || client.status === 'connecting'

  let status_: UseQueryResult['status']
  if (isLoading_) status_ = 'loading'
  else if (!address) status_ = 'idle'
  else status_ = status

  return {
    ...accountQueryResult,
    data: data_
      ? {
          ...data_,
          ...(ensNameData || ensAvatarData
            ? {
                ens: { avatar: ensAvatarData, name: ensNameData },
              }
            : {}),
        }
      : data_,
    disconnect,
    error,
    isError,
    isIdle: status_ === 'idle',
    isLoading: status_ === 'loading',
    isSuccess: status_ === 'success',
    status: status_,
  } as const
}
