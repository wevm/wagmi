import { type GetAccountReturnType, watchAccount } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import { watchEffect } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useConfig } from './useConfig.js'

export type UseAccountEffectParameters = Evaluate<
  DeepMaybeRef<
    {
      onConnect?(
        data: Evaluate<
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
>

/** https://wagmi.sh/vue/api/composables/useAccountEffect */
export function useAccountEffect(parameters: UseAccountEffectParameters = {}) {
  const config = useConfig(parameters)

  watchEffect((onCleanup) => {
    const { onConnect, onDisconnect } = deepUnref(parameters)

    const unwatch = watchAccount(config, {
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

    onCleanup(() => unwatch())
  })
}
