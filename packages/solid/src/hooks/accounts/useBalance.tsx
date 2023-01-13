import type { Address, FetchBalanceResult } from '@wagmi/core'
import { fetchBalance } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, createMemo, createSignal } from 'solid-js'

import { useAccount } from './useAccount'
import { useNetwork } from './useNetwork'

export type SolidFetchBalanceArgs = {
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
}

export const useBalance = (props?: Partial<SolidFetchBalanceArgs>) => {
  const [balanceData, setBalanceData] = createSignal<FetchBalanceResult>()
  const accountData = useAccount()
  const networkData = useNetwork()

  const propChainId = props?.chainId?.()
  const propAddress = props?.address?.()

  const getBalance = async () => {
    const address = createMemo(() => propAddress ?? accountData().address)
    const chainId = createMemo(() => propChainId ?? networkData()?.chain?.id)

    if (address()) {
      const balanceData = await fetchBalance({
        chainId: chainId(),
        address: address()!,
        formatUnits: props?.formatUnits?.(),
        token: props?.token?.(),
      })

      setBalanceData(balanceData)
    }
  }

  createEffect(
    async () => {
      getBalance()
    },
    { defer: true },
  )

  return { balanceData, fetchBalance: getBalance }
}
