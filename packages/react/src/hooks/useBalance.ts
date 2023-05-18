import { useQuery } from '@tanstack/react-query'
import {
  type GetBalanceQueryOptions,
  getBalanceQueryOptions,
  watchBalance,
} from '@wagmi/core'
import { useEffect } from 'react'
import type { Address } from 'viem'

import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters = Omit<GetBalanceQueryOptions, 'address'> & {
  address?: Address | undefined
  watch?: boolean | undefined
}

export function useBalance({
  address,
  chainId: chainId_,
  token,
  unit,
  watch,
  ...rest
}: UseBalanceParameters) {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = address
    ? getBalanceQueryOptions(config, {
        ...rest,
        address,
        chainId,
        token,
        unit,
      } as GetBalanceQueryOptions)
    : undefined

  useEffect(() => {
    if (!address) return
    if (!watch) return
    if (!queryOptions) return

    return watchBalance(config, {
      address,
      chainId,
      onBalance: (balance) =>
        config.queryClient.setQueryData(queryOptions.queryKey, balance),
      syncConnectedChain: false,
    })
  }, [address, chainId, config, queryOptions, watch])

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery({ ...queryOptions, enabled: Boolean(queryOptions) })
}
