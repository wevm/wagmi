import type { FetchSignerArgs } from '@wagmi/core'
import { watchSigner } from '@wagmi/core'
import { createEffect, createSignal, onCleanup } from 'solid-js'

import { useClient } from '../../context'

export const useSigner = ({ chainId }: FetchSignerArgs = {}) => {
  const [signer, setSigner] = createSignal()
  const client = useClient()

  createEffect(() => {
    const unsubscribe = watchSigner(
      {
        chainId: chainId ?? (client.data?.chain!.id || client.chains![0].id),
      },
      (signer) => setSigner(signer),
    )
    onCleanup(() => unsubscribe())
  })

  return signer
}
