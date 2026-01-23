import { type GetConnectionReturnType, watchConnection } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { Accessor } from 'solid-js'
import { createEffect, onCleanup } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type SolidConnectionEffectParameters = Compute<
  {
    onConnect?(
      data: Compute<
        Pick<
          Extract<GetConnectionReturnType, { status: 'connected' }>,
          'address' | 'addresses' | 'chain' | 'chainId' | 'connector'
        > & {
          isReconnected: boolean
        }
      >,
    ): void
    onDisconnect?(): void
  } & ConfigParameter
>

export type UseConnectionEffectParameters =
  Accessor<SolidConnectionEffectParameters>

/** https://wagmi.sh/solid/api/primitives/useConnectionEffect */
export function useConnectionEffect(
  parameters: UseConnectionEffectParameters = () => ({}),
) {
  const config = useConfig(parameters)

  createEffect(() => {
    const { onConnect, onDisconnect } = parameters()

    const unsubscribe = watchConnection(config(), {
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
    onCleanup(() => unsubscribe())
  })
}
