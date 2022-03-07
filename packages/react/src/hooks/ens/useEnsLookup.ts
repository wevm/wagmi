import { UseQueryOptions, useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { useClient } from '../../context'

type QueryOptions = UseQueryOptions<FetchEnsNameResult, Error>

export type UseEnsLookupConfig = {
  /** Address to look up */
  address?: string
  /** Disables fetching */
  enabled?: QueryOptions['enabled']
}

export const useEnsLookup = ({
  address,
  enabled = true,
}: UseEnsLookupConfig = {}) => {
  const client = useClient()
  const { data, error, isError, isLoading, isSuccess, isIdle, status } =
    useQuery<FetchEnsNameResult, Error>(
      ['ens', address, client.provider.network.chainId],
      () => {
        return fetchEnsName({ address: <string>address })
      },
      {
        enabled: enabled && !!address,
      },
    )

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    isIdle,
    status,
  } as const
}
