import * as React from 'react'
import {
  RenderHookOptions,
  WrapperComponent,
  act,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import { QueryClient } from 'react-query'

import { Connector, Provider, ProviderProps } from '../src'
import { setupWagmiClient } from './utils'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent Jest from garbage collecting cache
      cacheTime: Infinity,
      // Turn off retries to prevent timeouts
      retry: false,
    },
  },
  logger: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
})

type Props = ProviderProps & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export function wrapper(props: Props) {
  const client = props.client ?? setupWagmiClient({ queryClient })
  return <Provider client={client} {...props} />
}

export function renderHook<TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    wrapper: wrapper_,
    ...options
  }: RenderHookOptions<TProps & ProviderProps> | undefined = {},
) {
  if (wrapper_ == undefined) wrapper_ = wrapper as WrapperComponent<TProps>
  return defaultRenderHook<TProps, TResult>(hook, {
    wrapper: wrapper_,
    ...options,
  })
}

export { act as actHook } from '@testing-library/react-hooks'
export { setupWagmiClient, sleep } from './utils'
export {
  getMockConnector,
  getProvider,
  getWebSocketProvider,
  getSigners,
} from '../../core/test/utils'

export async function actHookConnect(
  utils: ReturnType<typeof defaultRenderHook>,
  connector?: Connector,
) {
  const { result, waitFor } = utils
  await act(async () => {
    const mockConnector =
      connector ?? (result.current as any).connect.connectors[0]
    ;(result.current as any).connect.connect(mockConnector)
  })
  await waitFor(() => (result.current as any).connect.isConnected)
}

export async function actHookNetwork(
  utils: ReturnType<typeof defaultRenderHook>,
  chainId: number,
) {
  const { result, waitFor } = utils
  await act(async () => {
    ;(result.current as any).network.switchNetwork(chainId)
  })
  await waitFor(() => (result.current as any).connect.isSuccess)
}
