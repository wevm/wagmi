import { type GetAccountReturnType, watchAccount } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'

import { useConfig } from './useConfig.js'
import { useEffect } from 'react'

export type UseAccountStateParameters = {
  onConnect?(
    data: Evaluate<
      Pick<
        Extract<GetAccountReturnType, { status: 'connected' }>,
        'address' | 'addresses' | 'chainId' | 'connector'
      > & {
        isReconnected: boolean
      }
    >,
  ): void
  onDisconnect?(): void
}

/** https://wagmi.sh/react/hooks/useAccountState */
export function useAccountState(parameters: UseAccountStateParameters = {}) {
  const { onConnect, onDisconnect } = parameters
  const config = useConfig()

  useEffect(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        if (
          (prevData.status === 'reconnecting' ||
            (prevData.status === 'connecting' &&
              prevData.address === undefined)) &&
          data.status === 'connected'
        ) {
          const { address, addresses, chainId, connector } = data
          const isReconnected =
            prevData.status === 'reconnecting' ||
            // if `previousAccount.status` is `undefined`, the connector connected immediately.
            prevData.status === undefined
          onConnect?.({ address, addresses, chainId, connector, isReconnected })
        } else if (
          prevData.status === 'connected' &&
          data.status === 'disconnected'
        )
          onDisconnect?.()
      },
    })
  }, [config, onConnect, onDisconnect])
}
