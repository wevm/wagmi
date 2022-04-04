import * as React from 'react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import { providers } from 'ethers'
import { QueryClient } from 'react-query'

import { Provider, ProviderProps } from '../src'
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
})

type Props = ProviderProps<providers.JsonRpcProvider> & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export function wrapper(props: Props) {
  const client = setupWagmiClient({ queryClient })
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
export {
  setupWagmiClient,
  getMockConnector,
  getProvider,
  getSigners,
} from './utils'
