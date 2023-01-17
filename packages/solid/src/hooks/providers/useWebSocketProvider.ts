import type { WebSocketProvider } from '@wagmi/core'
import { getWebSocketProvider, watchWebSocketProvider } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'

export type GetWebSocketProviderArgs = {
  chainId?: Accessor<number> | undefined
}

export type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>

export function useWebSocketProvider(props?: UseWebSocketProviderArgs) {
  const [webSocketProvider, setWebSocketProvider] =
    createSignal<WebSocketProvider>()

  const args = createMemo(() =>
    props?.chainId ? { chainId: props.chainId() } : {},
  )

  setWebSocketProvider(getWebSocketProvider(args()))

  createEffect(() => {
    const unsubscribe = watchWebSocketProvider(args(), (webSocketProvider) =>
      setWebSocketProvider(webSocketProvider),
    )
    onCleanup(() => unsubscribe())
  })

  return webSocketProvider
}
