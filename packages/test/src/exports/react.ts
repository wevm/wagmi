import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  type RenderHookOptions,
  type RenderHookResult,
  type RenderOptions,
  type RenderResult,
  render as rtl_render,
  renderHook as rtl_renderHook,
  waitFor as rtl_waitFor,
  type waitForOptions,
} from '@testing-library/react'
import { type ReactElement, createElement } from 'react'
import { WagmiProvider } from 'wagmi'

import { config } from '../config.js'

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { act, cleanup } from '@testing-library/react'

export const queryClient = new QueryClient()

export function createWrapper<component extends React.FunctionComponent<any>>(
  Wrapper: component,
  props: Parameters<component>[0],
) {
  return function CreatedWrapper({ children }: React.PropsWithChildren) {
    return createElement(
      Wrapper,
      props,
      createElement(QueryClientProvider, { client: queryClient }, children),
    )
  }
}

export function renderHook<result, props>(
  render: (props: props) => result,
  options?: RenderHookOptions<props> | undefined,
): RenderHookResult<result, props> {
  queryClient.clear()
  return rtl_renderHook(render, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function render(
  element: ReactElement,
  options?: RenderOptions | undefined,
): RenderResult {
  queryClient.clear()
  return rtl_render(element, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function waitFor<t>(
  callback: () => Promise<t> | t,
  options?: waitForOptions | undefined,
): Promise<t> {
  return rtl_waitFor(callback, { timeout: 10_000, ...options })
}
