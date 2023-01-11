import {
  renderHook as defaultRenderHook,
  waitFor,
} from '@solidjs/testing-library'
import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'

import type { JSXElement } from 'solid-js'

import { WagmiProvider } from '../src'

import { setupClient } from './utils'

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

type Props = { client?: Client } & {
  children?: JSXElement
}

export function wrapper({
  client = setupClient({ queryClient }),
  ...rest
}: Props = {}) {
  return <WagmiProvider client={client as any} {...rest} />
}

export function renderHook(
  hook: (props: any) => any,
  { wrapper: wrapper_, ...options_ }: { wrapper: any; options: any },
) {
  const options: any = {
    ...(wrapper_
      ? { wrapper: wrapper_ }
      : {
          wrapper: (props: any) =>
            wrapper({ ...props, ...options_?.initialProps }),
        }),
    ...options_,
  }

  queryClient.clear()

  const utils = defaultRenderHook(hook, options)
  return {
    ...utils,
    waitFor: (utils as { waitFor?: typeof waitFor })?.waitFor ?? waitFor,
  }
}
