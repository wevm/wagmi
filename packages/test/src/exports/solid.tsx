/** @jsxImportSource solid-js */
import {
  render as stl_render,
  renderHook as stl_renderHook,
  waitFor as stl_waitFor,
  type waitForOptions,
} from '@solidjs/testing-library'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import type { Component, ParentProps } from 'solid-js'

import { config } from '../config.js'

// biome-ignore lint/performance/noBarrelFile: <explanation>
export { testEffect } from '@solidjs/testing-library'

export const queryClient = new QueryClient()

export function createWrapper<component extends Component<any>>(
  Wrapper: component,
  wrapperProps: Parameters<component>[0],
) {
  return function CreatedWrapper(props: ParentProps) {
    return (
      <Wrapper {...wrapperProps}>
        <QueryClientProvider client={queryClient} {...props} />
      </Wrapper>
    )
  }
}

export function renderHook<result extends any[], props>(
  render: Parameters<typeof stl_renderHook<result, props>>[0],
  options?: Parameters<typeof stl_renderHook<result, props>>[1],
): ReturnType<typeof stl_renderHook<result, props>> {
  queryClient.clear()
  return stl_renderHook(render, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function render(
  element: RenderParameters[0],
  options?: RenderParameters[1],
): RenderReturnType {
  queryClient.clear()
  return stl_render(element, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}
type RenderParameters = Parameters<typeof stl_render>
type RenderReturnType = ReturnType<typeof stl_render>

export function waitFor<t>(
  callback: () => Promise<t> | t,
  options?: waitForOptions | undefined,
): Promise<t> {
  return stl_waitFor(callback, { timeout: 10_000, ...options })
}
