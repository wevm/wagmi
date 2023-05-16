import { QueryClient } from '@tanstack/react-query'
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as renderHook_,
  waitFor as waitFor_,
  type waitForOptions,
} from '@testing-library/react'
import { createConfig } from '@wagmi/core'
import * as React from 'react'
import { createTestClient, http } from 'viem'

import { WagmiConfig } from '../src/index.js'
import { testChains } from './constants.js'

const { anvil, anvilTwo } = testChains

////////////////////////////////////////////////////////////////////////////////
// anvil.js

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
})

////////////////////////////////////////////////////////////////////////////////
// config

export const config = createConfig({
  chains: [anvil, anvilTwo],
  connectors: [],
  reconnectOnMount: false,
  storage: null,
  transports: {
    [anvil.id]: http(),
    [anvilTwo.id]: http(),
  },
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent Vitest from garbage collecting cache
      gcTime: Infinity,
      // Turn off retries to prevent timeouts
      retry: false,
    },
  },
})

////////////////////////////////////////////////////////////////////////////////
// react

export function createWrapper<TComponent extends React.FunctionComponent<any>>(
  Wrapper: TComponent,
  props: Parameters<TComponent>[0],
) {
  return function CreatedWrapper({
    children,
  }: { children?: React.ReactNode | undefined }) {
    return React.createElement(Wrapper, props, children)
  }
}

export function renderHook<Result, Props>(
  render: (props: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Result, Props> {
  queryClient.clear()
  return renderHook_(render, {
    wrapper: createWrapper(WagmiConfig, { value: config }),
    ...options,
  })
}

export function waitFor<T>(
  callback: () => Promise<T> | T,
  options?: waitForOptions,
): Promise<T> {
  return waitFor_(callback, { timeout: 10_000, ...options })
}
