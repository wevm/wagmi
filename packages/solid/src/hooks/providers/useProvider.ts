import type { Provider } from '@wagmi/core'
import { getProvider, watchProvider } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'

type GetProviderArgs = {
  chainId?: Accessor<number> | undefined
}

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider(props?: UseProviderArgs) {
  const [provider, setProvider] = createSignal<Provider>()
  const args = createMemo(() =>
    props?.chainId ? { chainId: props.chainId() } : {},
  )

  setProvider(getProvider(args()))

  createEffect(
    () => {
      const unsubscribe = watchProvider(args(), (provider) => {
        setProvider(provider as any)
      })
      onCleanup(() => unsubscribe())
    },
    { defer: true },
  )

  return provider
}
