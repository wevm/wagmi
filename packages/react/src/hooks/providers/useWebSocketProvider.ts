import { providers } from 'ethers'
import {
  GetWebSocketProviderArgs,
  getWebSocketProvider,
  watchWebSocketProvider,
} from '@wagmi/core'
import * as React from 'react'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>

export function useWebSocketProvider<
  TWebSocketProvider extends providers.WebSocketProvider,
>({ chainId }: UseWebSocketProviderArgs = {}) {
  const forceUpdate = useForceUpdate()
  const client = useClient()
  const webSocketProvider = React.useRef(
    getWebSocketProvider<TWebSocketProvider>({ chainId }),
  )

  React.useEffect(() => {
    const unwatch = watchWebSocketProvider<TWebSocketProvider>(
      { chainId },
      (webSocketProvider_) => {
        webSocketProvider.current = webSocketProvider_
        forceUpdate()
      },
    )
    return unwatch
  }, [chainId, client, forceUpdate])

  return webSocketProvider.current
}
