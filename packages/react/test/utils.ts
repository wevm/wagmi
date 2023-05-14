import { QueryClient } from '@tanstack/react-query'
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as renderHook_,
  waitFor as waitFor_,
  type waitForOptions,
} from '@testing-library/react'
import { mainnet } from '@wagmi/chains'
import { createConfig } from '@wagmi/core'
import * as React from 'react'
import { type Chain, createTestClient, http } from 'viem'

import { WagmiConfig } from '../src/index.js'
import { chainId, pool, port } from './constants.js'

////////////////////////////////////////////////////////////////////////////////
// anvil.js

export const anvil = {
  ...mainnet, // We are using a mainnet fork for testing.
  id: chainId,
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
  },
} as const satisfies Chain

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
})

////////////////////////////////////////////////////////////////////////////////
// config

export const config = createConfig({
  chains: [anvil],
  connectors: [],
  reconnectOnMount: false,
  storage: null,
  transports: {
    [anvil.id]: http(),
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
