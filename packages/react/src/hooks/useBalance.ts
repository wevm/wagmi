import { useQuery } from '@tanstack/react-query'
import {
  type GetBalanceQueryOptions,
  getBalanceQueryOptions,
} from '@wagmi/core'

import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import type { Address } from 'viem'

export type UseBalanceParameters = Omit<GetBalanceQueryOptions, 'address'> & {
  address?: Address | undefined
  watch?: boolean | undefined
}

export function useBalance({
  address,
  chainId: chainId_,
  token,
  unit,
  // TODO(jxom): watch
  watch: _watch,
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

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery({ ...queryOptions, enabled: Boolean(queryOptions) })
}
