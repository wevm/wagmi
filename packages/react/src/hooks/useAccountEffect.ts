'use client'

import { type GetAccountReturnType, watchAccount } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseAccountEffectParameters = Compute<
  {
    onConnect?(
      data: Compute<
        Pick<
          Extract<GetAccountReturnType, { status: 'connected' }>,
          'address' | 'addresses' | 'chain' | 'chainId' | 'connector'
        > & {
          isReconnected: boolean
        }
      >,
    ): void
    onDisconnect?(): void
  } & ConfigParameter
>

/** https://wagmi.sh/react/api/hooks/useAccountEffect */
export function useAccountEffect(parameters: UseAccountEffectParameters = {}) {
  const { onConnect, onDisconnect } = parameters

  const config = useConfig(parameters)

  useEffect(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        if (
          (prevData.status === 'reconnecting' ||
            (prevData.status === 'connecting' &&
              prevData.address === undefined)) &&
          data.status === 'connected'
        ) {
          const { address, addresses, chain, chainId, connector } = data
          const isReconnected =
            prevData.status === 'reconnecting' ||
            // if `previousAccount.status` is `undefined`, the connector connected immediately.
            prevData.status === undefined
          onConnect?.({
            address,
            addresses,
            chain,
            chainId,
            connector,
            isReconnected,
          })
        } else if (
          prevData.status === 'connected' &&
          data.status === 'disconnected'
        )
          onDisconnect?.()
      },
    })
  }, [config, onConnect, onDisconnect])
}
