import * as React from 'react'
import {
  RenderHookOptions,
  renderHook as defaultRenderHook,
  waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { QueryClient } from 'react-query'

import { WagmiConfig, WagmiConfigProps } from '../src'
import { setupClient } from './utils'
import { reactVersion } from './setup'

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

type Props = WagmiConfigProps & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export function wrapper(props: Props) {
  const client = props.client ?? setupClient({ queryClient })
  return <WagmiConfig client={client} {...props} />
}

export function renderHook<TResult, TProps>(
  hook: (props: TProps) => TResult,
  {
    wrapper: wrapper_,
    ...options_
  }: RenderHookOptions<TProps & WagmiConfigProps> | undefined = {},
) {
  let options: RenderHookOptions<TProps & WagmiConfigProps>
  if (reactVersion === '18')
    options = {
      wrapper: (props) => wrapper({ ...props, ...options_?.initialProps }),
      ...options_,
    }
  else
    options = {
      wrapper: wrapper_ ?? wrapper,
      ...options_,
    }

  const utils = defaultRenderHook<TResult, TProps>(hook, options)
  return {
    ...utils,
    waitFor: (utils as { waitFor?: typeof waitFor }).waitFor ?? waitFor,
  }
}

export { act } from '@testing-library/react'
export {
  setupClient,
  actConnect,
  actDisconnect,
  actNetwork,
  getUnclaimedTokenId,
} from './utils'
export {
  getProvider,
  getWebSocketProvider,
  getSigners,
} from '../../core/test/utils'
