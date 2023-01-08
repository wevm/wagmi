import type { GetNetworkResult } from '@wagmi/core'
import { watchNetwork } from '@wagmi/core'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export const useNetwork = () => {
  const [networkData, setNetworkData] = createSignal<GetNetworkResult>()

  createEffect(() => {
    const unsubscribe = watchNetwork((data) => setNetworkData(data))
    onCleanup(() => unsubscribe())
  })

  return networkData
}
