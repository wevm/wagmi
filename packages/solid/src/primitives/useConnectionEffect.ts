import { type GetConnectionReturnType, watchConnection } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import type { Accessor } from 'solid-js'
import { createEffect, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useConnectionEffect */
export function useConnectionEffect(
  parameters: useConnectionEffect.Parameters = () => ({}),
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

export namespace useConnectionEffect {
  export type Parameters = Accessor<SolidParameters>

  export type SolidParameters = Compute<
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
}
