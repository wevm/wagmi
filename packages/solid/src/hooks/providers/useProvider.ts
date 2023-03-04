import { getProvider, watchProvider } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export type GetProviderArgs = {
  chainId?: Accessor<number>
}

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider(props?: UseProviderArgs) {
  const [provider, setProvider] = createSignal(getProvider())

  createEffect(() => {
    const unsubscribe = watchProvider(
      { chainId: props?.chainId?.() },
      (provider) => {
        setProvider(provider)
      },
    )
    onCleanup(() => unsubscribe())
  })

  return provider
}
