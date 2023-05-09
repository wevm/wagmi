import { QueryClient } from '@tanstack/react-query'
import type { RenderHookOptions } from '@testing-library/react'
import {
  renderHook as defaultRenderHook,
  waitFor,
} from '@testing-library/react'
import * as React from 'react'

import { WagmiConfig } from '../src'
import type { Config } from '../src/config'
import { setupConfig } from './utils'

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

type Props = { config?: Config } & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export function wrapper({
  config = setupConfig({ queryClient }),
  ...rest
}: Props = {}) {
  return <WagmiConfig config={config} {...rest} />
}

export function renderHook<TResult, TProps>(
  hook: (props: TProps) => TResult,
  {
    wrapper: wrapper_,
    ...options_
  }: RenderHookOptions<TProps & { config?: Config }> | undefined = {},
) {
  const options: RenderHookOptions<TProps & { config?: Config }> = {
    ...(wrapper_
      ? { wrapper: wrapper_ }
      : {
          wrapper: (props) => wrapper({ ...props, ...options_?.initialProps }),
        }),
    ...options_,
  }

  queryClient.clear()

  const utils = defaultRenderHook<TResult, TProps>(hook, options)
  return {
    ...utils,
    waitFor: (utils as { waitFor?: typeof waitFor })?.waitFor ?? waitFor,
  }
}

export { act, cleanup } from '@testing-library/react'
export {
  setupConfig,
  actConnect,
  actDisconnect,
  actSwitchNetwork,
  useAccount,
  useNetwork,
} from './utils'
export {
  getCrowdfundArgs,
  getPublicClient,
  getWalletClients,
  getRandomTokenId,
  getWebSocketPublicClient,
  mirrorCrowdfundContractConfig,
  mlootContractConfig,
  wagmiContractConfig,
  wagmigotchiContractConfig,
} from '../../core/test'
