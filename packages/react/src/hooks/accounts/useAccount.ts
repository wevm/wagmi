import * as React from 'react'
import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'
import { useQuery, useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'

export type UseAccountConfig = Pick<
  QueryConfig<GetAccountResult, Error>,
  'suspense' | 'onError' | 'onSettled' | 'onSuccess'
>

export const queryKey = () => [{ entity: 'account' }] as const

const queryFn = () => {
  const result = getAccount()
  if (result.address) return result
  return null
}

export function useAccount({
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseAccountConfig = {}) {
  const queryClient = useQueryClient()

  const accountQuery = useQuery(queryKey(), queryFn, {
    staleTime: 0,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  React.useEffect(() => {
    const unwatch = watchAccount((data) => {
      queryClient.setQueryData(queryKey(), data)
    })
    return unwatch
  }, [queryClient])

  return accountQuery
}
