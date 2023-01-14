import type { QueryFunction } from '@tanstack/solid-query'
import { createQuery } from '@tanstack/solid-query'
import type { Address, FetchBalanceResult } from '@wagmi/core'
import { fetchBalance } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'

import type { QueryConfig } from '../../types'

import { useAccount } from './useAccount'
import { useNetwork } from './useNetwork'

export type UseBalanceArgs = Partial<{
  address: Accessor<Address>
  chainId?: Accessor<number>
  formatUnits?: Accessor<
    | number
    | 'wei'
    | 'kwei'
    | 'mwei'
    | 'gwei'
    | 'szabo'
    | 'finney'
    | 'ether'
    | undefined
  >
  token?: Accessor<Address>
}> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>

type QueryKeyArgs = Partial<UseBalanceArgs>
type QueryKeyConfig = Pick<UseBalanceConfig, 'scopeKey'>

function queryKey(props: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'balance',
      address: props.address?.(),
      chainId: props.chainId?.(),
      formatUnits: props.formatUnits?.(),
      scopeKey: props.scopeKey,
      token: props.token?.(),
    } as const,
  ]
}

const queryFn: QueryFunction<
  Promise<FetchBalanceResult>,
  ReturnType<typeof queryKey>
> = ({ queryKey: [{ address, chainId, formatUnits, token }] }) => {
  if (!address) throw new Error('address is required')
  return fetchBalance({
    address,
    chainId,
    formatUnits,
    token,
  })
}

export const useBalance = (props?: UseBalanceArgs & UseBalanceConfig) => {
  const accountData = useAccount()
  const networkData = useNetwork()

  const address = createMemo(() => props?.address?.() ?? accountData().address)
  const chainId = createMemo(
    () => props?.chainId?.() ?? networkData()?.chain?.id,
  )

  const queryKey = createMemo(() => {
    return {
      scopeKey: props?.scopeKey,
      entity: 'balance',
      formatUnits: props?.formatUnits?.(),
      chainId: chainId(),
      address: address(),
      token: props?.token?.(),
    } as const
  })

  const balanceQuery = createQuery(() => [queryKey()], queryFn, {
    get enabled() {
      return Boolean(address() && chainId())
    },
    ...{
      staleTime: props?.staleTime,
      suspense: props?.suspense,
      onError: props?.onError,
      onSettled: props?.onSettled,
      onSuccess: props?.onSuccess,
    },
  })

  // TODO: implement this when other hooks are done.

  // useInvalidateOnBlock({
  //   chainId,
  //   enabled: Boolean(props.enabled() && props.watch() && address()),
  //   queryKey: queryKey(),
  // })

  return balanceQuery
}
