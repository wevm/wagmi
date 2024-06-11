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

export function createWrapper<TComponent extends React.FunctionComponent<any>>(
  Wrapper: TComponent,
  props: Parameters<TComponent>[0],
) {
  type Props = { children?: React.ReactNode | undefined }
  return function CreatedWrapper({ children }: Props) {
    return createElement(
      Wrapper,
      props,
      createElement(QueryClientProvider, { client: queryClient }, children),
    )
  }
}

export function renderHook<Result, Props>(
  render: (props: Props) => Result,
  options?: RenderHookOptions<Props> | undefined,
): RenderHookResult<Result, Props> {
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

export function waitFor<T>(
  callback: () => Promise<T> | T,
  options?: waitForOptions | undefined,
): Promise<T> {
  return rtl_waitFor(callback, { timeout: 10_000, ...options })
}
